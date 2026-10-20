import React, { useState } from 'react';
import {
  Compass,
  Plus,
  CheckCircle2,
  Circle,
  Calendar,
  Sparkles,
  Trash2,
  Edit2,
  Heart,
  Image as ImageIcon,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BucketItem } from '../../types';
import { ImageUploadModal } from '../ui/ImageUploadModal';
import { ASSET_PATHS } from '../../services/storage';

interface BucketListSectionProps {
  items: BucketItem[];
  onSaveItems: (items: BucketItem[]) => void;
  onItemCompleted?: (title: string) => void;
}

export const BucketListSection: React.FC<BucketListSectionProps> = ({
  items,
  onSaveItems,
  onItemCompleted,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BucketItem | null>(null);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

  const [formState, setFormState] = useState({
    title: '',
    description: '',
    category: 'Romance',
    targetDate: '',
    photoUrl: '',
  });

  const pendingItems = items.filter((i) => !i.isCompleted);
  const completedItems = items.filter((i) => i.isCompleted);

  const displayedItems =
    filter === 'all' ? items : filter === 'pending' ? pendingItems : completedItems;

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormState({
      title: '',
      description: '',
      category: 'Romance',
      targetDate: '',
      photoUrl: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: BucketItem) => {
    setEditingItem(item);
    setFormState({
      title: item.title,
      description: item.description,
      category: item.category,
      targetDate: item.targetDate || '',
      photoUrl: item.photoUrl || '',
    });
    setIsModalOpen(true);
  };

  const handleToggleComplete = (item: BucketItem) => {
    const willBeCompleted = !item.isCompleted;
    if (willBeCompleted) {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F4BFD0', '#D8A0A8', '#E8DDF8', '#FDE047'],
      });
      if (onItemCompleted) {
        onItemCompleted(item.title);
      }
    }

    const updated = items.map((i) =>
      i.id === item.id
        ? {
            ...i,
            isCompleted: willBeCompleted,
            completedDate: willBeCompleted ? new Date().toISOString().split('T')[0] : undefined,
          }
        : i
    );
    onSaveItems(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this bucket list item?')) {
      onSaveItems(items.filter((i) => i.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim()) return;

    if (editingItem) {
      const updated = items.map((i) =>
        i.id === editingItem.id
          ? {
              ...i,
              title: formState.title,
              description: formState.description,
              category: formState.category,
              targetDate: formState.targetDate || undefined,
              photoUrl: formState.photoUrl || undefined,
            }
          : i
      );
      onSaveItems(updated);
    } else {
      const newItem: BucketItem = {
        id: 'bucket_' + Date.now(),
        title: formState.title,
        description: formState.description,
        category: formState.category,
        targetDate: formState.targetDate || undefined,
        photoUrl: formState.photoUrl || undefined,
        isCompleted: false,
      };
      onSaveItems([newItem, ...items]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="pt-4 sm:pt-8 pb-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="font-script text-2xl text-rose-600 block">Adventures for Two</span>
          <h2 className="font-serif text-3xl font-bold text-rose-950">
            Our Bucket List 🦋
          </h2>
          <p className="text-xs sm:text-sm text-rose-900/75 mt-0.5">
            Every dream we want to experience, hand in hand.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 shadow-xs transition-colors flex items-center gap-2 self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Bucket Goal</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            filter === 'all'
              ? 'bg-rose-500 text-white shadow-xs'
              : 'bg-white/80 text-rose-900/80 hover:bg-white border border-rose-200'
          }`}
        >
          All Items ({items.length})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            filter === 'pending'
              ? 'bg-rose-500 text-white shadow-xs'
              : 'bg-white/80 text-rose-900/80 hover:bg-white border border-rose-200'
          }`}
        >
          Pending ({pendingItems.length})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            filter === 'completed'
              ? 'bg-rose-500 text-white shadow-xs'
              : 'bg-white/80 text-rose-900/80 hover:bg-white border border-rose-200'
          }`}
        >
          Completed ({completedItems.length})
        </button>
      </div>

      {/* Main List */}
      <div className="space-y-4 mb-16">
        {displayedItems.map((item) => (
          <div
            key={item.id}
            className={`group p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
              item.isCompleted
                ? 'bg-emerald-50/60 border-emerald-200/80'
                : 'bg-white/90 border-rose-200/90 shadow-xs hover:shadow-md'
            }`}
          >
            {/* Toggle Checkbox */}
            <button
              onClick={() => handleToggleComplete(item)}
              className="mt-1 text-rose-500 hover:scale-110 transition-transform shrink-0"
              title={item.isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
            >
              {item.isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
              ) : (
                <Circle className="w-5 h-5 text-rose-400 hover:text-rose-600" />
              )}
            </button>

            <div className="flex-1 min-w-0 text-left">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[10px] font-semibold text-rose-700 uppercase tracking-wider bg-rose-100/70 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                {item.targetDate && (
                  <span className="text-[11px] text-rose-800/80 font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-rose-400" />
                    Target: {item.targetDate}
                  </span>
                )}
                {item.isCompleted && item.completedDate && (
                  <span className="text-[11px] text-emerald-700 font-semibold">
                    ✓ Completed {item.completedDate}
                  </span>
                )}
              </div>

              <h4
                className={`font-serif text-base sm:text-lg font-bold transition-colors ${
                  item.isCompleted ? 'line-through text-stone-500' : 'text-rose-950'
                }`}
              >
                {item.title}
              </h4>

              <p className="text-xs sm:text-sm text-rose-900/80 mt-1 leading-relaxed">
                {item.description}
              </p>

              {/* Photo if completed or attached */}
              {item.photoUrl && (
                <div className="mt-3 rounded-xl overflow-hidden max-h-48 border border-rose-200 max-w-sm">
                  <img src={item.photoUrl} alt={item.title} className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity shrink-0">
              <button
                onClick={() => handleOpenEdit(item)}
                className="p-1.5 text-rose-600 hover:text-rose-950 hover:bg-rose-50 rounded-lg"
                title="Edit item"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 text-rose-500 hover:text-rose-800 hover:bg-rose-50 rounded-lg"
                title="Delete item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dedicated Section: “Beautiful Things We Did Together” */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/95 to-rose-50/80 border-2 border-rose-200/90 shadow-sm text-left">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-400" />
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-rose-950">
            Beautiful Things We Did Together
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-rose-900/80 mb-6">
          Treasured memories from our completed bucket list goals.
        </p>

        {completedItems.length === 0 ? (
          <p className="text-xs text-rose-700/70 italic">
            Check off bucket list adventures above as you experience them together!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {completedItems.map((comp) => (
              <div
                key={comp.id}
                className="p-4 rounded-2xl bg-white/90 border border-emerald-200/90 shadow-xs flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-rose-950">
                    {comp.title}
                  </h4>
                  <p className="text-xs text-rose-900/80 mt-0.5">{comp.description}</p>
                  {comp.completedDate && (
                    <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
                      Completed on {comp.completedDate}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg p-6 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-rose-200">
            <h3 className="font-serif text-xl font-bold text-rose-950 mb-4">
              {editingItem ? 'Edit Bucket Goal' : 'Add New Bucket List Goal'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Goal Title *
                </label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  placeholder="e.g. Watch the Sunrise from a Mountain Peak"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-rose-900 block mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                    placeholder="e.g. Romance, Travel, Date Night"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-rose-900 block mb-1">
                    Target Date (Optional)
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
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  placeholder="Describe why this adventure will be unforgettable..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              {/* Photo */}
              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Memory / Inspiration Photo (Optional)
                </label>
                <div className="flex items-center gap-3">
                  {formState.photoUrl && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-rose-200 shrink-0">
                      <img src={formState.photoUrl} alt="Item" className="w-full h-full object-cover" />
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
                  Save Goal
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
          title="Select Bucket Goal Photo"
          currentImageUrl={formState.photoUrl}
        />
      )}
    </div>
  );
};
