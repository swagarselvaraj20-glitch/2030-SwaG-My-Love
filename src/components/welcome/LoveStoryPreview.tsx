import React from 'react';
import { Heart, Sparkles, Calendar, ArrowLeft, Lock } from 'lucide-react';
import { CoupleProfile, TimelineEntry } from '../../types';

interface LoveStoryPreviewProps {
  coupleProfile: CoupleProfile;
  timeline: TimelineEntry[];
  onBack: () => void;
  onEnterUniverse: () => void;
}

export const LoveStoryPreview: React.FC<LoveStoryPreviewProps> = ({
  coupleProfile,
  timeline,
  onBack,
  onEnterUniverse,
}) => {
  return (
    <div className="pt-6 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Back button */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-rose-800 hover:text-rose-950 px-3.5 py-1.5 rounded-full bg-white/70 border border-rose-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Welcome</span>
        </button>

        <button
          onClick={onEnterUniverse}
          className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 px-4 py-1.5 rounded-full shadow-xs transition-all active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Enter Universe ♡</span>
        </button>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <span className="font-script text-2xl text-rose-600">A Journey of Two Hearts</span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-rose-950 mt-1 mb-3">
          Our Love Story
        </h2>
        <p className="text-sm text-rose-900/80 max-w-xl mx-auto leading-relaxed">
          {coupleProfile.romanticMessage}
        </p>
      </div>

      {/* Couple Showcase Frame */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-rose-200/90 shadow-sm mb-12 flex flex-col md:flex-row items-center gap-8">
        <div className="w-48 h-64 sm:w-56 sm:h-72 rounded-2xl overflow-hidden shadow-md shrink-0 border-2 border-rose-100">
          <img
            src={coupleProfile.couplePhotoUrl}
            alt="SwaG & His Love"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 text-center md:text-left space-y-3">
          <div className="inline-block font-script text-xl text-rose-500">
            {coupleProfile.romanticIdentity}
          </div>
          <h3 className="font-serif text-2xl font-bold text-rose-950">
            Two Hearts, One Sacred Miracle
          </h3>
          <p className="text-xs sm:text-sm text-rose-900/80 leading-relaxed">
            Every step we have taken together has led to this sanctuary. A world built on kindness, laughter, unwavering loyalty, and promises that will outlive time.
          </p>
          <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-4 text-xs text-rose-800 font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-rose-500" />
              Story Began: {coupleProfile.relationshipStartDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              Milestone: 2030 Forever
            </span>
          </div>
        </div>
      </div>

      {/* Public Milestone Chapters Preview */}
      <div className="space-y-6 mb-12">
        <h3 className="font-serif text-xl font-bold text-rose-950 text-center mb-6">
          Chapters of Our Beginning
        </h3>

        <div className="relative border-l-2 border-rose-200/80 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
          {timeline.slice(0, 3).map((item, idx) => (
            <div key={item.id} className="relative group">
              {/* Connector floral heart */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-rose-100 border border-rose-300 flex items-center justify-center text-xs text-rose-600">
                ♡
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-rose-200/70 shadow-xs">
                <div className="flex items-center justify-between text-xs text-rose-700/80 mb-1 font-medium">
                  <span>{item.date}</span>
                  {item.category && (
                    <span className="text-[11px] text-rose-500 uppercase tracking-wider">
                      {item.category}
                    </span>
                  )}
                </div>
                <h4 className="font-serif text-lg font-bold text-rose-950 mb-1">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-rose-900/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Private Sanctuary Notice */}
      <div className="p-6 rounded-2xl bg-rose-50/90 border border-rose-200/80 text-center flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-rose-200/70 text-rose-800 flex items-center justify-center">
          <Lock className="w-5 h-5" />
        </div>
        <h4 className="font-serif text-lg font-bold text-rose-950">
          Our Private Sanctuary Awaits
        </h4>
        <p className="text-xs sm:text-sm text-rose-900/80 max-w-md">
          Personal love letters, intimate memory albums, daily journals, and shared dreams are safely preserved inside our private universe.
        </p>
        <button
          onClick={onEnterUniverse}
          className="mt-2 px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 shadow-sm transition-transform active:scale-95"
        >
          Enter Our Little Universe ♡
        </button>
      </div>
    </div>
  );
};
