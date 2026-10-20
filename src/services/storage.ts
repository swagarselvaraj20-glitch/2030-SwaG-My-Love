import {
  BucketItem,
  CoupleProfile,
  DailyMoment,
  DreamItem,
  GardenFlower,
  LoveLetter,
  MemoryFolder,
  MemoryItem,
  SongItem,
  SpecialDate,
  TimelineEntry,
  UserProfile,
} from '../types';

const STORAGE_KEYS = {
  COUPLE: 'olu_couple_profile',
  SWAG_PROFILE: 'olu_swag_profile',
  LOVE_PROFILE: 'olu_love_profile',
  FOLDERS: 'olu_memory_folders',
  MEMORIES: 'olu_memories',
  LETTERS: 'olu_love_letters',
  TIMELINE: 'olu_timeline',
  DREAMS: 'olu_dreams',
  DAILY: 'olu_daily_moments',
  SONGS: 'olu_songs',
  BUCKET: 'olu_bucket_list',
  DATES: 'olu_special_dates',
  GARDEN: 'olu_garden_flowers',
  AUTH_TOKEN: 'olu_auth_state',
};

// Initial uploaded assets provided by the user
export const ASSET_PATHS = {
  COUPLE: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.09.27_AM_29d61d61.jpeg',
  LOVE: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.09.33_AM_d0858793.jpeg',
  SWAG: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.10.18_AM_9bef167a.jpeg',
};

const DEFAULT_COUPLE: CoupleProfile = {
  websiteTitle: 'Our Little Universe ♡',
  romanticHeading: 'Welcome to Our Little Universe',
  subtitle: 'A little world made for two hearts, one beautiful love story, and a forever full of dreams.',
  romanticMessage:
    'Somewhere between a thousand people, two hearts found each other. This is our little world, where every memory matters, every promise means something, and our forever begins.',
  relationshipStartDate: '2023-04-15',
  anniversaryDate: '2024-04-15',
  couplePhotoUrl: ASSET_PATHS.COUPLE,
  romanticIdentity: 'SwaG My Love 2030',
  footerText: 'Made with love, for us and only us. ♡',
  isPrivateUnlocked: false,
  activeTheme: 'pink-rose',
};

const DEFAULT_SWAG: UserProfile = {
  name: 'Swagar',
  displayName: 'SwaG',
  role: 'swag',
  bio: 'Loving you today, tomorrow, and every day leading to our forever 2030 and beyond.',
  avatarUrl: ASSET_PATHS.SWAG,
  birthday: '1998-08-20',
  favoriteColor: 'Midnight Navy & Rose Gold',
  favoriteSong: 'Perfect — Ed Sheeran',
};

const DEFAULT_LOVE: UserProfile = {
  name: 'My Love',
  displayName: 'My Sunshine',
  role: 'love',
  bio: 'My heart, my best friend, and the brightest smile in our entire universe.',
  avatarUrl: ASSET_PATHS.LOVE,
  birthday: '1999-05-12',
  favoriteColor: 'Pastel Blush Pink & White',
  favoriteSong: 'Until I Found You — Stephen Sanchez',
};

const DEFAULT_FOLDERS: MemoryFolder[] = [
  {
    id: 'f1',
    name: 'Our First Moments',
    description: 'The sweet beginning of everything we cherish.',
    coverUrl: ASSET_PATHS.COUPLE,
    createdAt: '2023-04-15',
  },
  {
    id: 'f2',
    name: 'Little Things I Love About You',
    description: 'Your laughter, your warm hands, your gentle gaze.',
    coverUrl: ASSET_PATHS.LOVE,
    createdAt: '2023-06-10',
  },
  {
    id: 'f3',
    name: 'Special Days',
    description: 'Anniversaries, birthdays, and celebrations made of gold.',
    coverUrl: ASSET_PATHS.COUPLE,
    createdAt: '2023-12-25',
  },
  {
    id: 'f4',
    name: 'Future Adventures',
    description: 'Places we will wander and horizons we will share.',
    coverUrl: ASSET_PATHS.SWAG,
    createdAt: '2024-01-01',
  },
  {
    id: 'f5',
    name: 'Just Us',
    description: 'Quiet afternoons, warm smiles, and endless love.',
    coverUrl: ASSET_PATHS.COUPLE,
    createdAt: '2024-02-14',
  },
];

