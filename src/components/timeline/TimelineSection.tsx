import React, { useState } from 'react';
import {
  Calendar,
  Heart,
  Plus,
  MapPin,
  Sparkles,
  Edit2,
  Trash2,
  Image as ImageIcon,
} from 'lucide-react';
import { TimelineEntry } from '../../types';
import { ImageUploadModal } from '../ui/ImageUploadModal';
import { LightboxModal } from '../ui/LightboxModal';
import { ASSET_PATHS } from '../../services/storage';

interface TimelineSectionProps {
  timeline: TimelineEntry[];
  onSaveTimeline: (timeline: TimelineEntry[]) => void;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  timeline,
  onSaveTimeline,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimelineEntry | null>(null);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [lightboxData, setLightboxData] = useState<TimelineEntry | null>(null);

  const [formState, setFormState] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    photoUrl: '',
    location: '',
    category: '',
  });

  // Sort chronological
  const sortedTimeline = [...timeline].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const handleOpenAdd = () => {
    setEditingEntry(null);
    setFormState({
      title: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      photoUrl: '',
      location: '',
      category: 'Milestone',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: TimelineEntry) => {
    setEditingEntry(item);
    setFormState({
      title: item.title,
      date: item.date,
      description: item.description,
      photoUrl: item.photoUrl || '',
      location: item.location || '',
      category: item.category || 'Milestone',
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this milestone entry?')) {
      onSaveTimeline(timeline.filter((item) => item.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim()) return;

    if (editingEntry) {
      const updated = timeline.map((item) =>
        item.id === editingEntry.id
          ? {
              ...item,
              title: formState.title,
              date: formState.date,
              description: formState.description,
              photoUrl: formState.photoUrl || undefined,
              location: formState.location || undefined,
              category: formState.category || undefined,
            }
          : item
      );
      onSaveTimeline(updated);
    } else {
      const newEntry: TimelineEntry = {
        id: 'timeline_' + Date.now(),
        title: formState.title,
        date: formState.date,
        description: formState.description,
        photoUrl: formState.photoUrl || undefined,
        location: formState.location || undefined,
        category: formState.category || 'Milestone',
      };
      onSaveTimeline([...timeline, newEntry]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="pt-4 sm:pt-8 pb-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <span className="font-script text-2xl text-rose-600 block">Milestones of Forever</span>
          <h2 className="font-serif text-3xl font-bold text-rose-950">
            Our Relationship Timeline 🌹
          </h2>
          <p className="text-xs sm:text-sm text-rose-900/75 mt-0.5">
            Every step that brought our hearts closer, woven into our eternal story.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 shadow-xs transition-colors flex items-center gap-2 self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Milestone</span>
        </button>
      </div>

      {/* Chronological Timeline with Delicate Floral Connecting Line */}
      <div className="relative border-l-2 border-rose-300/80 ml-4 sm:ml-10 pl-6 sm:pl-10 space-y-12">
        {sortedTimeline.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={item.id} className="relative group">
              {/* Floral Heart Node */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-rose-400 flex items-center justify-center text-xs text-rose-500 shadow-xs group-hover:scale-110 group-hover:bg-rose-50 transition-transform">
                <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-500" />
              </div>

              {/* Card Container */}
              <div className="p-5 sm:p-7 rounded-3xl bg-white/90 backdrop-blur-md border border-rose-200/90 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold">
                      {item.date}
                    </span>
                    {item.category && (
                      <span className="text-xs font-medium text-rose-600/90 tracking-wide uppercase">
                        {item.category}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 text-rose-600 hover:text-rose-950 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Edit milestone"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-rose-500 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete milestone"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-rose-950 mb-2">
                  {item.title}
                </h3>

                {item.location && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-700/80 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>{item.location}</span>
                  </div>
                )}

                <p className="text-xs sm:text-sm text-rose-900/80 leading-relaxed font-normal mb-4">
                  {item.description}
                </p>

                {/* Milestone Photograph if provided */}
                {item.photoUrl && (
                  <div
                    onClick={() => setLightboxData(item)}
                    className="relative rounded-2xl overflow-hidden border border-rose-200/80 max-h-72 cursor-pointer group/img shadow-xs"
                  >
                    <img
                      src={item.photoUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5">
                      <ImageIcon className="w-4 h-4" />
                      <span>Click to view photograph</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox for timeline photos */}
      {lightboxData && (
        <LightboxModal
          isOpen={!!lightboxData}
          onClose={() => setLightboxData(null)}
          imageUrl={lightboxData.photoUrl || ''}
          title={lightboxData.title}
          caption={lightboxData.description}
          date={lightboxData.date}
          location={lightboxData.location}
        />
      )}

      {/* Add / Edit Milestone Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg p-6 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-rose-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <h3 className="font-serif text-xl font-bold text-rose-950 mb-4">
              {editingEntry ? 'Edit Milestone Entry' : 'Add New Relationship Milestone'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Milestone Title *
                </label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  placeholder="e.g. The Day We Chose Forever"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

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
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                    placeholder="e.g. First Began, Sacred Promise"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Location (optional)
                </label>
                <input
                  type="text"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  placeholder="e.g. Quiet Bistro Terrace"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              {/* Photo Attachment */}
              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Milestone Photograph (Optional)
                </label>
                <div className="flex items-center gap-3">
                  {formState.photoUrl && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-rose-200 shrink-0">
                      <img src={formState.photoUrl} alt="Milestone" className="w-full h-full object-cover" />
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
                  Story & Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  placeholder="Write the memory and why this day is carved into your heart..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 leading-relaxed"
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
                  Save Milestone
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
          title="Select Milestone Photograph"
          currentImageUrl={formState.photoUrl}
        />
      )}
    </div>
  );
};
