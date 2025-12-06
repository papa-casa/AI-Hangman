import React from 'react';

interface GallowsProps {
  wrongGuesses: number;
}

export const Gallows: React.FC<GallowsProps> = ({ wrongGuesses }) => {
  const totalLives = 6;
  const livesLeft = Math.max(0, totalLives - wrongGuesses);
  const isDead = livesLeft === 0;

  // Configuration for 6 balloons
  const balloons = [
    { color: 'bg-red-500', x: -45, y: -70, r: -15, delay: '0ms' },
    { color: 'bg-blue-400', x: 45, y: -70, r: 15, delay: '100ms' },
    { color: 'bg-yellow-400', x: -20, y: -90, r: -5, delay: '200ms' },
    { color: 'bg-purple-500', x: 20, y: -90, r: 5, delay: '150ms' },
    { color: 'bg-green-500', x: -55, y: -35, r: -25, delay: '50ms' },
    { color: 'bg-orange-500', x: 55, y: -35, r: 25, delay: '250ms' },
  ];

  return (
    <div className="relative h-80 w-full max-w-[320px] mx-auto mb-4 select-none overflow-visible perspective-[1000px]">
      
      {/* Container for the character and balloons - Floats smoothly */}
      <div 
        className={`absolute left-1/2 bottom-20 w-0 h-0 transition-all duration-1000 ease-in-out
          ${isDead ? 'translate-y-[200px] opacity-0' : 'animate-[float_4s_ease-in-out_infinite]'}
        `}
      >
        
        {/* The Strings */}
        <div className="absolute -top-4 left-0 w-0 h-0 overflow-visible">
          {balloons.map((b, i) => {
             const isVisible = i < livesLeft;
             if (!isVisible) return null;
             return (
               <div 
                 key={`str-${i}`}
                 className="absolute origin-bottom bg-white/40 w-[1px] h-24 -left-[0.5px] -top-20"
                 style={{ 
                   transform: `rotate(${b.r * 0.5}deg)`,
                   height: `calc(100px + ${Math.abs(b.y)}px)`,
                   top: `calc(-100px - ${Math.abs(b.y)}px)`
                 }}
               />
             );
          })}
        </div>

        {/* The Balloons */}
        {balloons.map((b, i) => {
           const isVisible = i < livesLeft;
           return (
             <div
               key={i}
               className={`absolute w-14 h-16 rounded-[50%] ${b.color} transition-all duration-300
                 ${isVisible ? 'scale-100 opacity-95' : 'scale-150 opacity-0'}
               `}
               style={{
                 left: `calc(-28px + ${b.x}px)`,
                 top: `calc(-120px + ${b.y}px)`,
                 transform: `rotate(${b.r}deg)`,
                 boxShadow: 'inset -4px -4px 10px rgba(0,0,0,0.1), inset 4px 4px 10px rgba(255,255,255,0.4)',
                 transitionDelay: isVisible ? '0ms' : '0ms', // Instant pop
               }}
             >
               {/* Shine */}
               <div className="absolute top-2 left-3 w-4 h-2 bg-white/40 rounded-[50%] -rotate-12 blur-[1px]" />
               {/* Knot */}
               <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[6px] ${b.color.replace('bg-', 'border-b-')}`} />
             </div>
           );
        })}

        {/* The Cute Creature (Not a Robot, Not a Man) */}
        <div className="absolute -left-8 -top-8 w-16 h-16 bg-white rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.2)] z-10 flex flex-col items-center justify-center border-2 border-slate-100">
           
           {/* Face */}
           <div className="relative w-full h-full">
             {/* Eyes */}
             <div className="absolute top-5 left-3 w-3 h-3 bg-slate-800 rounded-full animate-[blink_4s_infinite]" />
             <div className="absolute top-5 right-3 w-3 h-3 bg-slate-800 rounded-full animate-[blink_4s_infinite_0.1s]" />
             
             {/* Cheeks */}
             <div className="absolute top-8 left-2 w-3 h-1.5 bg-pink-300 rounded-full opacity-60" />
             <div className="absolute top-8 right-2 w-3 h-1.5 bg-pink-300 rounded-full opacity-60" />

             {/* Mouth */}
             <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-2 rounded-b-full border-b-2 border-slate-800 transition-all
               ${isDead ? 'top-10 rotate-180 border-t-2 border-b-0' : 'top-9'}
             `} />
           </div>

           {/* Tiny Hands Holding Strings */}
           <div className="absolute -top-2 w-1 h-4 bg-slate-300 rounded-full" />
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
        }
        @keyframes blink {
          0%, 48%, 52%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.1); }
        }
      `}</style>
    </div>
  );
};