const DEFAULT_MEMORIES: MemoryItem[] = [
  {
    id: 'm1',
    folderId: 'f1',
    title: 'The Smile That Stole My Heart',
    caption: 'Looking at you, I knew my heart had found its permanent home. You illuminate every room you walk into.',
    imageUrl: ASSET_PATHS.LOVE,
    date: '2023-04-15',
    location: 'Our Cozy Cafe Corner',
    createdAt: '2023-04-15',
  },
  {
    id: 'm2',
    folderId: 'f1',
    title: 'Together in Our Little World',
    caption: 'Wrapped in your arms, everything feels peaceful, right, and destined. Two souls, one love story.',
    imageUrl: ASSET_PATHS.COUPLE,
    date: '2023-07-20',
    location: 'Under the Soft Evening Lights',
    createdAt: '2023-07-20',
  },
  {
    id: 'm3',
    folderId: 'f5',
    title: 'Your Warmth and Steadfast Love',
    caption: 'My protector, my companion, my handsome man. So proud of you every single day.',
    imageUrl: ASSET_PATHS.SWAG,
    date: '2023-11-04',
    location: 'City Walkway',
    createdAt: '2023-11-04',
  },
  {
    id: 'm4',
    folderId: 'f3',
    title: 'Our Unforgettable Date Night',
    caption: 'Dressed up with nowhere to be but right here together. The warmth in your eyes speaks louder than words.',
    imageUrl: ASSET_PATHS.COUPLE,
    date: '2024-02-14',
    location: 'Romantic Garden Bistro',
    createdAt: '2024-02-14',
  },
];

const DEFAULT_LETTERS: LoveLetter[] = [
  {
    id: 'l1',
    title: 'To My Future Wife, My Endless Love',
    content: `My dearest love,

Somewhere between a thousand people, two hearts found each other. In a universe so vast and chaotic, finding you felt like the gentlest, most sacred miracle.

You are the soft melody in my quiet mornings, the warm comfort after a long day, and the dream that makes my future feel so vivid and blessed. When I look into your eyes, I see our laughter, our quiet Sunday mornings, our travels across oceans, and the home we will build together.

No matter where life takes us or what mountains we cross, my hand will always be holding yours. Thank you for choosing me, for loving me, and for filling my world with colors I never knew existed.

Forever your man,
SwaG ♡`,
    date: '2024-01-01',
    recipient: 'her',
    category: 'Letters for You',
    isLocked: false,
    isFavorite: true,
    attachedImageUrl: ASSET_PATHS.LOVE,
  },
  {
    id: 'l2',
    title: 'Open When You Miss Me',
    content: `Hey my darling,

If you are reading this right now, close your eyes for a moment and take a deep breath. Feel my embrace around you. Even when we are miles or moments apart, there isn’t a single second where you aren’t living in my heart.

Look up at the stars tonight—we are looking at the very same sky. I am counting down the minutes until I can hold your face in my hands and tell you in person just how deeply you are loved.

You are never alone. I am always, unconditionally yours.`,
    date: '2024-02-14',
    recipient: 'her',
    category: 'Open When You Miss Me',
    isLocked: false,
    isFavorite: true,
  },
  {
    id: 'l3',
    title: 'A Vow For Our 2030 Forever',
    content: `My precious one,

Our journey has a milestone we hold in our hearts: SwaG My Love 2030. 

By then, we will look back at this website and smile at every little prayer, every dream we whispered, and every memory we pinned here. I promise to keep dating you even when we are old and gray, to bring you flowers just because it is Tuesday, and to love you fiercely through every season.`,
    date: '2024-05-01',
    recipient: 'both',
    category: 'Promises for Forever',
    isLocked: false,
    isFavorite: false,
    attachedImageUrl: ASSET_PATHS.COUPLE,
  },
  {
    id: 'l4',
    title: 'To Be Opened on Our Special Milestone',
    content: `Happy milestone day my forever love! If this letter has unlocked, it means another beautiful chapter of our story has unfolded. May our days ahead be filled with even more sweet kisses, gentle embraces, and joyous laughter. I love you more today than yesterday, but never as much as tomorrow.`,
    date: '2024-10-15',
    recipient: 'her',
    category: 'Open on Our Anniversary',
    unlockDate: '2027-04-15',
    isLocked: true,
    isFavorite: false,
  },
];

