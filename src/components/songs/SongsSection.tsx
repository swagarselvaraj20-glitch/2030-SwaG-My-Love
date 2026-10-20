import React, { useState } from 'react';
import {
  Music,
  Plus,
  ExternalLink,
  Play,
  Heart,
  Disc3,
  Calendar,
  Trash2,
  Edit2,
  Headphones,
} from 'lucide-react';
import { SongItem } from '../../types';
import { ImageUploadModal } from '../ui/ImageUploadModal';
import { ASSET_PATHS } from '../../services/storage';

interface SongsSectionProps {
  songs: SongItem[];
  onSaveSongs: (songs: SongItem[]) => void;
}

export const SongsSection: React.FC<SongsSectionProps> = ({ songs, onSaveSongs }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSong, setEditingSong] = useState<SongItem | null>(null);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

  const [formState, setFormState] = useState({
    title: '',
    artist: '',
    platform: 'Spotify' as SongItem['platform'],
    url: '',
    meaning: '',
    coverUrl: ASSET_PATHS.COUPLE,
  });

  const handleOpenAdd = () => {
    setEditingSong(null);
    setFormState({
      title: '',
      artist: '',
      platform: 'Spotify',
      url: '',
      meaning: '',
      coverUrl: ASSET_PATHS.COUPLE,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (song: SongItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSong(song);
    setFormState({
      title: song.title,
      artist: song.artist,
      platform: song.platform,
      url: song.url,
      meaning: song.meaning,
      coverUrl: song.coverUrl || ASSET_PATHS.COUPLE,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this song from our playlist?')) {
      onSaveSongs(songs.filter((s) => s.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim() || !formState.artist.trim()) return;

    if (editingSong) {
      const updated = songs.map((s) =>
        s.id === editingSong.id
          ? {
              ...s,
              title: formState.title,
              artist: formState.artist,
              platform: formState.platform,
              url: formState.url,
              meaning: formState.meaning,
              coverUrl: formState.coverUrl || undefined,
            }
          : s
      );
      onSaveSongs(updated);
    } else {
      const newSong: SongItem = {
        id: 'song_' + Date.now(),
        title: formState.title,
        artist: formState.artist,
        platform: formState.platform,
        url: formState.url || `https://open.spotify.com/search/${encodeURIComponent(formState.title + ' ' + formState.artist)}`,
        meaning: formState.meaning,
        coverUrl: formState.coverUrl || undefined,
        addedDate: new Date().toISOString().split('T')[0],
      };
      onSaveSongs([newSong, ...songs]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="pt-4 sm:pt-8 pb-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="font-script text-2xl text-rose-600 block">Soundtrack of Our Hearts</span>
          <h2 className="font-serif text-3xl font-bold text-rose-950">
            Our Songs 🎵
          </h2>
          <p className="text-xs sm:text-sm text-rose-900/75 mt-0.5">
            Melodies that carry the memory of our dances, drives, and quiet whispers.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 shadow-xs transition-colors flex items-center gap-2 self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Love Song</span>
        </button>
      </div>

      {/* Featured Vinyl Player Ribbon */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-100/90 via-pink-100/60 to-purple-100/80 border border-rose-200/90 shadow-xs mb-8 flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-stone-900 border-4 border-stone-800 shadow-xl flex items-center justify-center shrink-0 animate-spin" style={{ animationDuration: '24s' }}>
          <div className="w-10 h-10 rounded-full bg-rose-200 border-2 border-stone-800 flex items-center justify-center">
            <Heart className="w-4 h-4 text-rose-600 fill-rose-500" />
          </div>
        </div>

        <div className="text-center md:text-left flex-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-700 bg-white/70 px-3 py-1 rounded-full inline-block mb-1.5">
            Our Melody Sanctuary
          </span>
          <h3 className="font-serif text-2xl font-bold text-rose-950">
            {songs.length} Songs in Our Eternal Playlist
          </h3>
          <p className="text-xs sm:text-sm text-rose-900/80 mt-1 max-w-lg">
            Every song tells a chapter of SwaG and His Love. Click any track below to listen together on your favorite music platform.
          </p>
        </div>
      </div>

      {/* Songs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {songs.map((song) => (
          <div
            key={song.id}
            className="group relative p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-rose-200/90 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start gap-4 mb-3">
                {/* Album Cover Art */}
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-rose-200 bg-rose-50 shrink-0 shadow-xs relative group-hover:scale-105 transition-transform">
                  <img
                    src={song.coverUrl || ASSET_PATHS.COUPLE}
                    alt={song.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Music className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold text-rose-700 uppercase tracking-wider bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                      {song.platform}
                    </span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => handleOpenEdit(song, e)}
                        className="p-1 text-rose-500 hover:text-rose-800"
                        title="Edit song"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(song.id, e)}
                        className="p-1 text-rose-500 hover:text-rose-800"
                        title="Remove song"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h4 className="font-serif text-base font-bold text-rose-950 truncate mt-1">
                    {song.title}
                  </h4>
                  <p className="text-xs text-rose-900/80 font-medium truncate">
                    {song.artist}
                  </p>
                </div>
              </div>

              {/* Why the song matters */}
              <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-100 text-xs text-rose-900/85 mb-4 leading-relaxed italic">
                “{song.meaning}”
              </div>
            </div>

            {/* Bottom: Date & Open Button */}
            <div className="pt-2 border-t border-rose-100 flex items-center justify-between text-xs text-rose-700/80">
              <span className="flex items-center gap-1 text-[11px]">
                <Calendar className="w-3 h-3 text-rose-400" />
                Added {song.addedDate}
              </span>

              <a
                href={song.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs shadow-xs transition-colors"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>Play on {song.platform}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Song Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg p-6 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-rose-200">
            <h3 className="font-serif text-xl font-bold text-rose-950 mb-4">
              {editingSong ? 'Edit Love Song' : 'Add New Song to Our Playlist'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-left">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-rose-900 block mb-1">
                    Song Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.title}
                    onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                    placeholder="e.g. Until I Found You"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-rose-900 block mb-1">
                    Artist *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.artist}
                    onChange={(e) => setFormState({ ...formState, artist: e.target.value })}
                    placeholder="e.g. Stephen Sanchez"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-rose-900 block mb-1">
                    Platform
                  </label>
                  <select
                    value={formState.platform}
                    onChange={(e) => setFormState({ ...formState, platform: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  >
                    <option value="Spotify">Spotify</option>
                    <option value="Apple Music">Apple Music</option>
                    <option value="YouTube">YouTube</option>
                    <option value="SoundCloud">SoundCloud</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-rose-900 block mb-1">
                    Song URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formState.url}
                    onChange={(e) => setFormState({ ...formState, url: e.target.value })}
                    placeholder="https://open.spotify.com/track/..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
              </div>

              {/* Cover Photo */}
              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Album Cover Art / Photo
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-rose-200 shrink-0">
                    <img src={formState.coverUrl} alt="Cover" className="w-full h-full object-cover" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsImagePickerOpen(true)}
                    className="px-3.5 py-1.5 text-xs font-medium text-rose-800 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100"
                  >
                    Choose Photo
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Why this song matters to us *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formState.meaning}
                  onChange={(e) => setFormState({ ...formState, meaning: e.target.value })}
                  placeholder="e.g. This song was playing when we had our first slow dance..."
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
                  Save Song
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
          onSelectImage={(url) => setFormState((prev) => ({ ...prev, coverUrl: url }))}
          title="Select Song Cover Photo"
          currentImageUrl={formState.coverUrl}
        />
      )}
    </div>
  );
};
