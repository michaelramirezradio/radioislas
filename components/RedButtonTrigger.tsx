'use client';

import React from 'react';
import { Radio, Sparkles, Tv2 } from 'lucide-react';

interface RedButtonTriggerProps {
  onOpenPlayer: () => void;
}

export const RedButtonTrigger: React.FC<RedButtonTriggerProps> = ({ onOpenPlayer }) => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex flex-col items-center gap-2">
      <button
        onClick={onOpenPlayer}
        className="group relative flex items-center gap-4 bg-red-600 hover:bg-red-500 text-white px-8 py-3.5 rounded-lg border-2 border-white/20 shadow-[0_0_30px_rgba(220,38,38,0.7)] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-400/80 cursor-pointer animate-pulse"
        aria-label="Abrir Servicios Interactivos RadioIslas (Botón Rojo)"
      >
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-white shadow-md animate-ping-once" />
          <span className="font-bold text-xl tracking-wider uppercase font-sans text-white drop-shadow-md">
            SERVICIOS INTERACTIVOS
          </span>
          <span className="bg-black/60 text-yellow-300 border border-yellow-400/30 text-[10px] font-black uppercase px-2 py-0.5 rounded">
            BOTÓN ROJO
          </span>
        </div>
      </button>

      <div className="flex items-center gap-2 text-white/70 text-xs font-medium bg-black/60 px-4 py-1 rounded-full border border-white/10 backdrop-blur-xs">
        <Tv2 className="w-3.5 h-3.5 text-red-400" />
        <span>Presione el botón rojo [R] de su mando para escuchar RADIOISLAS HD</span>
      </div>
    </div>
  );
};

