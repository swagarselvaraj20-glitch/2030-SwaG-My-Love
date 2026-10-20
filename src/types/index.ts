export type ThemeId =
  | 'pink-rose'
  | 'cherry-blossom'
  | 'lavender-love'
  | 'peach-sunset'
  | 'white-rose'
  | 'pastel-meadow'
  | 'moonlight'
  | 'fairy-light';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  subtitle: string;
  bodyBg: string;
  cardBg: string;
  cardBorder: string;
  textHeading: string;
  textBody: string;
  accent: string;
  accentSoft: string;
  fairyLightColor: string;
  floralAccent: string;
}

export interface UserProfile {
  name: string;
  displayName: string;
  role: 'swag' | 'love';
  bio: string;
  avatarUrl: string;
  birthday?: string;
  favoriteColor?: string;
  favoriteSong?: string;
}

export interface CoupleProfile {
  websiteTitle: string;
  romanticHeading: string;
  subtitle: string;
  romanticMessage: string;
  relationshipStartDate: string;
  anniversaryDate: string;
  couplePhotoUrl: string;
  romanticIdentity: string;
  footerText: string;
  isPrivateUnlocked: boolean;
  activeTheme: ThemeId;
}

export interface MemoryFolder {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  createdAt: string;
}

export interface MemoryItem {
  id: string;
  folderId: string;
  title: string;
  caption: string;
  imageUrl: string;
  date: string;
  location?: string;
  createdAt: string;
}

export type LetterCategory =
  | 'Letters for You'
  | 'Letters for Me'
  | 'Open When You Miss Me'
  | 'Open When You Feel Sad'
  | 'Open on Our Anniversary'
  | 'Letters for Our Future'
  | 'Promises for Forever';

export interface LoveLetter {
  id: string;
  title: string;
  content: string;
  date: string;
  recipient: 'her' | 'swag' | 'both';
  category: LetterCategory;
  unlockDate?: string;
  isLocked: boolean;
  isFavorite: boolean;
  attachedImageUrl?: string;
}

export interface TimelineEntry {
  id: string;
  title: string;
  date: string;
  description: string;
  photoUrl?: string;
  location?: string;
  category?: string;
}

export type DreamCategory =
  | 'Places to Visit'
  | 'Our Future Home'
  | 'Travel Adventures'
  | 'Family Dreams'
  | 'Things to Learn Together'
  | 'Special Experiences'
  | 'Our Future Plans';

export interface DreamItem {
  id: string;
  title: string;
  description: string;
  category: DreamCategory;
  targetDate: string;
  progress: number; // 0 - 100
  isCompleted: boolean;
  completedDate?: string;
  photoUrl?: string;
  notes?: string;
}

export type MoodType = 'Happy' | 'Peaceful' | 'Grateful' | 'Romantic' | 'Excited' | 'Missing You';

export interface DailyMoment {
  id: string;
  date: string;
  title: string;
  message: string;
  mood: MoodType;
  favoriteMoment?: string;
  futureNote?: string;
  photoUrl?: string;
  createdAt: string;
}

export interface SongItem {
  id: string;
  title: string;
  artist: string;
  platform: 'Spotify' | 'Apple Music' | 'YouTube' | 'SoundCloud' | 'Other';
  url: string;
  meaning: string;
  coverUrl?: string;
  addedDate: string;
}

export interface BucketItem {
  id: string;
  title: string;
  description: string;
  category: string;
  targetDate?: string;
  isCompleted: boolean;
  completedDate?: string;
  photoUrl?: string;
}

export interface SpecialDate {
  id: string;
  title: string;
  date: string;
  category: 'Birthday' | 'Anniversary' | 'Milestone' | 'Celebration' | 'Reminder' | 'Future Plan';
  description: string;
  photoUrl?: string;
}

export interface GardenFlower {
  id: string;
  type: 'pink-rose' | 'white-flower' | 'cherry-blossom' | 'lavender' | 'butterfly' | 'glowing-star';
  name: string;
  unlockedBy: string;
  plantedAt: string;
  x: number; // % position in garden
  y: number; // % position in garden
}