const DEFAULT_TIMELINE: TimelineEntry[] = [
  {
    id: 't1',
    title: 'The Day Our Story Began',
    date: '2023-04-15',
    description: 'The first time our worlds intertwined. A simple meeting that turned into the greatest blessing of my life.',
    photoUrl: ASSET_PATHS.LOVE,
    location: 'Where We First Met',
    category: 'First Beginning',
  },
  {
    id: 't2',
    title: 'Our First Special Conversation',
    date: '2023-04-28',
    description: 'Hours turned into minutes. We talked about life, family, hopes, and realized our souls spoke the exact same language.',
    location: 'Under the Evening Starlight',
    category: 'Heart to Heart',
  },
  {
    id: 't3',
    title: 'The Moment You Made Me Smile Like Never Before',
    date: '2023-06-12',
    description: 'You did that sweet little laugh of yours, and right then I knew you were something extraordinary.',
    photoUrl: ASSET_PATHS.COUPLE,
    location: 'Quiet Bistro Terrace',
    category: 'Sweet Moments',
  },
  {
    id: 't4',
    title: 'A Promise for Our Future',
    date: '2023-11-20',
    description: 'We sat together and promised that no matter what comes, we will face the world as an unbreakable team.',
    location: 'City Overlook',
    category: 'Sacred Promise',
  },
  {
    id: 't5',
    title: 'The Day We Chose Forever — SwaG My Love 2030',
    date: '2024-04-15',
    description: 'Celebrating one full year of pure joy, deep respect, and choosing each other every single morning.',
    photoUrl: ASSET_PATHS.COUPLE,
    location: 'Our Sacred Spot',
    category: 'Milestone Anniversary',
  },
];

const DEFAULT_DREAMS: DreamItem[] = [
  {
    id: 'd1',
    title: 'Our Dream Cozy Home Garden',
    description: 'A warm, sunlit home with a veranda full of fresh pink roses, fairy lights, and morning coffee together.',
    category: 'Our Future Home',
    targetDate: '2027-12-01',
    progress: 45,
    isCompleted: false,
    notes: 'Saving for the dream terrace and balcony with hanging floral baskets.',
  },
  {
    id: 'd2',
    title: 'Walking Hand-in-Hand in Paris & Switzerland',
    description: 'Watching the Eiffel Tower sparkle and taking scenic trains through snowy Alpine meadows.',
    category: 'Travel Adventures',
    targetDate: '2026-09-15',
    progress: 70,
    isCompleted: false,
    photoUrl: ASSET_PATHS.COUPLE,
    notes: 'Itinerary drafted with candlelit river cruise.',
  },
  {
    id: 'd3',
    title: 'Our SwaG & Love Forever Celebration 2030',
    description: 'The day we stand surrounded by loved ones, flowers, and holy vows, sealing our forever.',
    category: 'Our Future Plans',
    targetDate: '2030-05-18',
    progress: 60,
    isCompleted: false,
    notes: 'A garden celebration bathed in pink roses and golden fairy lights.',
  },
  {
    id: 'd4',
    title: 'Learn Italian Cooking Together',
    description: 'Making handmade pasta, fresh basil sauce, and drinking wine while dancing in the kitchen.',
    category: 'Things to Learn Together',
    targetDate: '2024-08-10',
    progress: 100,
    isCompleted: true,
    completedDate: '2024-08-15',
    notes: 'We made incredible gnocchi and laughed the entire evening!',
  },
];

const DEFAULT_DAILY: DailyMoment[] = [
  {
    id: 'dm1',
    date: '2024-06-18',
    title: 'Morning Voice Note',
    message: 'Woke up to your sweet voice message saying "Have a gentle day my love". It turned an ordinary work day into pure sunshine.',
    mood: 'Romantic',
    favoriteMoment: 'Hearing your sleepy giggle.',
    futureNote: 'Never let a day pass without hearing your voice.',
    createdAt: '2024-06-18T08:30:00Z',
  },
  {
    id: 'dm2',
    date: '2024-06-19',
    title: 'Holding Hands Across the Table',
    message: 'We had dinner and you reached out your hand just to intertwine your fingers with mine. Those little gestures mean the universe to me.',
    mood: 'Grateful',
    favoriteMoment: 'The warmth of your hand.',
    futureNote: 'Love is in the smallest touches.',
    photoUrl: ASSET_PATHS.COUPLE,
    createdAt: '2024-06-19T21:10:00Z',
  },
];

