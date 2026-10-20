import React, { useState, useMemo } from 'react';
import {
  FolderPlus,
  ImagePlus,
  Search,
  Filter,
  Calendar,
  MapPin,
  Trash2,
  Edit2,
  Folder,
  ArrowUpDown,
  Sparkles,
  Maximize2,
  ChevronRight,
} from 'lucide-react';
import { MemoryFolder, MemoryItem } from '../../types';
import { LightboxModal } from '../ui/LightboxModal';
import { ImageUploadModal } from '../ui/ImageUploadModal';
import { ASSET_PATHS } from '../../services/storage';

interface MemoriesSectionProps {
  folders: MemoryFolder[];
  memories: MemoryItem[];
  onSaveFolders: (folders: MemoryFolder[]) => void;
  onSaveMemories: (memories: MemoryItem[]) => void;
}

export const MemoriesSection: React.FC<MemoriesSectionProps> = ({
  folders,
  memories,
  onSaveFolders,
  onSaveMemories,
}) => {
  const [selectedFolderId, setSelectedFolderId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'alphabetical'>('newest');

  // Lightbox
  const [lightboxData, setLightboxData] = useState<MemoryItem | null>(null);

  // Modals for Adding/Editing Memory
  const [isAddMemoryOpen, setIsAddMemoryOpen] = useState(false);
  const [editingMemory, setEditingMemory] = useState<MemoryItem | null>(null);
  const [memoryForm, setMemoryForm] = useState({
    title: '',
    caption: '',
    imageUrl: ASSET_PATHS.COUPLE,
    date: new Date().toISOString().split('T')[0],
    location: '',
    folderId: folders[0]?.id || 'f1',
  });

  // Modal for Adding/Editing Folder
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [editingFolder, setEditingFolder] = useState<MemoryFolder | null>(null);
  const [folderForm, setFolderForm] = useState({
    name: '',
    description: '',
    coverUrl: ASSET_PATHS.COUPLE,
  });

  // Image Upload Picker
  const [imagePickerTarget, setImagePickerTarget] = useState<'memory' | 'folder' | null>(null);

  // Filtered & Sorted Memories
  const processedMemories = useMemo(() => {
    let result = [...memories];

    // Filter by Folder
    if (selectedFolderId !== 'all') {
      result = result.filter((m) => m.folderId === selectedFolderId);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.caption.toLowerCase().includes(q) ||
          m.location?.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
      return 0;
    });

    return result;
  }, [memories, selectedFolderId, searchQuery, sortBy]);

  // Folder Operations
  const handleOpenCreateFolder = () => {
    setEditingFolder(null);
    setFolderForm({
      name: '',
      description: '',
      coverUrl: ASSET_PATHS.COUPLE,
    });
    setIsFolderModalOpen(true);
  };

  const handleOpenEditFolder = (f: MemoryFolder, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingFolder(f);
    setFolderForm({
      name: f.name,
      description: f.description,
      coverUrl: f.coverUrl,
    });
    setIsFolderModalOpen(true);
  };

  const handleSaveFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderForm.name.trim()) return;

    if (editingFolder) {
      const updated = folders.map((f) =>
        f.id === editingFolder.id
          ? { ...f, name: folderForm.name, description: folderForm.description, coverUrl: folderForm.coverUrl }
          : f
      );
      onSaveFolders(updated);
    } else {
      const newFolder: MemoryFolder = {
        id: 'folder_' + Date.now(),
        name: folderForm.name,
        description: folderForm.description,
        coverUrl: folderForm.coverUrl,
        createdAt: new Date().toISOString(),
      };
      onSaveFolders([...folders, newFolder]);
    }
    setIsFolderModalOpen(false);
  };

  const handleDeleteFolder = (folderId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const count = memories.filter((m) => m.folderId === folderId).length;
    if (count > 0) {
      alert(`Cannot delete this folder because it contains ${count} memories. Please move or delete the memories first.`);
      return;
    }
    if (confirm('Are you sure you want to delete this empty folder?')) {
      onSaveFolders(folders.filter((f) => f.id !== folderId));
      if (selectedFolderId === folderId) setSelectedFolderId('all');
    }
  };

  // Memory Operations
  const handleOpenCreateMemory = () => {
    setEditingMemory(null);
    setMemoryForm({
      title: '',
      caption: '',
      imageUrl: ASSET_PATHS.COUPLE,
      date: new Date().toISOString().split('T')[0],
      location: '',
      folderId: selectedFolderId !== 'all' ? selectedFolderId : folders[0]?.id || 'f1',
    });
    setIsAddMemoryOpen(true);
  };

  const handleOpenEditMemory = (m: MemoryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingMemory(m);
    setMemoryForm({
      title: m.title,
      caption: m.caption,
      imageUrl: m.imageUrl,
      date: m.date,
      location: m.location || '',
      folderId: m.folderId,
    });
    setIsAddMemoryOpen(true);
  };

  const handleSaveMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memoryForm.title.trim()) return;

    if (editingMemory) {
      const updated = memories.map((m) =>
        m.id === editingMemory.id
          ? {
              ...m,
              title: memoryForm.title,
              caption: memoryForm.caption,
              imageUrl: memoryForm.imageUrl,
              date: memoryForm.date,
              location: memoryForm.location,
              folderId: memoryForm.folderId,
            }
          : m
      );
      onSaveMemories(updated);
    } else {
      const newMemory: MemoryItem = {
        id: 'mem_' + Date.now(),
        title: memoryForm.title,
        caption: memoryForm.caption,
        imageUrl: memoryForm.imageUrl,
        date: memoryForm.date,
        location: memoryForm.location,
        folderId: memoryForm.folderId,
        createdAt: new Date().toISOString(),
      };
      onSaveMemories([newMemory, ...memories]);
    }
    setIsAddMemoryOpen(false);
  };

  const handleDeleteMemory = (memId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this memory photograph?')) {
      onSaveMemories(memories.filter((m) => m.id !== memId));
    }
  };

  return (
    <div className="pt-4 sm:pt-8 pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="font-script text-2xl text-rose-600 block">Treasures of Our Love</span>
          <h2 className="font-serif text-3xl font-bold text-rose-950">
            Our Memories ♡
          </h2>
          <p className="text-xs sm:text-sm text-rose-900/75 mt-0.5">
            Every photograph is a doorway back to a moment we shared.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleOpenCreateFolder}
            className="px-4 py-2 rounded-full text-xs font-semibold text-rose-900 bg-white/80 border border-rose-200 hover:bg-rose-50 shadow-xs transition-colors flex items-center gap-1.5"
          >
            <FolderPlus className="w-4 h-4 text-rose-500" />
            <span>New Folder</span>
          </button>
          <button
            onClick={handleOpenCreateMemory}
            className="px-4 py-2 rounded-full text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 shadow-xs transition-colors flex items-center gap-1.5 active:scale-95"
          >
            <ImagePlus className="w-4 h-4" />
            <span>Add Memory</span>
          </button>
        </div>
      </div>

      {/* Folders Scrollable Ribbon */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-rose-900/80">
            Memory Albums ({folders.length})
          </h3>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto pb-3 custom-scrollbar">
          {/* All Memories Option */}
          <button
            onClick={() => setSelectedFolderId('all')}
            className={`p-3 rounded-2xl border text-left shrink-0 w-44 transition-all ${
              selectedFolderId === 'all'
                ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                : 'bg-white/80 border-rose-200/80 text-rose-950 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg">🌸</span>
              <span className={`text-[11px] font-semibold ${selectedFolderId === 'all' ? 'text-rose-100' : 'text-rose-600'}`}>
                {memories.length} Photos
              </span>
            </div>
            <div className="font-serif text-sm font-bold truncate">All Moments</div>
            <div className={`text-[11px] truncate mt-0.5 ${selectedFolderId === 'all' ? 'text-rose-100' : 'text-rose-800/70'}`}>
              Complete gallery
            </div>
          </button>

          {/* Individual Folders */}
          {folders.map((folder) => {
            const count = memories.filter((m) => m.folderId === folder.id).length;
            const isSelected = selectedFolderId === folder.id;
            return (
              <div
                key={folder.id}
                onClick={() => setSelectedFolderId(folder.id)}
                className={`group relative p-3 rounded-2xl border text-left shrink-0 w-48 cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                    : 'bg-white/80 border-rose-200/80 text-rose-950 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-6 h-6 rounded-md overflow-hidden bg-rose-100 border border-white/60 shrink-0">
                    <img src={folder.coverUrl} alt={folder.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`text-[11px] font-semibold ${isSelected ? 'text-rose-100' : 'text-rose-600'}`}>
                      {count}
                    </span>
                    <button
                      onClick={(e) => handleOpenEditFolder(folder, e)}
                      className={`p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${
                        isSelected ? 'hover:bg-rose-600 text-white' : 'hover:bg-rose-100 text-rose-700'
                      }`}
                      title="Edit folder"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    {count === 0 && (
                      <button
                        onClick={(e) => handleDeleteFolder(folder.id, e)}
                        className={`p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${
                          isSelected ? 'hover:bg-rose-600 text-white' : 'hover:bg-rose-100 text-rose-700'
                        }`}
                        title="Delete empty folder"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="font-serif text-sm font-bold truncate">{folder.name}</div>
                <div className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-rose-100' : 'text-rose-800/70'}`}>
                  {folder.description || 'Our memories'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search, Filter & Sort Bar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-rose-200/80 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-rose-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search memories, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-rose-200 bg-white/90 text-rose-950 focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        </div>

        {/* Sort Controls */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-rose-900/80 font-medium">
            <ArrowUpDown className="w-3.5 h-3.5 text-rose-500" />
            <span>Sort:</span>
          </div>
          <div className="flex items-center gap-1 p-1 bg-rose-50/80 rounded-xl border border-rose-100">
            <button
              onClick={() => setSortBy('newest')}
              className={`px-3 py-1 rounded-lg transition-colors font-medium ${
                sortBy === 'newest' ? 'bg-white text-rose-950 shadow-xs' : 'text-rose-800 hover:text-rose-950'
              }`}
            >
              Newest
            </button>
            <button
              onClick={() => setSortBy('oldest')}
              className={`px-3 py-1 rounded-lg transition-colors font-medium ${
                sortBy === 'oldest' ? 'bg-white text-rose-950 shadow-xs' : 'text-rose-800 hover:text-rose-950'
              }`}
            >
              Oldest
            </button>
            <button
              onClick={() => setSortBy('alphabetical')}
              className={`px-3 py-1 rounded-lg transition-colors font-medium ${
                sortBy === 'alphabetical' ? 'bg-white text-rose-950 shadow-xs' : 'text-rose-800 hover:text-rose-950'
              }`}
            >
              A - Z
            </button>
          </div>
        </div>
      </div>

      {/* Memories Photo Gallery */}
      {processedMemories.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white/60 border border-rose-200/80 text-center">
          <div className="text-4xl mb-3">🌸</div>
          <h4 className="font-serif text-lg font-bold text-rose-950 mb-1">
            No memories found
          </h4>
          <p className="text-xs text-rose-900/70 max-w-sm mx-auto mb-4">
            {searchQuery
              ? 'Try adjusting your search query to find your cherished moments.'
              : 'Add your first beautiful memory photograph to this album.'}
          </p>
          <button
            onClick={handleOpenCreateMemory}
            className="px-5 py-2 text-xs font-semibold text-white bg-rose-500 rounded-full shadow-xs hover:bg-rose-600 transition-colors"
          >
            Add A Memory Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {processedMemories.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxData(item)}
              className="group relative rounded-2xl overflow-hidden bg-white/90 border border-rose-200/80 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col"
            >
              {/* Photo Area with Aspect Ratio */}
              <div className="relative aspect-[4/3] bg-rose-50 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Subtle Hover Action Bar */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3 text-white">
                  <span className="text-xs font-medium flex items-center gap-1 drop-shadow-xs">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View photo</span>
                  </span>
                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => handleOpenEditMemory(item, e)}
                      className="p-1.5 rounded-full bg-white/30 hover:bg-white/50 text-white backdrop-blur-xs transition-colors"
                      title="Edit memory"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteMemory(item.id, e)}
                      className="p-1.5 rounded-full bg-rose-500/80 hover:bg-rose-600 text-white backdrop-blur-xs transition-colors"
                      title="Delete memory"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Memory Details */}
              <div className="p-4 flex-1 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-rose-700/80 mb-1">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="w-3 h-3 text-rose-500" />
                      {item.date}
                    </span>
                    {item.location && (
                      <span className="flex items-center gap-1 truncate max-w-[120px] font-medium">
                        <MapPin className="w-3 h-3 text-rose-500" />
                        {item.location}
                      </span>
                    )}
                  </div>
                  <h4 className="font-serif text-base font-bold text-rose-950 mb-1 line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-rose-900/75 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxData && (
        <LightboxModal
          isOpen={!!lightboxData}
          onClose={() => setLightboxData(null)}
          imageUrl={lightboxData.imageUrl}
          title={lightboxData.title}
          caption={lightboxData.caption}
          date={lightboxData.date}
          location={lightboxData.location}
        />
      )}

      {/* Add / Edit Memory Modal */}
      {isAddMemoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg p-6 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-rose-200">
            <h3 className="font-serif text-xl font-bold text-rose-950 mb-4">
              {editingMemory ? 'Edit Memory Details' : 'Add New Romantic Memory'}
            </h3>

            <form onSubmit={handleSaveMemory} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Title of this Moment *
                </label>
                <input
                  type="text"
                  required
                  value={memoryForm.title}
                  onChange={(e) => setMemoryForm({ ...memoryForm, title: e.target.value })}
                  placeholder="e.g. Our Cozy Rainy Afternoon"
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
                    value={memoryForm.date}
                    onChange={(e) => setMemoryForm({ ...memoryForm, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-rose-900 block mb-1">
                    Memory Folder
                  </label>
                  <select
                    value={memoryForm.folderId}
                    onChange={(e) => setMemoryForm({ ...memoryForm, folderId: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  >
                    {folders.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Location (optional)
                </label>
                <input
                  type="text"
                  value={memoryForm.location}
                  onChange={(e) => setMemoryForm({ ...memoryForm, location: e.target.value })}
                  placeholder="e.g. Rose Garden Terrace"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              {/* Photograph Selection & Preview */}
              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Memory Photograph *
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-rose-200 bg-rose-50 shrink-0">
                    <img src={memoryForm.imageUrl} alt="Memory" className="w-full h-full object-cover" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setImagePickerTarget('memory')}
                    className="px-4 py-2 text-xs font-medium text-rose-800 bg-rose-50 border border-rose-200 hover:bg-rose-100 rounded-xl transition-colors"
                  >
                    Upload or Change Photo
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Memory Caption / Story
                </label>
                <textarea
                  rows={3}
                  value={memoryForm.caption}
                  onChange={(e) => setMemoryForm({ ...memoryForm, caption: e.target.value })}
                  placeholder="Write a sweet romantic caption or memory note..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-rose-100">
                <button
                  type="button"
                  onClick={() => setIsAddMemoryOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-rose-800 hover:bg-rose-50 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-xs transition-colors"
                >
                  Save Memory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Folder Modal */}
      {isFolderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md p-6 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-rose-200">
            <h3 className="font-serif text-xl font-bold text-rose-950 mb-4">
              {editingFolder ? 'Edit Memory Album' : 'Create New Memory Album'}
            </h3>

            <form onSubmit={handleSaveFolder} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Folder Name *
                </label>
                <input
                  type="text"
                  required
                  value={folderForm.name}
                  onChange={(e) => setFolderForm({ ...folderForm, name: e.target.value })}
                  placeholder="e.g. Moments I Never Want to Forget"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={folderForm.description}
                  onChange={(e) => setFolderForm({ ...folderForm, description: e.target.value })}
                  placeholder="Short note about what this album holds..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Folder Cover Photograph
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-rose-200 bg-rose-50 shrink-0">
                    <img src={folderForm.coverUrl} alt="Cover" className="w-full h-full object-cover" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setImagePickerTarget('folder')}
                    className="px-3.5 py-2 text-xs font-medium text-rose-800 bg-rose-50 border border-rose-200 hover:bg-rose-100 rounded-xl transition-colors"
                  >
                    Select Cover Photo
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-rose-100">
                <button
                  type="button"
                  onClick={() => setIsFolderModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-rose-800 hover:bg-rose-50 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-xs transition-colors"
                >
                  Save Folder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Upload Modal Bridge */}
      {imagePickerTarget && (
        <ImageUploadModal
          isOpen={!!imagePickerTarget}
          onClose={() => setImagePickerTarget(null)}
          onSelectImage={(url) => {
            if (imagePickerTarget === 'memory') {
              setMemoryForm((prev) => ({ ...prev, imageUrl: url }));
            } else if (imagePickerTarget === 'folder') {
              setFolderForm((prev) => ({ ...prev, coverUrl: url }));
            }
          }}
          title={imagePickerTarget === 'memory' ? 'Choose Memory Photograph' : 'Choose Album Cover'}
          currentImageUrl={
            imagePickerTarget === 'memory' ? memoryForm.imageUrl : folderForm.coverUrl
          }
        />
      )}
    </div>
  );
};
