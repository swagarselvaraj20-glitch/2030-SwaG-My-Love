import React, { useState } from 'react';
import { Heart, Menu, X, Sparkles, Flower2, BookHeart, Compass } from 'lucide-react';
import { ThemeId } from '../../types';
import { ROMANTIC_THEMES } from '../../constants/themes';

interface NavbarProps {
  themeId: ThemeId;
  activeView: string;
  setActiveView: (view: string) => void;
  isUnlocked: boolean;
  onEnterUniverse: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  themeId,
  activeView,
  setActiveView,
  isUnlocked,
  onEnterUniverse,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = ROMANTIC_THEMES[themeId] || ROMANTIC_THEMES['pink-rose'];

  const navLinks = isUnlocked
    ? [
        { id: 'dashboard', label: 'Home' },
        { id: 'memories', label: 'Memories' },
        { id: 'letters', label: 'Love Letters' },
        { id: 'timeline', label: 'Timeline' },
        { id: 'dreams', label: 'Dreams' },
        { id: 'garden', label: 'Garden' },
      ]
    : [
        { id: 'welcome', label: 'Welcome' },
        { id: 'preview', label: 'Our Story' },
      ];

  const handleNavClick = (viewId: string) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-rose-100/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <button
          onClick={() => setActiveView(isUnlocked ? 'dashboard' : 'welcome')}
          className="flex items-center gap-2 text-left whitespace-nowrap shrink-0 group focus:outline-none"
        >
          <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-rose-950 flex items-center gap-1.5">
            Our Little Universe <Heart className="w-4 h-4 text-rose-500 fill-rose-400 inline transition-transform group-hover:scale-125" />
          </span>
        </button>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-rose-900/80">
          {navLinks.map((link) => {
            const isActive = activeView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 relative py-1 text-sm ${
                  isActive
                    ? 'text-rose-950 font-semibold'
                    : 'text-rose-900/70 hover:text-rose-950'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {!isUnlocked ? (
            <button
              onClick={onEnterUniverse}
              className="px-4 py-2 text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 rounded-full shadow-sm hover:shadow-rose-200 transition-all whitespace-nowrap flex items-center gap-1.5 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Enter Universe ♡</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveView('settings')}
              className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeView === 'settings'
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-rose-50/70 text-rose-800 border-rose-200 hover:bg-rose-100'
              }`}
            >
              <span>Settings ⚙️</span>
            </button>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          {!isUnlocked ? (
            <button
              onClick={onEnterUniverse}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-rose-500 rounded-full shadow-xs active:scale-95"
            >
              Enter ♡
            </button>
          ) : null}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-rose-800 hover:text-rose-950 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-rose-100 px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeView === link.id
                  ? 'bg-rose-100/70 text-rose-950 font-semibold'
                  : 'text-rose-900/80 hover:bg-rose-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          {isUnlocked && (
            <div className="pt-2 border-t border-rose-100 flex flex-col gap-1">
              <button
                onClick={() => handleNavClick('daily')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-rose-900/80 hover:bg-rose-50"
              >
                Daily Moments 🌷
              </button>
              <button
                onClick={() => handleNavClick('songs')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-rose-900/80 hover:bg-rose-50"
              >
                Our Songs 🎵
              </button>
              <button
                onClick={() => handleNavClick('bucket')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-rose-900/80 hover:bg-rose-50"
              >
                Bucket List 🦋
              </button>
              <button
                onClick={() => handleNavClick('dates')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-rose-900/80 hover:bg-rose-50"
              >
                Special Dates 🎂
              </button>
              <button
                onClick={() => handleNavClick('settings')}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold bg-rose-50 text-rose-800"
              >
                Settings ⚙️
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
