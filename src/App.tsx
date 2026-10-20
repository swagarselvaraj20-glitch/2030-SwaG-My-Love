import React, { useState, useEffect } from 'react';
import {
  CoupleProfile,
  ThemeId,
  UserProfile,
  MemoryFolder,
  MemoryItem,
  LoveLetter,
  TimelineEntry,
  DreamItem,
  DailyMoment,
  SongItem,
  BucketItem,
  SpecialDate,
  GardenFlower,
} from './types';
import { StorageService } from './services/storage';
import { RomanticBackground } from './components/layout/RomanticBackground';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WelcomeHero } from './components/welcome/WelcomeHero';
import { LoveStoryPreview } from './components/welcome/LoveStoryPreview';
import { AuthModal } from './components/welcome/AuthModal';
import { PrivateHome } from './components/dashboard/PrivateHome';
import { MemoriesSection } from './components/memories/MemoriesSection';
import { LoveLettersSection } from './components/letters/LoveLettersSection';
import { TimelineSection } from './components/timeline/TimelineSection';
import { DreamsSection } from './components/dreams/DreamsSection';
import { DailyMomentsSection } from './components/daily/DailyMomentsSection';
import { SongsSection } from './components/songs/SongsSection';
import { BucketListSection } from './components/bucket/BucketListSection';
import { SpecialDatesSection } from './components/dates/SpecialDatesSection';
import { InteractiveGarden } from './components/garden/InteractiveGarden';
import { SettingsSection } from './components/settings/SettingsSection';

