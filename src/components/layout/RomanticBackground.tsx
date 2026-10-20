import React from 'react';
import { ROMANTIC_THEMES } from '../../constants/themes';
import { ThemeId } from '../../types';

interface RomanticBackgroundProps {
  themeId: ThemeId;
}

export const RomanticBackground: React.FC<RomanticBackgroundProps> = ({ themeId }) => {
  const currentTheme = ROMANTIC_THEMES[themeId] || ROMANTIC_THEMES['pink-rose'];

  return (
    <div
      className={`fixed inset-0 pointer-events-none -z-10 transition-colors duration-700 overflow-hidden ${currentTheme.bodyBg}`}
      aria-hidden="true"
    >
      {/* Corner Roses / Botanical Floral Vignette (Top Left) */}
      <div className="absolute -top-12 -left-12 w-64 h-64 md:w-80 md:h-80 opacity-40 mix-blend-multiply transition-opacity duration-500">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-rose-300">
          <circle cx="70" cy="70" r="50" fill="currentColor" fillOpacity="0.4" />
          <circle cx="100" cy="60" r="40" fill="currentColor" fillOpacity="0.3" />
          <circle cx="50" cy="100" r="45" fill="currentColor" fillOpacity="0.3" />
          <path
            d="M40,50 Q70,20 100,50 T160,50 Q160,90 120,110 T40,110 Z"
            fill="#F4BFD0"
            fillOpacity="0.5"
          />
          <path
            d="M60,40 C80,20 120,30 110,70 C100,100 60,90 50,70 C45,55 50,45 60,40 Z"
            fill="#DCEBD8"
            fillOpacity="0.6"
          />
        </svg>
      </div>

      {/* Corner Roses / Botanical Floral Vignette (Top Right) */}
      <div className="absolute -top-12 -right-12 w-64 h-64 md:w-80 md:h-80 opacity-40 mix-blend-multiply transition-opacity duration-500">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-rose-300">
          <circle cx="130" cy="70" r="50" fill="currentColor" fillOpacity="0.4" />
          <circle cx="100" cy="60" r="40" fill="currentColor" fillOpacity="0.3" />
          <circle cx="150" cy="100" r="45" fill="currentColor" fillOpacity="0.3" />
          <path
            d="M160,50 Q130,20 100,50 T40,50 Q40,90 80,110 T160,110 Z"
            fill="#F4BFD0"
            fillOpacity="0.5"
          />
          <path
            d="M140,40 C120,20 80,30 90,70 C100,100 140,90 150,70 C155,55 150,45 140,40 Z"
            fill="#DCEBD8"
            fillOpacity="0.6"
          />
        </svg>
      </div>

      {/* Fairy Lights Twinkling String */}
      <div className="absolute top-0 left-0 right-0 h-16 flex justify-around items-start opacity-70 px-4">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full animate-fairy-glow shadow-sm"
            style={{
              backgroundColor: currentTheme.fairyLightColor,
              animationDelay: `${(i * 0.35) % 3}s`,
              transform: `translateY(${Math.sin(i * 0.6) * 12 + 8}px)`,
            }}
          />
        ))}
      </div>

      {/* Floating Rose Petals & Little Hearts */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Petal 1 */}
        <div
          className="absolute text-rose-300/40 text-lg animate-petal-drift"
          style={{ top: '15%', left: '10%', animationDuration: '14s' }}
        >
          🌸
        </div>
        {/* Floating Petal 2 */}
        <div
          className="absolute text-rose-300/40 text-sm animate-petal-drift"
          style={{ top: '35%', right: '12%', animationDuration: '16s', animationDelay: '2s' }}
        >
          🌸
        </div>
        {/* Floating Heart 1 */}
        <div
          className="absolute text-rose-400/35 text-xs animate-float-heart"
          style={{ bottom: '15%', left: '18%', animationDuration: '9s', animationDelay: '1s' }}
        >
          ♡
        </div>
        {/* Floating Heart 2 */}
        <div
          className="absolute text-rose-400/35 text-sm animate-float-heart"
          style={{ bottom: '25%', right: '22%', animationDuration: '11s', animationDelay: '3s' }}
        >
          ♡
        </div>
        {/* Floating Heart 3 */}
        <div
          className="absolute text-rose-400/40 text-xs animate-float-heart"
          style={{ bottom: '5%', left: '50%', animationDuration: '8s', animationDelay: '4s' }}
        >
          ♡
        </div>

        {/* Gentle Butterfly */}
        <div
          className="absolute text-rose-400/50 text-base animate-petal-drift"
          style={{ top: '55%', left: '8%', animationDuration: '18s', animationDelay: '5s' }}
        >
          🦋
        </div>
        <div
          className="absolute text-rose-400/45 text-sm animate-petal-drift"
          style={{ top: '22%', right: '8%', animationDuration: '20s', animationDelay: '7s' }}
        >
          🦋
        </div>
      </div>

      {/* Subtle Bottom Ambient Gradient for Content Readability */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white/40 to-transparent" />
    </div>
  );
};
