import React, { useState } from 'react';
import {
  Flower2,
  Sparkles,
  Plus,
  Heart,
  Calendar,
  Trash2,
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GardenFlower } from '../../types';

interface InteractiveGardenProps {
  garden: GardenFlower[];
  onSaveGarden: (garden: GardenFlower[]) => void;
}

const FLOWER_TYPES = [
  { type: 'pink-rose', name: 'Pink Rose', emoji: '🌹', desc: 'Symbol of passionate eternal love' },
  { type: 'cherry-blossom', name: 'Cherry Blossom', emoji: '🌸', desc: 'Symbol of sweet beginnings & renewal' },
  { type: 'lavender', name: 'Lavender', emoji: '🪻', desc: 'Symbol of peace, warmth, and grace' },
  { type: 'white-flower', name: 'White Rose', emoji: '🤍', desc: 'Symbol of pure intentions & sincerity' },
  { type: 'butterfly', name: 'Golden Butterfly', emoji: '🦋', desc: 'Symbol of joy and fluttering hearts' },
  { type: 'glowing-star', name: 'Glowing Star', emoji: '✨', desc: 'Symbol of our 2030 future dreams' },
];

export const InteractiveGarden: React.FC<InteractiveGardenProps> = ({
  garden,
  onSaveGarden,
}) => {
  const [selectedFlower, setSelectedFlower] = useState<GardenFlower | null>(null);
  const [isPlantModalOpen, setIsPlantModalOpen] = useState(false);
  const [plantType, setPlantType] = useState<GardenFlower['type']>('pink-rose');
  const [flowerName, setFlowerName] = useState('');
  const [unlockedReason, setUnlockedReason] = useState('Our Little Universe Milestone');

  const handlePlantFlower = (e: React.FormEvent) => {
    e.preventDefault();
    const typeObj = FLOWER_TYPES.find((f) => f.type === plantType) || FLOWER_TYPES[0];

    const newFlower: GardenFlower = {
      id: 'garden_' + Date.now(),
      type: plantType,
      name: flowerName.trim() || typeObj.name,
      unlockedBy: unlockedReason.trim() || 'A cherished love milestone',
      plantedAt: new Date().toISOString().split('T')[0],
      // Random coordinates nicely placed in the garden meadow
      x: Math.floor(Math.random() * 70) + 15,
      y: Math.floor(Math.random() * 60) + 20,
    };

    onSaveGarden([...garden, newFlower]);
    setIsPlantModalOpen(false);
    setFlowerName('');

    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#F4BFD0', '#DCEBD8', '#FDE047'],
    });
  };

  const handleRemoveFlower = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Do you want to gently return this blossom to the earth?')) {
      onSaveGarden(garden.filter((f) => f.id !== id));
      if (selectedFlower?.id === id) setSelectedFlower(null);
    }
  };

  return (
    <div className="pt-4 sm:pt-8 pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="font-script text-2xl text-rose-600 block">Where Love Takes Root</span>
          <h2 className="font-serif text-3xl font-bold text-rose-950">
            Our Garden 🌸
          </h2>
          <p className="text-xs sm:text-sm text-rose-900/75 mt-0.5">
            A symbolic digital sanctuary where every cherished memory and milestone blooms into a flower.
          </p>
        </div>

        <button
          onClick={() => setIsPlantModalOpen(true)}
          className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 shadow-xs transition-colors flex items-center gap-2 self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Plant a Blossom</span>
        </button>
      </div>

      {/* Interactive Meadow Canvas */}
      <div className="relative w-full h-[460px] sm:h-[520px] rounded-3xl overflow-hidden border-2 border-emerald-200/80 shadow-inner mb-8 bg-gradient-to-b from-[#FFF0F5] via-[#E8F5E9]/60 to-[#DCEBD8]">
        {/* Decorative Meadow Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-6 left-10 text-2xl animate-fairy-glow">✨</div>
          <div className="absolute top-12 right-20 text-3xl animate-fairy-glow" style={{ animationDelay: '1.5s' }}>✨</div>
          <div className="absolute bottom-10 left-1/4 text-xs font-serif text-emerald-800/40 select-none">
            ✿ ❀ ✿ ❀
          </div>
        </div>

        {/* Center Garden Message */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-xs border border-emerald-200 text-emerald-950 text-xs font-medium shadow-xs">
          🌱 {garden.length} Flowers Blooming in SwaG & His Love’s Garden
        </div>

        {/* Placed Flowers */}
        {garden.map((item) => {
          const typeObj = FLOWER_TYPES.find((f) => f.type === item.type) || FLOWER_TYPES[0];
          const isSelected = selectedFlower?.id === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedFlower(item)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl transition-all duration-300 group focus:outline-none ${
                isSelected
                  ? 'scale-125 bg-white/90 shadow-md ring-2 ring-rose-400 z-30'
                  : 'hover:scale-115 hover:bg-white/60 z-10'
              }`}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
              title={`${item.name} — Click to inspect`}
            >
              <div className="text-3xl sm:text-4xl filter drop-shadow-sm select-none animate-gentle-pulse">
                {typeObj.emoji}
              </div>
              <span className="text-[10px] font-semibold text-rose-950 bg-white/90 px-2 py-0.5 rounded-full border border-rose-200 shadow-2xs whitespace-nowrap hidden group-hover:block absolute -bottom-5 left-1/2 -translate-x-1/2">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Blossom Inspection Card */}
      {selectedFlower && (
        <div className="p-6 rounded-3xl bg-white/95 border-2 border-rose-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6 mb-8 text-left animate-in fade-in duration-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-4xl shadow-inner shrink-0">
              {FLOWER_TYPES.find((f) => f.type === selectedFlower.type)?.emoji}
            </div>
            <div>
              <span className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider">
                Bloomed in Our Garden
              </span>
              <h4 className="font-serif text-xl font-bold text-rose-950">
                {selectedFlower.name}
              </h4>
              <p className="text-xs text-rose-900/80 mt-1">
                Unlocked by: <span className="font-medium">{selectedFlower.unlockedBy}</span>
              </p>
              <span className="text-[11px] text-rose-700/70 block mt-0.5">
                Planted on: {selectedFlower.plantedAt}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedFlower(null)}
              className="px-4 py-2 text-xs font-medium text-rose-800 hover:bg-rose-50 rounded-xl"
            >
              Close
            </button>
            <button
              onClick={(e) => handleRemoveFlower(selectedFlower.id, e)}
              className="px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Gently Remove</span>
            </button>
          </div>
        </div>
      )}

      {/* Legend & Symbolic Types */}
      <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-rose-200/90 text-left">
        <h4 className="font-serif text-base font-bold text-rose-950 mb-3 flex items-center gap-2">
          <Info className="w-4 h-4 text-rose-500" />
          <span>Garden Floral Meanings</span>
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {FLOWER_TYPES.map((f) => (
            <div key={f.type} className="p-3 rounded-2xl bg-rose-50/60 border border-rose-100 text-center">
              <div className="text-2xl mb-1">{f.emoji}</div>
              <div className="font-serif text-xs font-bold text-rose-950">{f.name}</div>
              <div className="text-[10px] text-rose-800/80 mt-0.5">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Plant Flower Modal */}
      {isPlantModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md p-6 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-rose-200">
            <h3 className="font-serif text-xl font-bold text-rose-950 mb-4">
              Plant a New Flower in Our Garden
            </h3>

            <form onSubmit={handlePlantFlower} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-2">
                  Select Blossom Type *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {FLOWER_TYPES.map((f) => (
                    <button
                      key={f.type}
                      type="button"
                      onClick={() => setPlantType(f.type as any)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        plantType === f.type
                          ? 'border-rose-500 bg-rose-50 shadow-xs'
                          : 'border-rose-100 hover:border-rose-300'
                      }`}
                    >
                      <div className="text-2xl mb-0.5">{f.emoji}</div>
                      <div className="text-[11px] font-semibold text-rose-950 truncate">{f.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Name for this Blossom
                </label>
                <input
                  type="text"
                  value={flowerName}
                  onChange={(e) => setFlowerName(e.target.value)}
                  placeholder="e.g. Blossom of Our Sunday Date"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-900 block mb-1">
                  Unlocked By / Dedicated To
                </label>
                <input
                  type="text"
                  value={unlockedReason}
                  onChange={(e) => setUnlockedReason(e.target.value)}
                  placeholder="e.g. SwaG & My Love Milestone"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-rose-100">
                <button
                  type="button"
                  onClick={() => setIsPlantModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-rose-800 hover:bg-rose-50 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-xs transition-colors"
                >
                  Plant Blossom ♡
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
