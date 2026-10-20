import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  CheckCircle,
  Calendar,
  Heart,
  TrendingUp,
  Trash2,
  Edit2,
  Image as ImageIcon,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DreamCategory, DreamItem } from '../../types';
import { ImageUploadModal } from '../ui/ImageUploadModal';
import { ASSET_PATHS } from '../../services/storage';

interface DreamsSectionProps {
  dreams: DreamItem[];
  onSaveDreams: (dreams: DreamItem[]) => void;
  onDreamCompleted?: (dreamTitle: string) => void;
}

const DREAM_CATEGORIES: DreamCategory[] = [
  'Places to Visit',
  'Our Future Home',
  'Travel Adventures',
  'Family Dreams',
  'Things to Learn Together',
  'Special Experiences',
  'Our Future Plans',
];

export const DreamsSection: React.FC<DreamsSectionProps> = ({
  dreams,
  onSaveDreams,
  onDreamCompleted,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDream, setEditingDream] = useState<DreamItem | null>(null);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

  const [formState, setFormState] = useState({
    title: '',
    description: '',
    category: 'Places to Visit' as DreamCategory,
    targetDate: '2026-12-31',
    progress: 50,
    photoUrl: '',
    notes: '',
  });

  const filteredDreams = dreams.filter((d) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'completed') return d.isCompleted;
    if (selectedCategory === 'in-progress') return !d.isCompleted;
    return d.category === selectedCategory;
  });

  const handleOpenAdd = () => {
    setEditingDream(null);
    setFormState({
      title: '',
      description: '',
      category: 'Places to Visit',
      targetDate: '2027-01-01',
      progress: 25,
      photoUrl: '',
      notes: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (dream: DreamItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingDream(dream);
    setFormState({
      title: dream.title,
      description: dream.description,
      category: dream.category,
      targetDate: dream.targetDate,
      progress: dream.progress,
      photoUrl: dream.photoUrl || '',
      notes: dream.notes || '',
    });
    setIsModalOpen(true);
  };

  const handleToggleComplete = (dreamId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const target = dreams.find((d) => d.id === dreamId);
    if (!target) return;

    const willBeCompleted = !target.isCompleted;
    if (willBeCompleted) {
      // Fire celebration confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F4BFD0', '#F8DDE8', '#D8A0A8', '#FEF08A'],
      });
      if (onDreamCompleted) {
        onDreamCompleted(target.title);
      }
    }

    const updated = dreams.map((d) =>
      d.id === dreamId
        ? {
            ...d,
            isCompleted: willBeCompleted,
            progress: willBeCompleted ? 100 : Math.min(d.progress, 90),
            completedDate: willBeCompleted ? new Date().toISOString().split('T')[0] : undefined,
          }
        : d
    );
    onSaveDreams(updated);
  };

  const handleDelete = (dreamId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this dream?')) {
      onSaveDreams(dreams.filter((d) => d.id !== dreamId));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim()) return;

    const isComplete = formState.progress === 100;

    if (editingDream) {
      const updated = dreams.map((d) =>
        d.id === editingDream.id
          ? {
              ...d,
              title: formState.title,
              description: formState.description,
              category: formState.category,
              targetDate: formState.targetDate,
              progress: formState.progress,
              photoUrl: formState.photoUrl || undefined,
              notes: formState.notes || undefined,
              isCompleted: isComplete,
              completedDate: isComplete ? d.completedDate || new Date().toISOString().split('T')[0] : undefined,
            }
          : d
      );
      onSaveDreams(updated);
    } else {
      const newDream: DreamItem = {
        id: 'dream_' + Date.now(),
        title: formState.title,
        description: formState.description,
        category: formState.category,
        targetDate: formState.targetDate,
        progress: formState.progress,
        isCompleted: isComplete,
        completedDate: isComplete ? new Date().toISOString().split('T')[0] : undefined,
        photoUrl: formState.photoUrl || undefined,
        notes: formState.notes || undefined,
      };
      onSaveDreams([...dreams, newDream]);
    }
    setIsModalOpen(false);
  };

  const completedCount = dreams.filter((d) => d.isCompleted).length;
  const overallProgress =
    dreams.length > 0
      ? Math.round(dreams.reduce((acc, curr) => acc + curr.progress, 0) / dreams.length)
      : 0;

  return (
    <div className="pt-4 sm:pt-8 pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="font-script text-2xl text-rose-600 block">Visions of Our Future</span>
          <h2 className="font-serif text-3xl font-bold text-rose-950">
            Our Dreams ✨
          </h2>
          <p className="text-xs sm:text-sm text-rose-900/75 mt-0.5">
            Little dreams, big forever. Everything we are building toward together.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 shadow-xs transition-colors flex items-center gap-2 self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Dream</span>
        </button>
      </div>

      {/* Featured Banner: "Little Dreams, Big Forever" */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-100/80 via-pink-50 to-amber-50/80 border border-rose-200/90 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-white/70 px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Little Dreams, Big Forever</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-rose-950">
            Walking Hand in Hand Into Tomorrow
          </h3>
          <p className="text-xs sm:text-sm text-rose-900/80 mt-1 max-w-lg">
            Together we have completed {completedCount} of {dreams.length} cherished dreams. Every step brings us closer to our golden 2030 future.
          </p>
        </div>

        <div className="w-full md:w-64 bg-white/90 p-4 rounded-2xl border border-rose-200 text-center shrink-0">
          <div className="flex items-center justify-between text-xs text-rose-900 mb-1 font-semibold">
            <span>Overall Dream Progress</span>
            <span className="tabular-nums">{overallProgress}%</span>
          </div>
          <div className="w-full h-2.5 bg-rose-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all duration-700"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 custom-scrollbar">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            selectedCategory === 'all'
              ? 'bg-rose-500 text-white shadow-xs'
              : 'bg-white/80 text-rose-900/80 hover:bg-white border border-rose-200'
          }`}
        >
          All Dreams ({dreams.length})
        </button>

        <button
          onClick={() => setSelectedCategory('completed')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            selectedCategory === 'completed'
              ? 'bg-rose-500 text-white shadow-xs'
              : 'bg-white/80 text-rose-900/80 hover:bg-white border border-rose-200'
          }`}
        >
          Completed ({completedCount})
        </button>

        <button
          onClick={() => setSelectedCategory('in-progress')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            selectedCategory === 'in-progress'
              ? 'bg-rose-500 text-white shadow-xs'
              : 'bg-white/80 text-rose-900/80 hover:bg-white border border-rose-200'
          }`}
        >
          In Progress ({dreams.length - completedCount})
        </button>

        {DREAM_CATEGORIES.map((cat) => (
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

      {/* Dreams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDreams.map((dream) => (
          <div
            key={dream.id}
            className="group relative p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-rose-200/90 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-100">
                  {dream.category}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => handleOpenEdit(dream, e)}
                    className="p-1 rounded text-rose-500 hover:text-rose-800 transition-colors opacity-0 group-hover:opacity-100"
                    title="Edit dream"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(dream.id, e)}
                    className="p-1 rounded text-rose-500 hover:text-rose-800 transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete dream"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Inspiration Image if present */}
              {dream.photoUrl && (
                <div className="mb-4 rounded-2xl overflow-hidden aspect-video border border-rose-100">
                  <img
                    src={dream.photoUrl}
                    alt={dream.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              <h4 className="font-serif text-lg font-bold text-rose-950 mb-1 group-hover:text-rose-700 transition-colors">
                {dream.title}
              </h4>

              <p className="text-xs sm:text-sm text-rose-900/80 leading-relaxed mb-4">
                {dream.description}
              </p>

              {dream.notes && (
                <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-900 mb-4 italic">
                  “{dream.notes}”
                </div>
              )}
            </div>

            <div>
              {/* Target Date */}
              <div className="flex items-center justify-between text-xs text-rose-800/80 mb-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-rose-500" />
                  <span>Target: {dream.targetDate}</span>
                </span>
                <span className="font-semibold tabular-nums">{dream.progress}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-rose-100 rounded-full overflow-hidden mb-4">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    dream.isCompleted
                      ? 'bg-emerald-500'
                      : 'bg-gradient-to-r from-rose-400 to-pink-500'
                  }`}
                  style={{ width: `${dream.progress}%` }}
                />
              </div>

              {/* Completion Toggle Button */}
              <button
                onClick={(e) => handleToggleComplete(dream.id, e)}
                className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  dream.isCompleted
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                }`}
              >
                <CheckCircle className={`w-4 h-4 ${dream.isCompleted ? 'text-emerald-600' : 'text-rose-400'}`} />
                <span>{dream.isCompleted ? 'Achieved & Cherished! ✨' : 'Mark Completed'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Dream Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg p-6 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-rose-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <h3 className="font-serif text-xl font-bold text-rose-950 mb-4">
              {editingDream ? 'Edit Shared Dream' : 'Add New Shared Dream'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Dream Title *
                </label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  placeholder="e.g. Walking Hand-in-Hand in Paris"
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
                    onChange={(e) => setFormState({ ...formState, category: e.target.value as DreamCategory })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  >
                    {DREAM_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-rose-900 block mb-1">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={formState.targetDate}
                    onChange={(e) => setFormState({ ...formState, targetDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Progress Percentage ({formState.progress}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={formState.progress}
                  onChange={(e) => setFormState({ ...formState, progress: Number(e.target.value) })}
                  className="w-full accent-rose-500"
                />
              </div>

              {/* Inspiration Image */}
              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Inspiration Photograph (Optional)
                </label>
                <div className="flex items-center gap-3">
                  {formState.photoUrl && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-rose-200 shrink-0">
                      <img src={formState.photoUrl} alt="Dream" className="w-full h-full object-cover" />
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

              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  placeholder="Describe this beautiful dream..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Notes / Next Steps (Optional)
                </label>
                <input
                  type="text"
                  value={formState.notes}
                  onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                  placeholder="e.g. Researching flights, saving for cozy veranda"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
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
                  Save Dream
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
          title="Select Dream Inspiration Photo"
          currentImageUrl={formState.photoUrl}
        />
      )}
    </div>
  );
};
