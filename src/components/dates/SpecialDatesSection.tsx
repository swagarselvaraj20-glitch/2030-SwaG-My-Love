import React, { useState, useEffect } from 'react';
import {
  Gift,
  Plus,
  Calendar,
  Clock,
  Sparkles,
  Heart,
  Trash2,
  Edit2,
  Cake,
  PartyPopper,
} from 'lucide-react';
import { SpecialDate } from '../../types';
import { ImageUploadModal } from '../ui/ImageUploadModal';
import { ASSET_PATHS } from '../../services/storage';

interface SpecialDatesSectionProps {
  dates: SpecialDate[];
  onSaveDates: (dates: SpecialDate[]) => void;
}

export const SpecialDatesSection: React.FC<SpecialDatesSectionProps> = ({
  dates,
  onSaveDates,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDate, setEditingDate] = useState<SpecialDate | null>(null);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [now, setNow] = useState(new Date());

  // Update live clock every minute
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const [formState, setFormState] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Anniversary' as SpecialDate['category'],
    description: '',
    photoUrl: '',
  });

  // Calculate upcoming dates
  const sortedDates = [...dates].sort((a, b) => {
    const aTime = new Date(a.date).getTime();
    const bTime = new Date(b.date).getTime();
    return aTime - bTime;
  });

  // Find next upcoming date
  const nextUpcoming = sortedDates.find((d) => new Date(d.date).getTime() >= now.getTime()) || sortedDates[0];

  const getCountdown = (targetDateStr: string) => {
    const target = new Date(targetDateStr).getTime();
    const diff = target - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, isPast: true };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { days, hours, minutes, isPast: false };
  };

  const nextCountdown = nextUpcoming ? getCountdown(nextUpcoming.date) : null;

  const handleOpenAdd = () => {
    setEditingDate(null);
    setFormState({
      title: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Anniversary',
      description: '',
      photoUrl: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (d: SpecialDate) => {
    setEditingDate(d);
    setFormState({
      title: d.title,
      date: d.date,
      category: d.category,
      description: d.description,
      photoUrl: d.photoUrl || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this special date reminder?')) {
      onSaveDates(dates.filter((d) => d.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim()) return;

    if (editingDate) {
      const updated = dates.map((d) =>
        d.id === editingDate.id
          ? {
              ...d,
              title: formState.title,
              date: formState.date,
              category: formState.category,
              description: formState.description,
              photoUrl: formState.photoUrl || undefined,
            }
          : d
      );
      onSaveDates(updated);
    } else {
      const newDate: SpecialDate = {
        id: 'date_' + Date.now(),
        title: formState.title,
        date: formState.date,
        category: formState.category,
        description: formState.description,
        photoUrl: formState.photoUrl || undefined,
      };
      onSaveDates([...dates, newDate]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="pt-4 sm:pt-8 pb-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="font-script text-2xl text-rose-600 block">Golden Days to Celebrate</span>
          <h2 className="font-serif text-3xl font-bold text-rose-950">
            Special Dates 🎂
          </h2>
          <p className="text-xs sm:text-sm text-rose-900/75 mt-0.5">
            Every anniversary, milestone, and birthday we hold dear.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 shadow-xs transition-colors flex items-center gap-2 self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Special Date</span>
        </button>
      </div>

      {/* Hero Countdown Box */}
      {nextUpcoming && nextCountdown && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-100/90 via-pink-100/60 to-amber-100/80 border border-rose-200/90 shadow-xs mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 text-rose-800 text-xs font-semibold mb-2">
              <Clock className="w-3.5 h-3.5 text-rose-500" />
              <span>Next Milestone Countdown</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-rose-950">
              {nextUpcoming.title}
            </h3>
            <p className="text-xs sm:text-sm text-rose-900/80 mt-1 max-w-md">
              {nextUpcoming.description}
            </p>
            <span className="text-xs text-rose-700 font-semibold mt-2 inline-block">
              Date: {nextUpcoming.date}
            </span>
          </div>

          {/* Countdown Clock Numbers */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-rose-200/90 text-center shadow-xs min-w-[70px]">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-rose-950 tabular-nums">
                {nextCountdown.days}
              </div>
              <div className="text-[10px] text-rose-700/80 uppercase font-semibold">Days</div>
            </div>
            <div className="font-serif text-2xl text-rose-400 font-bold">:</div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-rose-200/90 text-center shadow-xs min-w-[70px]">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-rose-950 tabular-nums">
                {nextCountdown.hours}
              </div>
              <div className="text-[10px] text-rose-700/80 uppercase font-semibold">Hours</div>
            </div>
            <div className="font-serif text-2xl text-rose-400 font-bold">:</div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-rose-200/90 text-center shadow-xs min-w-[70px]">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-rose-950 tabular-nums">
                {nextCountdown.minutes}
              </div>
              <div className="text-[10px] text-rose-700/80 uppercase font-semibold">Mins</div>
            </div>
          </div>
        </div>
      )}

      {/* Dates Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedDates.map((item) => {
          const cd = getCountdown(item.date);
          return (
            <div
              key={item.id}
              className="group relative p-5 rounded-3xl bg-white/90 backdrop-blur-md border border-rose-200/90 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-semibold text-rose-700 uppercase tracking-wider bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1 text-rose-500 hover:text-rose-800"
                      title="Edit date"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1 text-rose-500 hover:text-rose-800"
                      title="Delete date"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {item.photoUrl && (
                  <div className="mb-3 rounded-2xl overflow-hidden aspect-video border border-rose-100">
                    <img src={item.photoUrl} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <h4 className="font-serif text-lg font-bold text-rose-950 mb-1">
                  {item.title}
                </h4>

                <p className="text-xs text-rose-900/80 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-rose-100 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-rose-700 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-rose-500" />
                  {item.date}
                </span>

                <span className="font-semibold text-rose-900">
                  {cd.isPast ? (
                    <span className="text-stone-500">Celebrated ♡</span>
                  ) : (
                    <span>{cd.days} days left</span>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg p-6 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-rose-200">
            <h3 className="font-serif text-xl font-bold text-rose-950 mb-4">
              {editingDate ? 'Edit Special Date' : 'Add New Special Date'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  placeholder="e.g. Her Birthday, Our Next Anniversary"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-rose-900 block mb-1">
                    Event Date *
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
                    Category
                  </label>
                  <select
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  >
                    <option value="Anniversary">Anniversary</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Milestone">Milestone</option>
                    <option value="Celebration">Celebration</option>
                    <option value="Reminder">Reminder</option>
                    <option value="Future Plan">Future Plan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  placeholder="Notes about reservations, celebration ideas, or memories..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              {/* Photo */}
              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Event Photo (Optional)
                </label>
                <div className="flex items-center gap-3">
                  {formState.photoUrl && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-rose-200 shrink-0">
                      <img src={formState.photoUrl} alt="Date" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsImagePickerOpen(true)}
                    className="px-3.5 py-1.5 text-xs font-medium text-rose-800 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100"
                  >
                    Select Photo
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
                  Save Date
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
          title="Select Event Photo"
          currentImageUrl={formState.photoUrl}
        />
      )}
    </div>
  );
};