const DEFAULT_SONGS: SongItem[] = [
  {
    id: 's1',
    title: 'Until I Found You',
    artist: 'Stephen Sanchez',
    platform: 'Spotify',
    url: 'https://open.spotify.com/search/Until%20I%20Found%20You%20Stephen%20Sanchez',
    meaning: 'Because heaven was just a word until you walked into my life.',
    coverUrl: ASSET_PATHS.LOVE,
    addedDate: '2023-05-02',
  },
  {
    id: 's2',
    title: 'Perfect',
    artist: 'Ed Sheeran',
    platform: 'Spotify',
    url: 'https://open.spotify.com/search/Perfect%20Ed%20Sheeran',
    meaning: 'Dancing in the dark, with you between my arms, barefoot on the grass.',
    coverUrl: ASSET_PATHS.COUPLE,
    addedDate: '2023-07-14',
  },
  {
    id: 's3',
    title: 'Can’t Help Falling in Love',
    artist: 'Kina Grannis',
    platform: 'YouTube',
    url: 'https://www.youtube.com/results?search_query=Cant+Help+Falling+in+Love+Kina+Grannis',
    meaning: 'Our slow dance song for the quiet evenings with warm candles.',
    addedDate: '2023-10-20',
  },
];

const DEFAULT_BUCKET: BucketItem[] = [
  {
    id: 'b1',
    title: 'Watch the Sunrise From a Mountain Peak',
    description: 'Wrap in a warm blanket together and see the first golden rays touch the clouds.',
    category: 'Nature & Adventure',
    targetDate: '2025-06-20',
    isCompleted: false,
  },
  {
    id: 'b2',
    title: 'Slow Dance in the Rain with No Music',
    description: 'Forget everything else and just feel the raindrops and each other’s heartbeat.',
    category: 'Romance',
    targetDate: '2024-09-10',
    isCompleted: true,
    completedDate: '2024-09-14',
    photoUrl: ASSET_PATHS.COUPLE,
  },
  {
    id: 'b3',
    title: 'Cook a 5-Course Candlelit Dinner at Home',
    description: 'Dress up in our best clothes just for dinner in our own dining room.',
    category: 'Date Night',
    targetDate: '2025-02-14',
    isCompleted: false,
  },
  {
    id: 'b4',
    title: 'Stargaze on a Rooftop Until Midnight',
    description: 'Count shooting stars and make a shared wish for our 2030 future.',
    category: 'Romance',
    targetDate: '2024-05-18',
    isCompleted: true,
    completedDate: '2024-05-19',
  },
];

const DEFAULT_DATES: SpecialDate[] = [
  {
    id: 'sd1',
    title: 'Our Next Anniversary',
    date: '2025-04-15',
    category: 'Anniversary',
    description: 'Celebrating another magical year of loving each other unconditionally.',
    photoUrl: ASSET_PATHS.COUPLE,
  },
  {
    id: 'sd2',
    title: 'Her Birthday 🎂',
    date: '2025-05-12',
    category: 'Birthday',
    description: 'The day my favorite human came into this world. A day for flowers and love.',
    photoUrl: ASSET_PATHS.LOVE,
  },
  {
    id: 'sd3',
    title: 'SwaG Birthday 🎈',
    date: '2025-08-20',
    category: 'Birthday',
    description: 'Celebrating the man of my dreams with lots of surprises.',
    photoUrl: ASSET_PATHS.SWAG,
  },
  {
    id: 'sd4',
    title: 'SwaG My Love 2030 Grand Forever',
    date: '2030-05-18',
    category: 'Milestone',
    description: 'Our eternal milestone date where we celebrate our golden promise forever.',
    photoUrl: ASSET_PATHS.COUPLE,
  },
];

const DEFAULT_GARDEN: GardenFlower[] = [
  {
    id: 'gf1',
    type: 'pink-rose',
    name: 'First Blooming Rose',
    unlockedBy: 'The Day Our Story Began',
    plantedAt: '2023-04-15',
    x: 25,
    y: 35,
  },
  {
    id: 'gf2',
    type: 'cherry-blossom',
    name: 'Sweet Harmony Blossom',
    unlockedBy: 'Slow Dance in the Rain Milestone',
    plantedAt: '2024-09-14',
    x: 65,
    y: 40,
  },
  {
    id: 'gf3',
    type: 'lavender',
    name: 'Peaceful Serenity',
    unlockedBy: 'Italian Cooking Together',
    plantedAt: '2024-08-15',
    x: 45,
    y: 65,
  },
  {
    id: 'gf4',
    type: 'butterfly',
    name: 'Golden Flutter',
    unlockedBy: 'Stargaze on Rooftop',
    plantedAt: '2024-05-19',
    x: 75,
    y: 20,
  },
  {
    id: 'gf5',
    type: 'glowing-star',
    name: 'Star of SwaG My Love 2030',
    unlockedBy: 'Eternal Forever Promise',
    plantedAt: '2024-04-15',
    x: 20,
    y: 70,
  },
];

