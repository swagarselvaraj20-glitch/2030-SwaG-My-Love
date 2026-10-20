import React from 'react';
import {
  Heart,
  Mail,
  Calendar,
  Sparkles,
  BookHeart,
  Music,
  Compass,
  Gift,
  Flower2,
  Settings,
  ArrowRight,
} from 'lucide-react';
import { CoupleProfile, UserProfile } from '../../types';

interface PrivateHomeProps {
  coupleProfile: CoupleProfile;
  swagProfile: UserProfile;
  loveProfile: UserProfile;
  onNavigate: (viewId: string) => void;
  memoriesCount: number;
  lettersCount: number;
  dreamsCount: number;
  flowersCount: number;
}

export const PrivateHome: React.FC<PrivateHomeProps> = ({
  coupleProfile,
  swagProfile,
  loveProfile,
  onNavigate,
  memoriesCount,
  lettersCount,
  dreamsCount,
  flowersCount,
}) => {
  // Calculate days in love
  const startDate = new Date(coupleProfile.relationshipStartDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - startDate.getTime());
  const daysInLove = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const navigationCards = [
    {
      id: 'memories',
      title: 'Our Memories',
      symbol: '♡',
      icon: Heart,
      bgGradient: 'from-rose-50 to-pink-50/70',
      borderColor: 'border-rose-200/90',
      badgeColor: 'bg-rose-100 text-rose-800',
      description: 'Cherished photographs, memory albums, and unforgettable moments together.',
      countText: `${memoriesCount} memories preserved`,
    },
    {
      id: 'letters',
      title: 'Our Love Letters',
      symbol: '💌',
      icon: Mail,
      bgGradient: 'from-amber-50/60 to-rose-50',
      borderColor: 'border-rose-200/90',
      badgeColor: 'bg-amber-100/80 text-amber-900',
      description: 'Intimate words penned from the soul, open-when notes, and future vows.',
      countText: `${lettersCount} letters saved`,
    },
    {
      id: 'timeline',
      title: 'Our Timeline',
      symbol: '🌹',
      icon: Calendar,
      bgGradient: 'from-pink-50 to-purple-50/50',
      borderColor: 'border-pink-200/90',
      badgeColor: 'bg-pink-100 text-pink-800',
      description: 'Our chronological journey from our very first hello to forever.',
      countText: 'Milestone journey',
    },
    {
      id: 'dreams',
      title: 'Our Dreams',
      symbol: '✨',
      icon: Sparkles,
      bgGradient: 'from-purple-50/60 to-rose-50',
      borderColor: 'border-purple-200/90',
      badgeColor: 'bg-purple-100 text-purple-800',
      description: 'Little dreams, big forever. Homes, travels, and promises we will fulfill.',
      countText: `${dreamsCount} shared dreams`,
    },
    {
      id: 'daily',
      title: 'Daily Moments',
      symbol: '🌷',
      icon: BookHeart,
      bgGradient: 'from-emerald-50/60 to-rose-50',
      borderColor: 'border-emerald-200/80',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      description: 'Everyday happiness, gentle voice notes, gratitude, and warm memories.',
      countText: 'Daily journal',
    },
    {
      id: 'songs',
      title: 'Our Songs',
      symbol: '🎵',
      icon: Music,
      bgGradient: 'from-sky-50/60 to-pink-50',
      borderColor: 'border-sky-200/80',
      badgeColor: 'bg-sky-100 text-sky-800',
      description: 'The romantic melodies and acoustic ballads that sing our love.',
      countText: 'Couple playlist',
    },
    {
      id: 'bucket',
      title: 'Our Bucket List',
      symbol: '🦋',
      icon: Compass,
      bgGradient: 'from-teal-50/60 to-rose-50',
      borderColor: 'border-teal-200/80',
      badgeColor: 'bg-teal-100 text-teal-800',
      description: 'Exciting adventures, quiet dates, and dreams waiting to be crossed off.',
      countText: 'Adventures ahead',
    },
    {
      id: 'dates',
      title: 'Special Dates',
      symbol: '🎂',
      icon: Gift,
      bgGradient: 'from-orange-50/60 to-pink-50',
      borderColor: 'border-orange-200/80',
      badgeColor: 'bg-orange-100 text-orange-900',
      description: 'Anniversaries, birthdays, milestones, and countdowns to celebrations.',
      countText: 'Calendar & countdowns',
    },
    {
      id: 'garden',
      title: 'Our Garden',
      symbol: '🌸',
      icon: Flower2,
      bgGradient: 'from-pink-50 to-emerald-50/60',
      borderColor: 'border-rose-200/90',
      badgeColor: 'bg-rose-100 text-rose-800',
      description: 'Watch our digital garden bloom as our love story grows richer every day.',
      countText: `${flowersCount} flowers blooming`,
    },
    {
      id: 'settings',
      title: 'Settings',
      symbol: '⚙️',
      icon: Settings,
      bgGradient: 'from-stone-50 to-rose-50/50',
      borderColor: 'border-stone-200/90',
      badgeColor: 'bg-stone-100 text-stone-800',
      description: 'Customize profiles, change theme aesthetics, and manage relationship dates.',
      countText: 'Personalize world',
    },
  ];

  return (
    <div className="pt-4 sm:pt-8 pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Couple Greeting Banner with Photos */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-md border border-rose-200/90 shadow-sm mb-10 overflow-hidden">
        {/* Soft floral watermark */}
        <div className="absolute -right-8 -bottom-8 text-8xl opacity-10 select-none pointer-events-none">
          🌹
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Couple Avatars Pair */}
            <div className="flex items-center -space-x-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white shadow-md relative z-10 ring-2 ring-rose-200">
                <img
                  src={swagProfile.avatarUrl}
                  alt={swagProfile.displayName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white shadow-md relative z-20 ring-2 ring-rose-200">
                <img
                  src={loveProfile.avatarUrl}
                  alt={loveProfile.displayName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Couple Text */}
            <div>
              <span className="font-script text-xl sm:text-2xl text-rose-600 block">
                {coupleProfile.romanticIdentity}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-rose-950">
                Welcome Home, {swagProfile.displayName} & {loveProfile.displayName}
              </h2>
              <p className="text-xs sm:text-sm text-rose-900/80 mt-1 max-w-md">
                “Two hearts, one little universe, and a thousand beautiful moments waiting to happen.”
              </p>
            </div>
          </div>

          {/* Days In Love Counter Pill Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-rose-100/70 to-pink-50 border border-rose-200/80 text-center shrink-0 w-full md:w-auto shadow-xs">
            <span className="text-[11px] font-medium text-rose-800 uppercase tracking-widest block mb-0.5">
              Forever Journey
            </span>
            <div className="font-serif text-3xl font-bold text-rose-950 tabular-nums">
              {daysInLove.toLocaleString()} <span className="text-sm font-sans font-normal text-rose-700">Days</span>
            </div>
            <span className="text-xs text-rose-700/90 font-script text-base">
              Growing stronger each sunrise ♡
            </span>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-serif text-2xl font-bold text-rose-950">
            Our Private Sanctuary
          </h3>
          <p className="text-xs sm:text-sm text-rose-900/75">
            Select a garden path to view and celebrate our love story.
          </p>
        </div>
      </div>

      {/* 10 Magical Garden Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {navigationCards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => onNavigate(card.id)}
              className={`p-6 rounded-2xl bg-gradient-to-br ${card.bgGradient} backdrop-blur-md border ${card.borderColor} shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between group active:scale-[0.98] min-h-[160px]`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white/90 border border-rose-100 flex items-center justify-center text-rose-600 shadow-xs group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xl select-none">{card.symbol}</span>
                </div>

                <h4 className="font-serif text-lg font-bold text-rose-950 mb-1 group-hover:text-rose-700 transition-colors flex items-center justify-between">
                  <span>{card.title}</span>
                  <ArrowRight className="w-4 h-4 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                </h4>

                <p className="text-xs text-rose-900/75 leading-relaxed mb-4">
                  {card.description}
                </p>
              </div>

              <div className="text-[11px] font-medium text-rose-700 flex items-center gap-1.5 pt-2 border-t border-rose-200/50">
                <span>{card.countText}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
