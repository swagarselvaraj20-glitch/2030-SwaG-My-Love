import React, { useState } from 'react';
import {
  Mail,
  Heart,
  Plus,
  Lock,
  Unlock,
  Calendar,
  Sparkles,
  Trash2,
  Edit3,
  X,
  Star,
  Paperclip,
} from 'lucide-react';
import { LetterCategory, LoveLetter } from '../../types';
import { ImageUploadModal } from '../ui/ImageUploadModal';
import { ASSET_PATHS } from '../../services/storage';

interface LoveLettersSectionProps {
  letters: LoveLetter[];
  onSaveLetters: (letters: LoveLetter[]) => void;
}

const CATEGORIES: LetterCategory[] = [
  'Letters for You',
  'Letters for Me',
  'Open When You Miss Me',
  'Open When You Feel Sad',
  'Open on Our Anniversary',
  'Letters for Our Future',
  'Promises for Forever',
];

export const LoveLettersSection: React.FC<LoveLettersSectionProps> = ({
  letters,
  onSaveLetters,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [readingLetter, setReadingLetter] = useState<LoveLetter | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [editingLetterId, setEditingLetterId] = useState<string | null>(null);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

  // Form state
  const [formState, setFormState] = useState({
    title: '',
    content: '',
    recipient: 'her' as 'her' | 'swag' | 'both',
    category: 'Letters for You' as LetterCategory,
    date: new Date().toISOString().split('T')[0],
    unlockDate: '',
    hasUnlockDate: false,
    attachedImageUrl: '',
  });

  const filteredLetters = letters.filter((l) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'favorites') return l.isFavorite;
    return l.category === selectedCategory;
  });

  const handleOpenCompose = () => {
    setEditingLetterId(null);
    setFormState({
      title: '',
      content: '',
      recipient: 'her',
      category: 'Letters for You',
      date: new Date().toISOString().split('T')[0],
      unlockDate: '',
      hasUnlockDate: false,
      attachedImageUrl: '',
    });
    setIsComposeOpen(true);
  };

  const handleEditLetter = (letter: LoveLetter, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingLetterId(letter.id);
    setFormState({
      title: letter.title,
      content: letter.content,
      recipient: letter.recipient,
      category: letter.category,
      date: letter.date,
      unlockDate: letter.unlockDate || '',
      hasUnlockDate: !!letter.unlockDate,
      attachedImageUrl: letter.attachedImageUrl || '',
    });
    setIsComposeOpen(true);
  };

  const handleToggleFavorite = (letterId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = letters.map((l) =>
      l.id === letterId ? { ...l, isFavorite: !l.isFavorite } : l
    );
    onSaveLetters(updated);
  };

  const handleDeleteLetter = (letterId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this love letter?')) {
      const updated = letters.filter((l) => l.id !== letterId);
      onSaveLetters(updated);
      if (readingLetter?.id === letterId) setReadingLetter(null);
    }
  };

  const handleSaveLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim() || !formState.content.trim()) return;

    const isFutureLocked =
      formState.hasUnlockDate &&
      formState.unlockDate &&
      new Date(formState.unlockDate) > new Date();

    if (editingLetterId) {
      const updated = letters.map((l) =>
        l.id === editingLetterId
          ? {
              ...l,
              title: formState.title,
              content: formState.content,
              recipient: formState.recipient,
              category: formState.category,
              date: formState.date,
              unlockDate: formState.hasUnlockDate ? formState.unlockDate : undefined,
              isLocked: !!isFutureLocked,
              attachedImageUrl: formState.attachedImageUrl || undefined,
            }
          : l
      );
      onSaveLetters(updated);
    } else {
      const newLetter: LoveLetter = {
        id: 'letter_' + Date.now(),
        title: formState.title,
        content: formState.content,
        recipient: formState.recipient,
        category: formState.category,
        date: formState.date,
        unlockDate: formState.hasUnlockDate ? formState.unlockDate : undefined,
        isLocked: !!isFutureLocked,
        isFavorite: false,
        attachedImageUrl: formState.attachedImageUrl || undefined,
      };
      onSaveLetters([newLetter, ...letters]);
    }
    setIsComposeOpen(false);
  };

  return (
    <div className="pt-4 sm:pt-8 pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="font-script text-2xl text-rose-600 block">Whispers From the Heart</span>
          <h2 className="font-serif text-3xl font-bold text-rose-950">
            Our Love Letters 💌
          </h2>
          <p className="text-xs sm:text-sm text-rose-900/75 mt-0.5">
            Stationery of the soul. Written for today, preserved for our forever.
          </p>
        </div>

        <button
          onClick={handleOpenCompose}
          className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 shadow-xs transition-colors flex items-center gap-2 self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Write a Love Letter</span>
        </button>
      </div>

      {/* Category Pills Ribbon */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 custom-scrollbar">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            selectedCategory === 'all'
              ? 'bg-rose-500 text-white shadow-xs'
              : 'bg-white/80 text-rose-900/80 hover:bg-white border border-rose-200'
          }`}
        >
          All Letters ({letters.length})
        </button>

        <button
          onClick={() => setSelectedCategory('favorites')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
            selectedCategory === 'favorites'
              ? 'bg-rose-500 text-white shadow-xs'
              : 'bg-white/80 text-rose-900/80 hover:bg-white border border-rose-200'
          }`}
        >
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>Favourites</span>
        </button>

        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-rose-500 text-white shadow-xs'
                : 'bg-white/80 text-rose-900/80 hover:bg-white border border-rose-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Letters Grid */}
      {filteredLetters.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white/60 border border-rose-200/80 text-center">
          <div className="text-4xl mb-3">💌</div>
          <h4 className="font-serif text-lg font-bold text-rose-950 mb-1">
            No love letters found
          </h4>
          <p className="text-xs text-rose-900/70 max-w-sm mx-auto mb-4">
            Pen your first heartfelt note, open-when letter, or promise.
          </p>
          <button
            onClick={handleOpenCompose}
            className="px-5 py-2 text-xs font-semibold text-white bg-rose-500 rounded-full shadow-xs hover:bg-rose-600 transition-colors"
          >
            Write First Letter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLetters.map((letter) => (
            <div
              key={letter.id}
              onClick={() => setReadingLetter(letter)}
              className="group relative p-6 rounded-2xl bg-[#FFFAF7]/95 border-2 border-rose-200/90 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between min-h-[220px]"
              style={{
                backgroundImage: 'radial-gradient(rgba(244, 191, 208, 0.15) 1px, transparent 0)',
                backgroundSize: '16px 16px',
              }}
            >
              {/* Wax Seal / Stamp Accent */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={(e) => handleToggleFavorite(letter.id, e)}
                  className="p-1 text-rose-400 hover:text-amber-500 transition-colors"
                  title="Mark as favourite"
                >
                  <Star
                    className={`w-4 h-4 ${
                      letter.isFavorite ? 'text-amber-400 fill-amber-400' : 'text-rose-300'
                    }`}
                  />
                </button>
                {letter.isLocked ? (
                  <div className="w-7 h-7 rounded-full bg-rose-100 border border-rose-300 text-rose-600 flex items-center justify-center text-xs shadow-xs">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-rose-200/80 border border-rose-300 text-rose-700 flex items-center justify-center text-[11px] font-script shadow-xs">
                    ♡
                  </div>
                )}
              </div>

              {/* Header Details */}
              <div>
                <div className="flex items-center gap-2 text-[11px] text-rose-700/80 font-medium mb-2">
                  <span>{letter.date}</span>
                  <span>·</span>
                  <span className="text-rose-600 uppercase tracking-wider text-[10px]">
                    {letter.category}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-rose-950 mb-2 group-hover:text-rose-700 transition-colors line-clamp-1 pr-14">
                  {letter.title}
                </h3>

                {letter.isLocked ? (
                  <div className="p-3 rounded-xl bg-rose-100/60 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>
                      Locked until {letter.unlockDate}. A surprise waiting for our special day!
                    </span>
                  </div>
                ) : (
                  <p className="font-serif italic text-xs sm:text-sm text-stone-700/85 line-clamp-3 leading-relaxed mb-4">
                    “{letter.content.slice(0, 140)}...”
                  </p>
                )}
              </div>

              {/* Footer info & action */}
              <div className="pt-3 border-t border-rose-200/60 flex items-center justify-between text-xs text-rose-800">
                <span className="font-script text-base text-rose-600">
                  {letter.recipient === 'her' ? 'For My Love' : letter.recipient === 'swag' ? 'For SwaG' : 'For Us Both'}
                </span>

                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => handleEditLetter(letter, e)}
                    className="p-1 rounded text-rose-600 hover:text-rose-950"
                    title="Edit letter"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => handleDeleteLetter(letter.id, e)}
                    className="p-1 rounded text-rose-500 hover:text-rose-800"
                    title="Delete letter"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reading Letter Stationery Viewport */}
      {readingLetter && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-rose-950/70 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setReadingLetter(null)}
        >
          <div
            className="relative max-w-2xl w-full p-6 sm:p-10 bg-[#FFFAF7] rounded-3xl shadow-2xl border-4 border-rose-200/90 text-left max-h-[90vh] overflow-y-auto custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: 'radial-gradient(rgba(216, 160, 168, 0.2) 1px, transparent 0)',
              backgroundSize: '20px 20px',
            }}
          >
            {/* Close */}
            <button
              onClick={() => setReadingLetter(null)}
              className="absolute top-5 right-5 p-2 text-rose-400 hover:text-rose-700 rounded-full hover:bg-rose-100/60"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Letter Head */}
            <div className="border-b border-rose-200 pb-4 mb-6">
              <div className="flex items-center justify-between text-xs text-rose-800 mb-1">
                <span>{readingLetter.date}</span>
                <span className="font-medium text-rose-600">{readingLetter.category}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-rose-950 mt-1">
                {readingLetter.title}
              </h3>
            </div>

            {/* Locked Guard Check */}
            {readingLetter.isLocked ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-100 border-2 border-rose-300 text-rose-600 flex items-center justify-center mx-auto text-2xl">
                  🔒
                </div>
                <h4 className="font-serif text-xl font-bold text-rose-950">
                  This Letter is Sealed With Love
                </h4>
                <p className="text-xs sm:text-sm text-rose-900/80 max-w-md mx-auto leading-relaxed">
                  Scheduled to unlock on <span className="font-semibold">{readingLetter.unlockDate}</span>. No peeking until the day arrives!
                </p>
              </div>
            ) : (
              <div>
                {/* Attached Photograph If Any */}
                {readingLetter.attachedImageUrl && (
                  <div className="mb-6 rounded-2xl overflow-hidden border-2 border-rose-200/80 shadow-xs max-h-72">
                    <img
                      src={readingLetter.attachedImageUrl}
                      alt="Letter attached memory"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Letter Body Text formatted as handwritten prose */}
                <div className="font-serif text-sm sm:text-base text-stone-800 leading-relaxed whitespace-pre-wrap space-y-4">
                  {readingLetter.content}
                </div>

                {/* Wax Signature Stamp */}
                <div className="mt-8 pt-6 border-t border-rose-200 flex items-center justify-between">
                  <span className="font-script text-2xl text-rose-600">
                    Forever & Always, with all my love ♡
                  </span>
                  <div className="w-9 h-9 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center font-script text-base shadow-xs border border-rose-300">
                    S&L
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Compose / Edit Modal */}
      {isComposeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/60 backdrop-blur-sm">
          <div className="relative w-full max-w-xl p-6 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-rose-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <h3 className="font-serif text-xl font-bold text-rose-950 mb-4">
              {editingLetterId ? 'Edit Love Letter' : 'Compose a Love Letter'}
            </h3>

            <form onSubmit={handleSaveLetter} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Letter Title *
                </label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  placeholder="e.g. To My Future Wife, Words From My Heart"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-rose-900 block mb-1">
                    Category
                  </label>
                  <select
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value as LetterCategory })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-rose-900 block mb-1">
                    Recipient
                  </label>
                  <select
                    value={formState.recipient}
                    onChange={(e) => setFormState({ ...formState, recipient: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  >
                    <option value="her">For Her (My Love)</option>
                    <option value="swag">For SwaG</option>
                    <option value="both">For Us Both</option>
                  </select>
                </div>
              </div>

              {/* Special Date Unlock Feature */}
              <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-rose-950">
                  <input
                    type="checkbox"
                    checked={formState.hasUnlockDate}
                    onChange={(e) => setFormState({ ...formState, hasUnlockDate: e.target.checked })}
                    className="rounded text-rose-500 focus:ring-rose-400"
                  />
                  <span>Open This Letter on a Special Date (Time Capsule)</span>
                </label>
                {formState.hasUnlockDate && (
                  <div>
                    <input
                      type="date"
                      value={formState.unlockDate}
                      onChange={(e) => setFormState({ ...formState, unlockDate: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 bg-white"
                    />
                    <span className="text-[11px] text-rose-700/80 block mt-1">
                      This letter will stay sealed until the chosen date arrives.
                    </span>
                  </div>
                )}
              </div>

              {/* Attach Photograph */}
              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Attach Photograph (Optional)
                </label>
                <div className="flex items-center gap-3">
                  {formState.attachedImageUrl && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-rose-200 shrink-0">
                      <img src={formState.attachedImageUrl} alt="Attach" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsImagePickerOpen(true)}
                    className="px-3.5 py-1.5 text-xs font-medium text-rose-800 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 flex items-center gap-1.5"
                  >
                    <Paperclip className="w-3.5 h-3.5" />
                    <span>{formState.attachedImageUrl ? 'Change Attached Photo' : 'Attach Photo'}</span>
                  </button>
                  {formState.attachedImageUrl && (
                    <button
                      type="button"
                      onClick={() => setFormState({ ...formState, attachedImageUrl: '' })}
                      className="text-xs text-rose-500 hover:text-rose-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Letter Prose / Thoughts *
                </label>
                <textarea
                  required
                  rows={8}
                  value={formState.content}
                  onChange={(e) => setFormState({ ...formState, content: e.target.value })}
                  placeholder="Dearest love, when I think of you..."
                  className="w-full px-3.5 py-2.5 text-xs font-serif rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-rose-100">
                <button
                  type="button"
                  onClick={() => setIsComposeOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-rose-800 hover:bg-rose-50 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-xs transition-colors"
                >
                  Save Letter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Picker */}
      {isImagePickerOpen && (
        <ImageUploadModal
          isOpen={isImagePickerOpen}
          onClose={() => setIsImagePickerOpen(false)}
          onSelectImage={(url) => setFormState((prev) => ({ ...prev, attachedImageUrl: url }))}
          title="Attach Photo to Love Letter"
          currentImageUrl={formState.attachedImageUrl}
        />
      )}
    </div>
  );
};
