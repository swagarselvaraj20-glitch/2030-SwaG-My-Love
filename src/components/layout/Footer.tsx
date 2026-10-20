import React from 'react';
import { Heart } from 'lucide-react';

interface FooterProps {
  footerText?: string;
  identity?: string;
}

export const Footer: React.FC<FooterProps> = ({
  footerText = 'Made with love, for us and only us. ♡',
  identity = 'SwaG My Love 2030',
}) => {
  return (
    <footer className="mt-20 border-t border-rose-100/80 py-8 bg-white/40 backdrop-blur-xs text-center text-xs text-rose-900/70">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-2">
        <p className="flex items-center justify-center gap-1.5 font-medium text-sm text-rose-900/80">
          <span>{footerText}</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-gentle-pulse inline" />
        </p>
        <p className="font-script text-base text-rose-700/80 tracking-wide">
          {identity} · Eternal Garden
        </p>
      </div>
    </footer>
  );
};
