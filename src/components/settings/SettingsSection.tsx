import React, { useState } from 'react';
import {
  Settings,
  Heart,
  Palette,
  User,
  ShieldCheck,
  Save,
  RotateCcw,
  Sparkles,
  Camera,
  Calendar,
  Check,
} from 'lucide-react';
import { CoupleProfile, ThemeId, UserProfile } from '../../types';
import { ROMANTIC_THEMES } from '../../constants/themes';
import { ImageUploadModal } from '../ui/ImageUploadModal';
import { ASSET_PATHS } from '../../services/storage';

interface SettingsSectionProps {
  coupleProfile: CoupleProfile;
  swagProfile: UserProfile;
  loveProfile: UserProfile;
  onSaveCouple: (profile: CoupleProfile) => void;
  onSaveSwag: (profile: UserProfile) => void;
  onSaveLove: (profile: UserProfile) => void;
  onThemeChange: (themeId: ThemeId) => void;
  onResetData: () => void;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  coupleProfile,
  swagProfile,
  loveProfile,
  onSaveCouple,
  onSaveSwag,
  onSaveLove,
  onThemeChange,
  onResetData,
}) => {
  const [activeTab, setActiveTab] = useState<'themes' | 'profiles' | 'couple' | 'privacy'>('themes');

  // Local state for forms
  const [coupleForm, setCoupleForm] = useState<CoupleProfile>({ ...coupleProfile });
  const [swagForm, setSwagForm] = useState<UserProfile>({ ...swagProfile });
  const [loveForm, setLoveForm] = useState<UserProfile>({ ...loveProfile });
  const [selectedThemeId, setSelectedThemeId] = useState<ThemeId>(coupleProfile.activeTheme);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Image Upload Picker
  const [imageTarget, setImageTarget] = useState<'couple' | 'swag' | 'love' | null>(null);

  const showNotification = (msg: string) => {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const handleSaveTheme = (themeId: ThemeId) => {
    setSelectedThemeId(themeId);
    onThemeChange(themeId);
    setCoupleForm((prev) => ({ ...prev, activeTheme: themeId }));
    onSaveCouple({ ...coupleForm, activeTheme: themeId });
    showNotification(`Applied "${ROMANTIC_THEMES[themeId].name}" theme successfully!`);
  };

  const handleSaveProfiles = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSwag(swagForm);
    onSaveLove(loveForm);
    showNotification('Personal couple profiles updated beautifully!');
  };

  const handleSaveCoupleProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveCouple(coupleForm);
    showNotification('Relationship milestones and sanctuary settings saved!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset custom edits to the original romantic defaults?')) {
      onResetData();
      showNotification('Reset to original romantic universe defaults.');
    }
  };

  return (
    <div className="pt-4 sm:pt-8 pb-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="font-script text-2xl text-rose-600 block">Personalize Our Sanctuary</span>
          <h2 className="font-serif text-3xl font-bold text-rose-950">
            Settings & Aesthetics ⚙️
          </h2>
          <p className="text-xs sm:text-sm text-rose-900/75 mt-0.5">
            Manage your profiles, photographs, relationship milestones, and 8 garden themes.
          </p>
        </div>

        {saveMessage && (
          <div className="px-4 py-2 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-1.5 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{saveMessage}</span>
          </div>
        )}
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 custom-scrollbar">
        <button
          onClick={() => setActiveTab('themes')}
          className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'themes'
              ? 'bg-rose-500 text-white shadow-xs'
              : 'bg-white/80 text-rose-900/80 hover:bg-white border border-rose-200'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>8 Romantic Themes</span>
        </button>

        <button
          onClick={() => setActiveTab('profiles')}
          className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'profiles'
              ? 'bg-rose-500 text-white shadow-xs'
              : 'bg-white/80 text-rose-900/80 hover:bg-white border border-rose-200'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>My Profile & Her Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('couple')}
          className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'couple'
              ? 'bg-rose-500 text-white shadow-xs'
              : 'bg-white/80 text-rose-900/80 hover:bg-white border border-rose-200'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>Couple Identity & Milestones</span>
        </button>

        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'privacy'
              ? 'bg-rose-500 text-white shadow-xs'
              : 'bg-white/80 text-rose-900/80 hover:bg-white border border-rose-200'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Privacy & Security</span>
        </button>
      </div>

      {/* Tab 1: 8 Romantic Themes */}
      {activeTab === 'themes' && (
        <div className="space-y-6 text-left">
          <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-rose-200/90 shadow-xs">
            <h3 className="font-serif text-xl font-bold text-rose-950 mb-1">
              Select Your Garden Atmosphere
            </h3>
            <p className="text-xs text-rose-900/80 mb-6">
              Choose one of eight custom floral palettes designed for Our Little Universe. The selected theme will automatically adapt colors, backgrounds, fairy lights, and card borders.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(Object.keys(ROMANTIC_THEMES) as ThemeId[]).map((themeKey) => {
                const theme = ROMANTIC_THEMES[themeKey];
                const isSelected = selectedThemeId === theme.id;
                return (
                  <div
                    key={theme.id}
                    onClick={() => handleSaveTheme(theme.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? 'border-rose-500 ring-2 ring-rose-300 shadow-md bg-white'
                        : 'border-rose-100 hover:border-rose-300 bg-white/70 hover:bg-white'
                    }`}
                  >
                    <div>
                      {/* Theme Preview Color Swatch Bar */}
                      <div className={`h-16 rounded-xl ${theme.bodyBg} border border-rose-200/50 mb-3 flex items-center justify-center text-2xl shadow-inner`}>
                        {theme.floralAccent}
                      </div>

                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-serif text-sm font-bold text-rose-950">
                          {theme.name}
                        </h4>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px]">
                            ✓
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-rose-900/75 leading-relaxed">
                        {theme.subtitle}
                      </p>
                    </div>

                    <button
                      type="button"
                      className={`mt-4 w-full py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                        isSelected
                          ? 'bg-rose-500 text-white'
                          : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                      }`}
                    >
                      {isSelected ? 'Active Theme' : 'Apply Theme'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Individual Profiles (SwaG and His Love) */}
      {activeTab === 'profiles' && (
        <form onSubmit={handleSaveProfiles} className="space-y-8 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* PROFILE ONE: SwaG */}
            <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-rose-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-rose-950 flex items-center gap-2">
                  <span>My Profile (SwaG)</span>
                  <span className="text-xs text-rose-400">💙</span>
                </h3>
              </div>

              {/* Avatar upload */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-rose-200 bg-rose-50 shrink-0 shadow-xs">
                  <img src={swagForm.avatarUrl} alt="SwaG" className="w-full h-full object-cover" />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => setImageTarget('swag')}
                    className="px-3.5 py-1.5 text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 flex items-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Upload New Photo</span>
                  </button>
                  <span className="text-[10px] text-rose-700/70 block mt-1">
                    Your real photograph
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={swagForm.name}
                  onChange={(e) => setSwagForm({ ...swagForm, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Display / Pet Name
                </label>
                <input
                  type="text"
                  value={swagForm.displayName}
                  onChange={(e) => setSwagForm({ ...swagForm, displayName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Short Personal Bio
                </label>
                <textarea
                  rows={2}
                  value={swagForm.bio}
                  onChange={(e) => setSwagForm({ ...swagForm, bio: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-rose-900 block mb-1">
                    Birthday (Optional)
                  </label>
                  <input
                    type="date"
                    value={swagForm.birthday || ''}
                    onChange={(e) => setSwagForm({ ...swagForm, birthday: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-rose-900 block mb-1">
                    Favourite Colour
                  </label>
                  <input
                    type="text"
                    value={swagForm.favoriteColor || ''}
                    onChange={(e) => setSwagForm({ ...swagForm, favoriteColor: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Favourite Song
                </label>
                <input
                  type="text"
                  value={swagForm.favoriteSong || ''}
                  onChange={(e) => setSwagForm({ ...swagForm, favoriteSong: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
            </div>

            {/* PROFILE TWO: Her Profile */}
            <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-rose-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-rose-950 flex items-center gap-2">
                  <span>Her Profile (My Love)</span>
                  <span className="text-xs text-rose-400">💖</span>
                </h3>
              </div>

              {/* Avatar upload */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-rose-200 bg-rose-50 shrink-0 shadow-xs">
                  <img src={loveForm.avatarUrl} alt="Her" className="w-full h-full object-cover" />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => setImageTarget('love')}
                    className="px-3.5 py-1.5 text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 flex items-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Upload New Photo</span>
                  </button>
                  <span className="text-[10px] text-rose-700/70 block mt-1">
                    Her real photograph
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Her Name
                </label>
                <input
                  type="text"
                  value={loveForm.name}
                  onChange={(e) => setLoveForm({ ...loveForm, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Display / Sweet Name
                </label>
                <input
                  type="text"
                  value={loveForm.displayName}
                  onChange={(e) => setLoveForm({ ...loveForm, displayName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={loveForm.bio}
                  onChange={(e) => setLoveForm({ ...loveForm, bio: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-rose-900 block mb-1">
                    Birthday (Optional)
                  </label>
                  <input
                    type="date"
                    value={loveForm.birthday || ''}
                    onChange={(e) => setLoveForm({ ...loveForm, birthday: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-rose-900 block mb-1">
                    Favourite Colour
                  </label>
                  <input
                    type="text"
                    value={loveForm.favoriteColor || ''}
                    onChange={(e) => setLoveForm({ ...loveForm, favoriteColor: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Favourite Song
                </label>
                <input
                  type="text"
                  value={loveForm.favoriteSong || ''}
                  onChange={(e) => setLoveForm({ ...loveForm, favoriteSong: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 shadow-xs transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Individual Profiles</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: Couple Profile & Milestones */}
      {activeTab === 'couple' && (
        <form onSubmit={handleSaveCoupleProfile} className="space-y-6 text-left">
          <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-rose-200/90 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-rose-950 border-b border-rose-100 pb-3">
              Couple Profile & Relationship Milestones
            </h3>

            {/* Couple photograph */}
            <div>
              <label className="text-xs font-semibold text-rose-900 block mb-2">
                Main Couple Photograph
              </label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-32 rounded-2xl overflow-hidden border-2 border-rose-200 bg-rose-50 shrink-0 shadow-xs">
                  <img src={coupleForm.couplePhotoUrl} alt="Couple" className="w-full h-full object-cover" />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => setImageTarget('couple')}
                    className="px-4 py-2 text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 flex items-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Change Couple Photograph</span>
                  </button>
                  <span className="text-[11px] text-rose-700/80 block mt-1.5 max-w-xs">
                    This photo is framed on the welcome hero, relationship preview, and couple dashboard.
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Website Title
                </label>
                <input
                  type="text"
                  value={coupleForm.websiteTitle}
                  onChange={(e) => setCoupleForm({ ...coupleForm, websiteTitle: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Romantic Identity
                </label>
                <input
                  type="text"
                  value={coupleForm.romanticIdentity}
                  onChange={(e) => setCoupleForm({ ...coupleForm, romanticIdentity: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Relationship Start Date
                </label>
                <input
                  type="date"
                  value={coupleForm.relationshipStartDate}
                  onChange={(e) => setCoupleForm({ ...coupleForm, relationshipStartDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Anniversary Date
                </label>
                <input
                  type="date"
                  value={coupleForm.anniversaryDate}
                  onChange={(e) => setCoupleForm({ ...coupleForm, anniversaryDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-rose-900 block mb-1">
                Main Romantic Message
              </label>
              <textarea
                rows={3}
                value={coupleForm.romanticMessage}
                onChange={(e) => setCoupleForm({ ...coupleForm, romanticMessage: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 leading-relaxed"
              />
            </div>

            <div className="flex justify-end pt-3">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 shadow-xs transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Couple Settings</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tab 4: Privacy & Security */}
      {activeTab === 'privacy' && (
        <div className="space-y-6 text-left">
          <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-rose-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-rose-950 font-serif text-lg font-bold border-b border-rose-100 pb-3">
              <ShieldCheck className="w-5 h-5 text-rose-500" />
              <span>Sanctuary Privacy & Data Protection</span>
            </div>

            <div className="text-xs text-rose-900/80 space-y-3 leading-relaxed">
              <p>
                <strong>Private Sanctuary Isolation:</strong> Our Little Universe is engineered exclusively for two hearts. Personal love letters, private photographs, daily journals, and time capsules are sealed behind authorized session validation.
              </p>
              <p>
                <strong>Zero Public Exposure:</strong> Public visitors cannot view personal letters, secret open-when notes, or private album contents. The public preview is strictly limited to your welcome message and curated relationship chapters.
              </p>
              <p>
                <strong>Encrypted Storage:</strong> All uploaded photographs and entries are securely persisted in your browser's persistent storage engine, preventing data loss across reloads.
              </p>
            </div>

            {/* Reset Defaults */}
            <div className="pt-4 border-t border-rose-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-rose-950 block">Reset Experience</span>
                <span className="text-[11px] text-rose-700/80">
                  Restore all content, albums, and letters back to the initial romantic couple defaults.
                </span>
              </div>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Defaults</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image picker modal */}
      {imageTarget && (
        <ImageUploadModal
          isOpen={!!imageTarget}
          onClose={() => setImageTarget(null)}
          onSelectImage={(url) => {
            if (imageTarget === 'couple') {
              setCoupleForm((prev) => ({ ...prev, couplePhotoUrl: url }));
              onSaveCouple({ ...coupleForm, couplePhotoUrl: url });
            } else if (imageTarget === 'swag') {
              setSwagForm((prev) => ({ ...prev, avatarUrl: url }));
              onSaveSwag({ ...swagForm, avatarUrl: url });
            } else if (imageTarget === 'love') {
              setLoveForm((prev) => ({ ...prev, avatarUrl: url }));
              onSaveLove({ ...loveForm, avatarUrl: url });
            }
            showNotification('Photo updated successfully!');
          }}
          title={
            imageTarget === 'couple'
              ? 'Change Couple Photograph'
              : imageTarget === 'swag'
              ? 'Update SwaG Photograph'
              : 'Update Her Photograph'
          }
          currentImageUrl={
            imageTarget === 'couple'
              ? coupleForm.couplePhotoUrl
              : imageTarget === 'swag'
              ? swagForm.avatarUrl
              : loveForm.avatarUrl
          }
        />
      )}
    </div>
  );
};