function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function saveJson<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`Failed to save ${key} to storage:`, err);
  }
}

export const StorageService = {
  getCoupleProfile: (): CoupleProfile => loadJson(STORAGE_KEYS.COUPLE, DEFAULT_COUPLE),
  saveCoupleProfile: (profile: CoupleProfile): void => saveJson(STORAGE_KEYS.COUPLE, profile),

  getSwagProfile: (): UserProfile => loadJson(STORAGE_KEYS.SWAG_PROFILE, DEFAULT_SWAG),
  saveSwagProfile: (profile: UserProfile): void => saveJson(STORAGE_KEYS.SWAG_PROFILE, profile),

  getLoveProfile: (): UserProfile => loadJson(STORAGE_KEYS.LOVE_PROFILE, DEFAULT_LOVE),
  saveLoveProfile: (profile: UserProfile): void => saveJson(STORAGE_KEYS.LOVE_PROFILE, profile),

  getFolders: (): MemoryFolder[] => loadJson(STORAGE_KEYS.FOLDERS, DEFAULT_FOLDERS),
  saveFolders: (folders: MemoryFolder[]): void => saveJson(STORAGE_KEYS.FOLDERS, folders),

  getMemories: (): MemoryItem[] => loadJson(STORAGE_KEYS.MEMORIES, DEFAULT_MEMORIES),
  saveMemories: (memories: MemoryItem[]): void => saveJson(STORAGE_KEYS.MEMORIES, memories),

  getLetters: (): LoveLetter[] => loadJson(STORAGE_KEYS.LETTERS, DEFAULT_LETTERS),
  saveLetters: (letters: LoveLetter[]): void => saveJson(STORAGE_KEYS.LETTERS, letters),

  getTimeline: (): TimelineEntry[] => loadJson(STORAGE_KEYS.TIMELINE, DEFAULT_TIMELINE),
  saveTimeline: (entries: TimelineEntry[]): void => saveJson(STORAGE_KEYS.TIMELINE, entries),

  getDreams: (): DreamItem[] => loadJson(STORAGE_KEYS.DREAMS, DEFAULT_DREAMS),
  saveDreams: (dreams: DreamItem[]): void => saveJson(STORAGE_KEYS.DREAMS, dreams),

  getDailyMoments: (): DailyMoment[] => loadJson(STORAGE_KEYS.DAILY, DEFAULT_DAILY),
  saveDailyMoments: (moments: DailyMoment[]): void => saveJson(STORAGE_KEYS.DAILY, moments),

  getSongs: (): SongItem[] => loadJson(STORAGE_KEYS.SONGS, DEFAULT_SONGS),
  saveSongs: (songs: SongItem[]): void => saveJson(STORAGE_KEYS.SONGS, songs),

  getBucketList: (): BucketItem[] => loadJson(STORAGE_KEYS.BUCKET, DEFAULT_BUCKET),
  saveBucketList: (items: BucketItem[]): void => saveJson(STORAGE_KEYS.BUCKET, items),

  getSpecialDates: (): SpecialDate[] => loadJson(STORAGE_KEYS.DATES, DEFAULT_DATES),
  saveSpecialDates: (dates: SpecialDate[]): void => saveJson(STORAGE_KEYS.DATES, dates),

  getGarden: (): GardenFlower[] => loadJson(STORAGE_KEYS.GARDEN, DEFAULT_GARDEN),
  saveGarden: (flowers: GardenFlower[]): void => saveJson(STORAGE_KEYS.GARDEN, flowers),

  // Session & Authentication (no username/password UI required on first screen)
  isAuthorized: (): boolean => {
    return sessionStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) === 'authorized';
  },

  setAuthorized: (authorized: boolean): void => {
    if (authorized) {
      sessionStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'authorized');
    } else {
      sessionStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    }
  },

  // Reset to original romantic defaults if needed
  resetToDefaults: (): void => {
    localStorage.clear();
    sessionStorage.clear();
  },
};
