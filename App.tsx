import React, { useState, useEffect, useCallback } from 'react';
import { GameStatus, GameState, WordData, Language } from './types';
import { MAX_LIVES, CLASSIC_WORDS, TRANSLATIONS } from './constants';
import { generateWordFromTopic } from './services/geminiService';
import { Gallows } from './components/Gallows';
import { Keyboard } from './components/Keyboard';
import { WordDisplay } from './components/WordDisplay';
import { GameControls } from './components/GameControls';

// SVG Wave Component
const WaveBg = () => (
  <div className="wave-container">
    {/* Layer 1 */}
    <svg className="wave wave-1" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
    {/* Layer 2 */}
    <svg className="wave wave-2" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,149.3C672,160,768,224,864,229.3C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
     {/* Layer 3 */}
     <svg className="wave wave-3" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path d="M0,64L48,80C96,96,192,128,288,138.7C384,149,480,139,576,149.3C672,160,768,192,864,202.7C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
  </div>
);

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    status: GameStatus.IDLE,
    word: '',
    hint: '',
    guessedLetters: new Set(),
    wrongGuesses: 0,
    maxLives: MAX_LIVES,
    language: 'IT' // Default to Italian
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const t = TRANSLATIONS[gameState.language];

  // Start Classic Game
  const startClassicGame = () => {
    const wordList = CLASSIC_WORDS[gameState.language];
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    initializeGame(randomWord);
  };

  // Start AI Game
  const startAIGame = async (topic: string) => {
    setIsLoading(true);
    try {
      const wordData = await generateWordFromTopic(topic, gameState.language);
      initializeGame(wordData);
    } catch (error) {
      console.error("Failed to start AI game", error);
      alert("Error generating word.");
    } finally {
      setIsLoading(false);
    }
  };

  const initializeGame = (wordData: WordData) => {
    setGameState(prev => ({
      ...prev,
      status: GameStatus.PLAYING,
      word: wordData.word,
      hint: wordData.hint,
      guessedLetters: new Set(),
      wrongGuesses: 0,
      maxLives: MAX_LIVES,
    }));
    setShowHint(false);
  };

  // Change Language
  const handleLanguageChange = (lang: Language) => {
    setGameState(prev => ({ ...prev, language: lang }));
  };

  // Handle Guess
  const handleGuess = useCallback((letter: string) => {
    setGameState((prev) => {
      if (prev.status !== GameStatus.PLAYING || prev.guessedLetters.has(letter)) {
        return prev;
      }

      const newGuessed = new Set(prev.guessedLetters);
      newGuessed.add(letter);

      const isCorrect = prev.word.includes(letter);
      const newWrongGuesses = isCorrect ? prev.wrongGuesses : prev.wrongGuesses + 1;
      
      // Check Win/Loss
      let newStatus: GameStatus = prev.status;
      const isWon = prev.word.split('').every((l) => newGuessed.has(l));
      
      if (isWon) {
        newStatus = GameStatus.WON;
      } else if (newWrongGuesses >= prev.maxLives) {
        newStatus = GameStatus.LOST;
      }

      return {
        ...prev,
        guessedLetters: newGuessed,
        wrongGuesses: newWrongGuesses,
        status: newStatus,
      };
    });
  }, []);

  // Keyboard Event Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.status !== GameStatus.PLAYING) return;
      const char = e.key.toUpperCase();
      if (/^[A-Z]$/.test(char)) {
        handleGuess(char);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.status, handleGuess]);


  // Reset to Menu
  const resetGame = () => {
    setGameState(prev => ({ ...prev, status: GameStatus.IDLE }));
  };

  const hintsUnlocked = gameState.wrongGuesses >= 3;
  const livesLeft = MAX_LIVES - gameState.wrongGuesses;

  return (
    <div className="w-full min-h-screen text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden relative">
      <WaveBg />
      
      <div className="w-full max-w-2xl mx-auto px-4 py-6 flex flex-col min-h-screen relative z-10">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-6 border-b border-slate-700/50 pb-4 backdrop-blur-sm rounded-lg px-2">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-slate-800/80 rounded flex items-center justify-center text-cyan-400 font-bold border border-slate-600 shadow-lg shadow-cyan-900/20">A</div>
             <h1 className="text-xl font-bold tracking-widest text-slate-100 uppercase drop-shadow-md">
               {t.title}
             </h1>
          </div>
          
          {gameState.status !== GameStatus.IDLE && (
            <button 
              onClick={resetGame}
              className="text-xs font-bold text-slate-400 hover:text-red-400 transition-colors uppercase tracking-widest bg-slate-900/30 px-3 py-1 rounded hover:bg-slate-900/50"
            >
              {t.abort}
            </button>
          )}
        </header>

        {/* Main Content Area */}
        <main className="flex-grow flex flex-col items-center justify-center relative w-full">
          
          {/* Menu / Loading State */}
          {(gameState.status === GameStatus.IDLE || isLoading) && (
            <div className="w-full max-w-md animate-fade-in-up">
              <div className="text-center mb-8 opacity-90">
                 <Gallows wrongGuesses={0} />
              </div>
              <GameControls 
                onStartClassic={startClassicGame} 
                onStartAI={startAIGame} 
                isLoading={isLoading}
                language={gameState.language}
                onLanguageChange={handleLanguageChange}
              />
            </div>
          )}

          {/* Active Game State */}
          {!isLoading && gameState.status !== GameStatus.IDLE && (
            <div className="w-full flex flex-col items-center animate-fade-in pb-10">
              
              {/* HUD */}
              <div className="w-full flex justify-between items-start mb-6 px-4 py-3 rounded-lg bg-slate-900/20 backdrop-blur-md border border-white/5">
                 <div className="flex flex-col gap-1">
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{t.lives}</span>
                    <div className="flex gap-1">
                      {Array.from({ length: MAX_LIVES }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-2 h-2 rounded-full transition-all duration-300
                            ${i < livesLeft 
                              ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' 
                              : 'bg-slate-700/50'
                            }`} 
                        />
                      ))}
                    </div>
                 </div>

                 <div className="flex flex-col items-end gap-1 max-w-[50%]">
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{t.hint}</span>
                    <div className="flex flex-col items-end w-full">
                      <button 
                        onClick={() => setShowHint(true)}
                        disabled={showHint || !hintsUnlocked || gameState.status !== GameStatus.PLAYING}
                        className={`
                          text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border transition-all
                          ${showHint 
                            ? 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10' 
                            : hintsUnlocked 
                              ? 'text-yellow-400 border-yellow-400 hover:bg-yellow-400/10 shadow-[0_0_10px_rgba(250,204,21,0.2)]' 
                              : 'text-slate-500 border-slate-700 cursor-not-allowed opacity-50'
                          }
                        `}
                      >
                        {showHint ? 'Revealed' : hintsUnlocked ? t.unlockHint : `${t.hintLocked}`}
                      </button>
                      
                      <div className={`mt-2 text-right transition-all duration-500 overflow-hidden relative z-50 ${showHint ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <p className="text-sm font-medium text-cyan-100 glass-panel px-3 py-2 rounded shadow-lg text-xs leading-relaxed">
                          {gameState.hint}
                        </p>
                      </div>
                    </div>
                 </div>
              </div>

              {/* The "Gallows" (Now UFO Abduction) */}
              <div className="w-full flex justify-center drop-shadow-2xl">
                 <Gallows wrongGuesses={gameState.wrongGuesses} />
              </div>
              
              <div className="my-2">
                <WordDisplay 
                  word={gameState.word} 
                  guessedLetters={gameState.guessedLetters} 
                  reveal={gameState.status !== GameStatus.PLAYING}
                />
              </div>

              <div className="mt-4 w-full">
                <Keyboard 
                  guessedLetters={gameState.guessedLetters} 
                  onGuess={handleGuess}
                  disabled={gameState.status !== GameStatus.PLAYING}
                />
              </div>

              {/* Game Over / Win Modal */}
              {gameState.status !== GameStatus.PLAYING && (
                <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
                  
                  <div className="glass-panel p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center relative animate-[bounce-in_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)] border-t border-white/10">
                    
                    <h2 className={`text-4xl font-black mb-2 uppercase tracking-tight drop-shadow-lg ${gameState.status === GameStatus.WON ? 'text-green-400' : 'text-rose-500'}`}>
                      {gameState.status === GameStatus.WON ? t.winTitle : t.loseTitle}
                    </h2>
                    
                    <p className="text-slate-300 mb-1 text-xs uppercase tracking-widest">{t.wordWas}</p>
                    <p className="text-2xl font-bold text-white mb-8 bg-slate-900/50 py-3 rounded-lg border border-white/5 tracking-widest shadow-inner">
                      {gameState.word}
                    </p>
                    
                    <button 
                      onClick={resetGame}
                      className={`w-full py-4 font-bold rounded-lg transition-all shadow-lg text-slate-900 uppercase tracking-widest transform hover:scale-[1.02] active:scale-[0.98]
                        ${gameState.status === GameStatus.WON 
                          ? 'bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-300 hover:to-emerald-400' 
                          : 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400'
                        }`}
                    >
                      {t.playAgain}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>

        <footer className="mt-auto pt-6 text-center text-slate-500/80 text-[10px] uppercase tracking-widest pb-2">
          <p>{t.footer}</p>
        </footer>
      </div>
      <style>{`
        @keyframes bounce-in {
           0% { transform: scale(0.9); opacity: 0; }
           100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default App;