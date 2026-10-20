import React, { useState } from 'react';
import {
  BookHeart,
  Plus,
  Calendar as CalendarIcon,
  Search,
  Smile,
  Heart,
  Sparkles,
  Trash2,
  Edit2,
  Image as ImageIcon,
} from 'lucide-react';
import { DailyMoment, MoodType } from '../../types';
import { ImageUploadModal } from '../ui/ImageUploadModal';
import { LightboxModal } from '../ui/LightboxModal';
import { ASSET_PATHS } from '../../services/storage';

interface DailyMomentsSectionProps {
  moments: DailyMoment[];
  onSaveMoments: (moments: DailyMoment[]) => void;
}

const MOODS: { type: MoodType; emoji: string; color: string }[] = [
  { type: 'Romantic', emoji: '💖', color: 'bg-rose-100 text-rose-800 border-rose-200' },
  { type: 'Happy', emoji: '✨', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  { type: 'Peaceful', emoji: '🌿', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  { type: 'Grateful', emoji: '🌸', color: 'bg-pink-100 text-pink-800 border-pink-200' },
  { type: 'Excited', emoji: '🎉', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { type: 'Missing You', emoji: '🥺', color: 'bg-blue-100 text-blue-800 border-blue-200' },
];

export const DailyMomentsSection: React.FC<DailyMomentsSectionProps> = ({
  moments,
  onSaveMoments,
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMoment, setEditingMoment] = useState<DailyMoment | null>(null);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [lightboxData, setLightboxData] = useState<DailyMoment | null>(null);

  const [formState, setFormState] = useState({
    date: new Date().toISOString().split('T')[0],
    title: '',
    message: '',
    mood: 'Romantic' as MoodType,
    favoriteMoment: '',
    futureNote: '',
    photoUrl: '',
  });

  const filteredMoments = moments.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.favoriteMoment?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMood = selectedMood === 'all' || m.mood === selectedMood;
    return matchesSearch && matchesMood;
  });

  const handleOpenAdd = () => {
    setEditingMoment(null);
    setFormState({
      date: new Date().toISOString().split('T')[0],
      title: '',
      message: '',
      mood: 'Romantic',
      favoriteMoment: '',
      futureNote: '',
      photoUrl: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (moment: DailyMoment) => {
    setEditingMoment(moment);
    setFormState({
      date: moment.date,
      title: moment.title,
      message: moment.message,
      mood: moment.mood,
      favoriteMoment: moment.favoriteMoment || '',
      futureNote: moment.futureNote || '',
      photoUrl: moment.photoUrl || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this journal entry?')) {
      onSaveMoments(moments.filter((m) => m.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim() || !formState.message.trim()) return;

    if (editingMoment) {
      const updated = moments.map((m) =>
        m.id === editingMoment.id
          ? {
              ...m,
              date: formState.date,
              title: formState.title,
              message: formState.message,
              mood: formState.mood,
              favoriteMoment: formState.favoriteMoment || undefined,
              futureNote: formState.futureNote || undefined,
              photoUrl: formState.photoUrl || undefined,
            }
          : m
      );
      onSaveMoments(updated);
    } else {
      const newMoment: DailyMoment = {
        id: 'moment_' + Date.now(),
        date: formState.date,
        title: formState.title,
        message: formState.message,
        mood: formState.mood,
        favoriteMoment: formState.favoriteMoment || undefined,
        futureNote: formState.futureNote || undefined,
        photoUrl: formState.photoUrl || undefined,
        createdAt: new Date().toISOString(),
      };
      onSaveMoments([newMoment, ...moments]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="pt-4 sm:pt-8 pb-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="font-script text-2xl text-rose-600 block">Everyday Little Smiles</span>
          <h2 className="font-serif text-3xl font-bold text-rose-950">
            Daily Moments 🌷
          </h2>
          <p className="text-xs sm:text-sm text-rose-900/75 mt-0.5">
            A gentle couple journal for daily thoughts, moods, and favorite seconds of today.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 shadow-xs transition-colors flex items-center gap-2 self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Write Daily Entry</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-rose-200/80 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-rose-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search journal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-rose-200 bg-white/90 focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        </div>

        {/* Mood Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto custom-scrollbar pb-1">
          <button
            onClick={() => setSelectedMood('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedMood === 'all'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'bg-rose-50/80 text-rose-800 hover:bg-rose-100'
            }`}
          >
            All Moods
          </button>
          {MOODS.map((m) => (
            <button
              key={m.type}
              onClick={() => setSelectedMood(m.type)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap flex items-center gap-1 transition-colors ${
                selectedMood === m.type
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-white border border-rose-200/80 text-rose-800 hover:bg-rose-50'
              }`}
            >
              <span>{m.emoji}</span>
              <span>{m.type}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Journal Entries List */}
      {filteredMoments.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white/60 border border-rose-200/80 text-center">
          <div className="text-4xl mb-3">🌷</div>
          <h4 className="font-serif text-lg font-bold text-rose-950 mb-1">
            No journal entries found
          </h4>
          <p className="text-xs text-rose-900/70 max-w-sm mx-auto mb-4">
            Capture a cute text message, a laugh, or a quiet moment from today.
          </p>
          <button
            onClick={handleOpenAdd}
            className="px-5 py-2 text-xs font-semibold text-white bg-rose-500 rounded-full shadow-xs hover:bg-rose-600 transition-colors"
          >
            Write Entry
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredMoments.map((entry) => {
            const moodConfig = MOODS.find((m) => m.type === entry.mood) || MOODS[0];
            return (
              <div
                key={entry.id}
                className="group p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-rose-200/90 shadow-xs hover:shadow-md transition-all duration-300 text-left"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-xs text-rose-700/80 font-medium">
                      <CalendarIcon className="w-3.5 h-3.5 text-rose-500" />
                      {entry.date}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${moodConfig.color}`}
                    >
                      <span>{moodConfig.emoji}</span>
                      <span>{entry.mood}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto opacity-75 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenEdit(entry)}
                      className="p-1.5 text-rose-600 hover:text-rose-950 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Edit journal entry"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="p-1.5 text-rose-500 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete journal entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-serif text-xl font-bold text-rose-950 mb-2">
                  {entry.title}
                </h3>

                <p className="text-xs sm:text-sm text-rose-900/85 leading-relaxed whitespace-pre-wrap mb-4">
                  {entry.message}
                </p>

                {/* Optional Photograph */}
                {entry.photoUrl && (
                  <div
                    onClick={() => setLightboxData(entry)}
                    className="mb-4 rounded-2xl overflow-hidden max-h-60 border border-rose-200/80 cursor-pointer shadow-xs max-w-sm"
                  >
                    <img
                      src={entry.photoUrl}
                      alt={entry.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Sub-cards: Favorite Moment & Future Note */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-rose-100 text-xs">
                  {entry.favoriteMoment && (
                    <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-100">
                      <span className="font-semibold text-rose-900 flex items-center gap-1 mb-0.5">
                        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-400" />
                        Favorite Moment:
                      </span>
                      <p className="text-rose-800/80 italic">“{entry.favoriteMoment}”</p>
                    </div>
                  )}
                  {entry.futureNote && (
                    <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100">
                      <span className="font-semibold text-amber-950 flex items-center gap-1 mb-0.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        Note for the Future:
                      </span>
                      <p className="text-amber-900/80 italic">“{entry.futureNote}”</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox */}
      {lightboxData && (
        <LightboxModal
          isOpen={!!lightboxData}
          onClose={() => setLightboxData(null)}
          imageUrl={lightboxData.photoUrl || ''}
          title={lightboxData.title}
          caption={lightboxData.message}
          date={lightboxData.date}
        />
      )}

      {/* Add / Edit Daily Moment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg p-6 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-rose-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <h3 className="font-serif text-xl font-bold text-rose-950 mb-4">
              {editingMoment ? 'Edit Daily Journal Entry' : 'New Daily Journal Moment'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-left">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-rose-900 block mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formState.date}
                    onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-rose-900 block mb-1">
                    Today's Mood
                  </label>
                  <select
                    value={formState.mood}
                    onChange={(e) => setFormState({ ...formState, mood: e.target.value as MoodType })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  >
                    {MOODS.map((m) => (
                      <option key={m.type} value={m.type}>
                        {m.emoji} {m.type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Title of Today's Moment *
                </label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  placeholder="e.g. Laughing Together on the Phone"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Daily Message / Journal Entry *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="What made you smile today? What did you feel?"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 leading-relaxed"
                />
              </div>

              {/* Photo attachment */}
              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Attach Photo (Optional)
                </label>
                <div className="flex items-center gap-3">
                  {formState.photoUrl && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-rose-200 shrink-0">
                      <img src={formState.photoUrl} alt="Moment" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsImagePickerOpen(true)}
                    className="px-3.5 py-1.5 text-xs font-medium text-rose-800 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 flex items-center gap-1.5"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>{formState.photoUrl ? 'Change Photo' : 'Select Photo'}</span>
                  </button>
                  {formState.photoUrl && (
                    <button
                      type="button"
                      onClick={() => setFormState({ ...formState, photoUrl: '' })}
                      className="text-xs text-rose-500 hover:text-rose-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-rose-900 block mb-1">
                    Favorite Moment of Today
                  </label>
                  <input
                    type="text"
                    value={formState.favoriteMoment}
                    onChange={(e) => setFormState({ ...formState, favoriteMoment: e.target.value })}
                    placeholder="e.g. Your sweet morning smile"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-rose-900 block mb-1">
                    Note for the Future
                  </label>
                  <input
                    type="text"
                    value={formState.futureNote}
                    onChange={(e) => setFormState({ ...formState, futureNote: e.target.value })}
                    placeholder="e.g. Remember to buy her flowers"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-rose-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-rose-800 hover:bg-rose-50 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-xs transition-colors"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image picker */}
      {isImagePickerOpen && (
        <ImageUploadModal
          isOpen={isImagePickerOpen}
          onClose={() => setIsImagePickerOpen(false)}
          onSelectImage={(url) => setFormState((prev) => ({ ...prev, photoUrl: url }))}
          title="Select Daily Moment Photo"
          currentImageUrl={formState.photoUrl}
        />
      )}
    </div>
  );
};
