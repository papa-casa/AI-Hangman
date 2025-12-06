import React from 'react';
import { ALPHABET } from '../constants';

interface KeyboardProps {
  guessedLetters: Set<string>;
  onGuess: (letter: string) => void;
  disabled: boolean;
}

export const Keyboard: React.FC<KeyboardProps> = ({ guessedLetters, onGuess, disabled }) => {
  return (
    <div className="grid grid-cols-7 sm:grid-cols-9 gap-1.5 sm:gap-2 max-w-3xl mx-auto px-2">
      {ALPHABET.map((letter) => {
        const isGuessed = guessedLetters.has(letter);
        return (
          <button
            key={letter}
            onClick={() => onGuess(letter)}
            disabled={disabled || isGuessed}
            className={`
              relative group aspect-[1/1] sm:aspect-[1/1] rounded-lg font-semibold text-base sm:text-lg transition-all duration-150 ease-out
              flex items-center justify-center outline-none select-none border-b-4 active:border-b-0 active:translate-y-1 active:border-t-4
              ${isGuessed 
                ? 'bg-slate-800/40 text-slate-600 border-transparent shadow-none cursor-not-allowed backdrop-blur-sm' 
                : 'bg-slate-700/80 text-cyan-50 border-slate-900/50 hover:bg-cyan-600 hover:border-cyan-800 hover:text-white backdrop-blur-md shadow-lg'
              }
              ${disabled && !isGuessed ? 'opacity-30 cursor-not-allowed' : ''}
            `}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
};