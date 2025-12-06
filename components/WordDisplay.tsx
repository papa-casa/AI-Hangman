import React from 'react';

interface WordDisplayProps {
  word: string;
  guessedLetters: Set<string>;
  reveal: boolean;
}

export const WordDisplay: React.FC<WordDisplayProps> = ({ word, guessedLetters, reveal }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 my-10 min-h-[4rem]">
      {word.split('').map((letter, index) => {
        const isGuessed = guessedLetters.has(letter);
        const show = isGuessed || reveal;
        const isMissed = reveal && !isGuessed;
        
        return (
          <div key={index} className="flex flex-col items-center">
            <div 
              className={`
                w-10 sm:w-14 h-12 sm:h-16 flex items-center justify-center
                rounded bg-slate-800 border-b-4 transition-all duration-300
                ${show 
                  ? (isMissed ? 'border-red-500 text-red-500' : 'border-cyan-500 text-cyan-400') 
                  : 'border-slate-700'
                }
              `}
            >
              <span className={`text-2xl sm:text-4xl font-bold ${show ? 'scale-100 opacity-100' : 'scale-50 opacity-0'} transition-all duration-300`}>
                {show ? letter : ''}
              </span>
            </div>
            {!show && (
               <div className="w-8 h-1 bg-slate-700 mt-2 rounded-full" />
            )}
          </div>
        );
      })}
    </div>
  );
};