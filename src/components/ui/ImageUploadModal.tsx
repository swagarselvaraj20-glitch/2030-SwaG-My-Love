import React, { useState, useRef } from 'react';
import { Upload, X, Check, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { ASSET_PATHS } from '../../services/storage';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
  title?: string;
  currentImageUrl?: string;
}

export const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
  title = 'Upload or Choose Photograph',
  currentImageUrl,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPG, PNG, WebP, GIF).');
      return;
    }

    // Validate size (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      setError('Image file is too large. Please choose an image under 8MB.');
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
      setIsProcessing(false);
    };
    reader.onerror = () => {
      setError('Failed to read image file. Please try another one.');
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  const handlePresetSelect = (url: string) => {
    setPreviewUrl(url);
    setError(null);
  };

  const handleConfirm = () => {
    if (!previewUrl) {
      setError('Please select or upload an image first.');
      return;
    }
    onSelectImage(previewUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg p-6 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-rose-200 text-left">
        <div className="flex items-center justify-between pb-3 border-b border-rose-100 mb-4">
          <h3 className="font-serif text-lg font-bold text-rose-950 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-rose-500" />
            <span>{title}</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-rose-400 hover:text-rose-700 rounded-full hover:bg-rose-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Upload Drop Area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-rose-300 hover:border-rose-400 rounded-2xl p-6 text-center cursor-pointer bg-rose-50/50 hover:bg-rose-50 transition-colors mb-4"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="mx-auto w-12 h-12 rounded-full bg-white shadow-xs border border-rose-200 flex items-center justify-center text-rose-500 mb-2">
            <Upload className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold text-rose-950">
            Click to upload a photograph from your device
          </p>
          <p className="text-[11px] text-rose-700/70 mt-0.5">
            Supports JPG, PNG, WebP up to 8MB
          </p>
        </div>

        {/* Presets from Our Couple Vault */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-rose-900 block mb-2">
            Or choose from our couple vault photographs:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Couple Photo', url: ASSET_PATHS.COUPLE },
              { label: 'Her Photo', url: ASSET_PATHS.LOVE },
              { label: 'SwaG Photo', url: ASSET_PATHS.SWAG },
            ].map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePresetSelect(preset.url)}
                className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                  previewUrl === preset.url
                    ? 'border-rose-500 ring-2 ring-rose-300'
                    : 'border-rose-100 hover:border-rose-300 opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={preset.url}
                  alt={preset.label}
                  className="w-full h-full object-cover"
                />
                <span className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[10px] text-center py-0.5 font-medium truncate px-1">
                  {preset.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Preview If Any */}
        {previewUrl && (
          <div className="mb-4 p-2 rounded-xl bg-rose-50/70 border border-rose-200 flex items-center gap-3">
            <div className="w-14 h-14 rounded-lg overflow-hidden border border-rose-200 shrink-0">
              <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
            <div className="text-xs">
              <span className="font-semibold text-rose-950 block">Selected Photograph</span>
              <span className="text-rose-700/80">Ready to save to your album</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-rose-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-rose-800 hover:bg-rose-50 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!previewUrl || isProcessing}
            className="px-5 py-2 text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-xs disabled:opacity-50 transition-colors flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Use This Photograph</span>
          </button>
        </div>
      </div>
    </div>
  );
};
