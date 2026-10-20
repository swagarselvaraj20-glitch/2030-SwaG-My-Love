import React from 'react';
import { Heart, Sparkles, BookOpen, Image as ImageIcon, Mail, Compass, Star } from 'lucide-react';
import { CoupleProfile } from '../../types';

interface WelcomeHeroProps {
  coupleProfile: CoupleProfile;
  onEnterUniverse: () => void;
  onExploreStory: () => void;
}

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({
  coupleProfile,
  onEnterUniverse,
  onExploreStory,
}) => {
  return (
    <div className="relative pt-6 sm:pt-12 pb-16 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col items-center text-center">
      {/* Decorative Floating Floral Accent Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/80 border border-rose-200/90 text-rose-800 text-xs font-medium mb-6 shadow-xs backdrop-blur-xs">
        <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-gentle-pulse" />
        <span className="tracking-wide">{coupleProfile.romanticIdentity}</span>
        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-400" />
      </div>

      {/* Main Romantic Heading */}
      <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-rose-950 max-w-3xl leading-[1.18] text-balance mb-4">
        {coupleProfile.romanticHeading}
      </h1>

      {/* Subtitle */}
      <p className="font-script text-2xl sm:text-3xl text-rose-700/90 max-w-2xl mb-4">
        “Our favourite place is wherever we are together.”
      </p>

      {/* Romantic Message */}
      <p className="text-sm sm:text-base text-rose-900/80 max-w-xl mx-auto mb-8 leading-relaxed font-normal">
        Two hearts, one little universe, and a thousand beautiful moments waiting to happen.
      </p>

      {/* Couple Photo Frame with Animated Delicate Floral Border */}
      <div className="relative mb-10 group">
        {/* Glowing aura */}
        <div className="absolute -inset-2 bg-gradient-to-r from-rose-200 via-pink-200 to-amber-100 rounded-3xl blur-md opacity-70 group-hover:opacity-90 transition-opacity" />

        {/* Outer frame */}
        <div className="relative p-2.5 sm:p-3.5 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-rose-200/90 transition-transform duration-500 hover:scale-[1.01]">
          {/* Floral Corner Accents */}
          <span className="absolute -top-3 -left-3 text-2xl select-none filter drop-shadow-sm">🌸</span>
          <span className="absolute -bottom-3 -right-3 text-2xl select-none filter drop-shadow-sm">🌹</span>

          {/* Photo Container */}
          <div className="w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[26rem] rounded-xl overflow-hidden relative bg-rose-50 border border-rose-100">
            <img
              src={coupleProfile.couplePhotoUrl}
              alt="SwaG and His Love Together"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                // In case image fails, graceful fallback
                (e.target as HTMLElement).style.display = 'none';
              }}
            />

            {/* Subtle Gradient Scrim at bottom */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-rose-950/70 via-rose-950/20 to-transparent flex flex-col items-center justify-end text-white">
              <span className="font-script text-xl tracking-wider text-rose-100 drop-shadow-sm">
                SwaG & His Love
              </span>
              <span className="text-[11px] font-medium text-rose-200/90 uppercase tracking-widest mt-0.5">
                Forever & Always
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
        <button
          onClick={onEnterUniverse}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-md hover:shadow-lg hover:shadow-rose-300/50 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-95"
        >
          <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-12" />
          <span>Enter Our Little Universe ♡</span>
        </button>

        <button
          onClick={onExploreStory}
          className="w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-semibold text-rose-900 bg-white/80 hover:bg-white border border-rose-200 hover:border-rose-300 shadow-xs hover:shadow-sm transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
        >
          <BookOpen className="w-4 h-4 text-rose-500" />
          <span>Explore Our Love Story</span>
        </button>
      </div>

      {/* Three Preview Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl text-left">
        {/* Card 1: Our Memories */}
        <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-rose-200/80 shadow-xs hover:shadow-md transition-all hover:-translate-y-1 group">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
            <ImageIcon className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-rose-950 mb-1 flex items-center gap-1.5">
            Our Memories
            <span className="text-xs text-rose-400">♡</span>
          </h3>
          <p className="text-xs sm:text-sm text-rose-900/75 leading-relaxed">
            Every little moment becomes a beautiful memory.
          </p>
        </div>

        {/* Card 2: Our Love Letters */}
        <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-rose-200/80 shadow-xs hover:shadow-md transition-all hover:-translate-y-1 group">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-rose-950 mb-1 flex items-center gap-1.5">
            Our Love Letters
            <span className="text-xs text-rose-400">💌</span>
          </h3>
          <p className="text-xs sm:text-sm text-rose-900/75 leading-relaxed">
            Words from my heart, saved for our forever.
          </p>
        </div>

        {/* Card 3: Our Dreams */}
        <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-rose-200/80 shadow-xs hover:shadow-md transition-all hover:-translate-y-1 group">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
            <Star className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-rose-950 mb-1 flex items-center gap-1.5">
            Our Dreams
            <span className="text-xs text-rose-400">✨</span>
          </h3>
          <p className="text-xs sm:text-sm text-rose-900/75 leading-relaxed">
            Everything we dream of building together.
          </p>
        </div>
      </div>
    </div>
  );
};
