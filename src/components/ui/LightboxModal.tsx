import React, { useEffect } from 'react';
import { X, Download, Calendar, MapPin, Heart } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  caption?: string;
  date?: string;
  location?: string;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  caption,
  date,
  location,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${title.toLowerCase().replace(/\s+/g, '_')}_memory.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-rose-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-rose-200/90 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar controls */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-rose-100 bg-white/60">
          <span className="font-serif text-sm font-semibold text-rose-950 truncate max-w-md">
            {title}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="p-1.5 rounded-full text-rose-700 hover:text-rose-950 hover:bg-rose-100/70 transition-colors"
              title="Download photograph"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-rose-700 hover:text-rose-950 hover:bg-rose-100/70 transition-colors"
              title="Close viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image viewport */}
        <div className="relative flex-1 min-h-[300px] max-h-[65vh] bg-rose-950/10 flex items-center justify-center overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain select-none"
          />
        </div>

        {/* Caption & details footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-rose-100 text-left">
          <div className="flex flex-wrap items-center gap-4 text-xs text-rose-800/80 mb-2">
            {date && (
              <span className="flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-rose-500" />
                {date}
              </span>
            )}
            {location && (
              <span className="flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                {location}
              </span>
            )}
          </div>
          {caption && (
            <p className="text-xs sm:text-sm text-rose-950 leading-relaxed font-normal">
              {caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
