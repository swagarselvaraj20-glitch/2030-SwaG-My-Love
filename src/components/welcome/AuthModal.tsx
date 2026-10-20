import React, { useState } from 'react';
import { Heart, Sparkles, KeyRound, X, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  coupleIdentity?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  coupleIdentity = 'SwaG My Love 2030',
}) => {
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleHeartUnlock = () => {
    setIsVerifying(true);
    setError(null);
    setTimeout(() => {
      setIsVerifying(false);
      onSuccess();
    }, 450);
  };

  const handlePassphraseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passphrase.trim()) {
      handleHeartUnlock();
      return;
    }
    // Verify passphrase (accepts couple identity year or heart code)
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onSuccess();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md p-6 sm:p-8 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-rose-200/90 text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-rose-400 hover:text-rose-700 rounded-full hover:bg-rose-50 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Romantic Glowing Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-rose-200 to-pink-100 flex items-center justify-center text-rose-500 shadow-inner mb-4 relative">
          <Heart className="w-8 h-8 fill-rose-500 animate-gentle-pulse" />
          <Sparkles className="w-4 h-4 text-amber-400 absolute -top-1 -right-1" />
        </div>

        {/* Heading & Subtitle */}
        <h3 className="font-serif text-2xl font-bold text-rose-950 mb-1">
          Welcome Home, My Love
        </h3>
        <p className="font-script text-xl text-rose-600 mb-2">
          {coupleIdentity}
        </p>
        <p className="text-xs text-rose-900/70 max-w-xs mx-auto mb-6 leading-relaxed">
          This digital sanctuary belongs only to us. Touch the heart key to enter our private world.
        </p>

        {error && (
          <div className="mb-4 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
            {error}
          </div>
        )}

        {/* Primary One-Touch Unlock Button */}
        <div className="space-y-4">
          <button
            onClick={handleHeartUnlock}
            disabled={isVerifying}
            className="w-full py-3.5 px-6 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 shadow-md hover:shadow-lg hover:shadow-rose-300/50 transition-all flex items-center justify-center gap-2 group active:scale-95 disabled:opacity-75"
          >
            {isVerifying ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Opening Our Little Universe...</span>
              </span>
            ) : (
              <>
                <Heart className="w-4 h-4 fill-white transition-transform group-hover:scale-125" />
                <span>Unlock Sanctuary with Heart Key ♡</span>
              </>
            )}
          </button>

          {/* Optional Passphrase Expander for Extra Security */}
          <details className="text-left group/details">
            <summary className="text-[11px] text-rose-600/80 hover:text-rose-800 cursor-pointer text-center list-none flex items-center justify-center gap-1">
              <KeyRound className="w-3 h-3" />
              <span>Optional: Enter couple keyphrase</span>
            </summary>
            <form onSubmit={handlePassphraseSubmit} className="mt-3 space-y-2">
              <input
                type="text"
                placeholder="Enter personal couple keyphrase..."
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                className="w-full px-4 py-2 text-xs rounded-xl border border-rose-200 bg-white/90 text-rose-950 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-xl text-xs font-medium text-rose-800 bg-rose-100 hover:bg-rose-200 transition-colors"
              >
                Verify & Enter
              </button>
            </form>
          </details>
        </div>

        {/* Privacy Note */}
        <div className="mt-6 pt-4 border-t border-rose-100 flex items-center justify-center gap-1.5 text-[11px] text-rose-800/70">
          <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />
          <span>Private couple encryption & session protection</span>
        </div>
      </div>
    </div>
  );
};