export default function App() {
  // Global Couple Data State
  const [coupleProfile, setCoupleProfile] = useState<CoupleProfile>(() => StorageService.getCoupleProfile());
  const [swagProfile, setSwagProfile] = useState<UserProfile>(() => StorageService.getSwagProfile());
  const [loveProfile, setLoveProfile] = useState<UserProfile>(() => StorageService.getLoveProfile());

  // Entity Lists
  const [folders, setFolders] = useState<MemoryFolder[]>(() => StorageService.getFolders());
  const [memories, setMemories] = useState<MemoryItem[]>(() => StorageService.getMemories());
  const [letters, setLetters] = useState<LoveLetter[]>(() => StorageService.getLetters());
  const [timeline, setTimeline] = useState<TimelineEntry[]>(() => StorageService.getTimeline());
  const [dreams, setDreams] = useState<DreamItem[]>(() => StorageService.getDreams());
  const [dailyMoments, setDailyMoments] = useState<DailyMoment[]>(() => StorageService.getDailyMoments());
  const [songs, setSongs] = useState<SongItem[]>(() => StorageService.getSongs());
  const [bucketList, setBucketList] = useState<BucketItem[]>(() => StorageService.getBucketList());
  const [specialDates, setSpecialDates] = useState<SpecialDate[]>(() => StorageService.getSpecialDates());
  const [garden, setGarden] = useState<GardenFlower[]>(() => StorageService.getGarden());

  // Authorization & Navigation State
  const [isAuthorized, setIsAuthorized] = useState<boolean>(() => StorageService.isAuthorized());
  const [activeView, setActiveView] = useState<string>('welcome');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Persistence triggers
  const handleSaveCoupleProfile = (p: CoupleProfile) => {
    setCoupleProfile(p);
    StorageService.saveCoupleProfile(p);
  };

  const handleSaveSwagProfile = (p: UserProfile) => {
    setSwagProfile(p);
    StorageService.saveSwagProfile(p);
  };

  const handleSaveLoveProfile = (p: UserProfile) => {
    setLoveProfile(p);
    StorageService.saveLoveProfile(p);
  };

  const handleSaveFolders = (f: MemoryFolder[]) => {
    setFolders(f);
    StorageService.saveFolders(f);
  };

  const handleSaveMemories = (m: MemoryItem[]) => {
    setMemories(m);
    StorageService.saveMemories(m);
  };

  const handleSaveLetters = (l: LoveLetter[]) => {
    setLetters(l);
    StorageService.saveLetters(l);
  };

  const handleSaveTimeline = (t: TimelineEntry[]) => {
    setTimeline(t);
    StorageService.saveTimeline(t);
  };

  const handleSaveDreams = (d: DreamItem[]) => {
    setDreams(d);
    StorageService.saveDreams(d);
  };

  const handleSaveDaily = (dm: DailyMoment[]) => {
    setDailyMoments(dm);
    StorageService.saveDailyMoments(dm);
  };

  const handleSaveSongs = (s: SongItem[]) => {
    setSongs(s);
    StorageService.saveSongs(s);
  };

  const handleSaveBucket = (b: BucketItem[]) => {
    setBucketList(b);
    StorageService.saveBucketList(b);
  };

  const handleSaveDates = (sd: SpecialDate[]) => {
    setSpecialDates(sd);
    StorageService.saveSpecialDates(sd);
  };

  const handleSaveGarden = (g: GardenFlower[]) => {
    setGarden(g);
    StorageService.saveGarden(g);
  };

  const handleThemeChange = (themeId: ThemeId) => {
    const updated = { ...coupleProfile, activeTheme: themeId };
    setCoupleProfile(updated);
    StorageService.saveCoupleProfile(updated);
  };

  const handleResetData = () => {
    StorageService.resetToDefaults();
    setCoupleProfile(StorageService.getCoupleProfile());
    setSwagProfile(StorageService.getSwagProfile());
    setLoveProfile(StorageService.getLoveProfile());
    setFolders(StorageService.getFolders());
    setMemories(StorageService.getMemories());
    setLetters(StorageService.getLetters());
    setTimeline(StorageService.getTimeline());
    setDreams(StorageService.getDreams());
    setDailyMoments(StorageService.getDailyMoments());
    setSongs(StorageService.getSongs());
    setBucketList(StorageService.getBucketList());
    setSpecialDates(StorageService.getSpecialDates());
    setGarden(StorageService.getGarden());
    setIsAuthorized(false);
    setActiveView('welcome');
  };

  // Auth flow
  const handleEnterUniverse = () => {
    if (isAuthorized) {
      setActiveView('dashboard');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthorized(true);
    StorageService.setAuthorized(true);
    setIsAuthModalOpen(false);
    setActiveView('dashboard');
  };

  // Callback to plant a flower in the garden when a dream or milestone completes
  const handleMilestoneCompleted = (title: string) => {
    const newFlower: GardenFlower = {
      id: 'garden_' + Date.now(),
      type: 'cherry-blossom',
      name: `Blossom of: ${title.slice(0, 24)}`,
      unlockedBy: title,
      plantedAt: new Date().toISOString().split('T')[0],
      x: Math.floor(Math.random() * 65) + 18,
      y: Math.floor(Math.random() * 55) + 25,
    };
    handleSaveGarden([...garden, newFlower]);
  };

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-rose-200 selection:text-rose-900">
      {/* Dynamic Ambient Floral Garden Background */}
      <RomanticBackground themeId={coupleProfile.activeTheme} />

      {/* Top Bar Navigation */}
      <Navbar
        themeId={coupleProfile.activeTheme}
        activeView={activeView}
        setActiveView={setActiveView}
        isUnlocked={isAuthorized}
        onEnterUniverse={handleEnterUniverse}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full">
        {/* Welcome View */}
        {activeView === 'welcome' && (
          <WelcomeHero
            coupleProfile={coupleProfile}
            onEnterUniverse={handleEnterUniverse}
            onExploreStory={() => setActiveView('preview')}
          />
        )}

        {/* Public Love Story Preview */}
        {activeView === 'preview' && (
          <LoveStoryPreview
            coupleProfile={coupleProfile}
            timeline={timeline}
            onBack={() => setActiveView('welcome')}
            onEnterUniverse={handleEnterUniverse}
          />
        )}

        {/* Authorized Sanctuary Dashboard */}
        {activeView === 'dashboard' && (
          <PrivateHome
            coupleProfile={coupleProfile}
            swagProfile={swagProfile}
            loveProfile={loveProfile}
            onNavigate={(viewId) => setActiveView(viewId)}
            memoriesCount={memories.length}
            lettersCount={letters.length}
            dreamsCount={dreams.length}
            flowersCount={garden.length}
          />
        )}

        {/* Memories Gallery */}
        {activeView === 'memories' && (
          <MemoriesSection
            folders={folders}
            memories={memories}
            onSaveFolders={handleSaveFolders}
            onSaveMemories={handleSaveMemories}
          />
        )}

        {/* Love Letters */}
        {activeView === 'letters' && (
          <LoveLettersSection
            letters={letters}
            onSaveLetters={handleSaveLetters}
          />
        )}

        {/* Relationship Timeline */}
        {activeView === 'timeline' && (
          <TimelineSection
            timeline={timeline}
            onSaveTimeline={handleSaveTimeline}
          />
        )}

        {/* Dreams */}
        {activeView === 'dreams' && (
          <DreamsSection
            dreams={dreams}
            onSaveDreams={handleSaveDreams}
            onDreamCompleted={handleMilestoneCompleted}
          />
        )}

        {/* Daily Moments */}
        {activeView === 'daily' && (
          <DailyMomentsSection
            moments={dailyMoments}
            onSaveMoments={handleSaveDaily}
          />
        )}

        {/* Our Songs */}
        {activeView === 'songs' && (
          <SongsSection
            songs={songs}
            onSaveSongs={handleSaveSongs}
          />
        )}

        {/* Bucket List */}
        {activeView === 'bucket' && (
          <BucketListSection
            items={bucketList}
            onSaveItems={handleSaveBucket}
            onItemCompleted={handleMilestoneCompleted}
          />
        )}

        {/* Special Dates */}
        {activeView === 'dates' && (
          <SpecialDatesSection
            dates={specialDates}
            onSaveDates={handleSaveDates}
          />
        )}

        {/* Our Garden */}
        {activeView === 'garden' && (
          <InteractiveGarden
            garden={garden}
            onSaveGarden={handleSaveGarden}
          />
        )}

        {/* Settings */}
        {activeView === 'settings' && (
          <SettingsSection
            coupleProfile={coupleProfile}
            swagProfile={swagProfile}
            loveProfile={loveProfile}
            onSaveCouple={handleSaveCoupleProfile}
            onSaveSwag={handleSaveSwagProfile}
            onSaveLove={handleSaveLoveProfile}
            onThemeChange={handleThemeChange}
            onResetData={handleResetData}
          />
        )}
      </main>

      {/* Romantic Sanctuary Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        coupleIdentity={coupleProfile.romanticIdentity}
      />

      {/* Romantic Footer */}
      <Footer
        footerText={coupleProfile.footerText}
        identity={coupleProfile.romanticIdentity}
      />
    </div>
  );
}
