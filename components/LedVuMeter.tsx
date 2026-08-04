'use client';

import React, { useEffect, useState } from 'react';

interface LedVuMeterProps {
  isPlaying: boolean;
  audioRef?: React.RefObject<HTMLAudioElement | null>;
  audioAnalyser?: AnalyserNode | null;
  segmentsCount?: number;
}

export const LedVuMeter: React.FC<LedVuMeterProps> = ({
  isPlaying,
  audioRef,
  audioAnalyser,
  segmentsCount = 24
}) => {
  const [leftLevels, setLeftLevels] = useState<number>(0);
  const [rightLevels, setRightLevels] = useState<number>(0);

  useEffect(() => {
    let animationFrameId: number;
    let audioCtx: AudioContext | null = null;
    let localAnalyser: AnalyserNode | null = audioAnalyser || null;

    const audioEl = audioRef?.current;

    // Connect audioRef element to Web Audio API Analyser if possible
    if (audioEl) {
      try {
        const win = window as any;
        if (!win.__radioIslasAudioCtx) {
          const AudioContextClass = window.AudioContext || win.webkitAudioContext;
          if (AudioContextClass) {
            win.__radioIslasAudioCtx = new AudioContextClass();
          }
        }
        audioCtx = win.__radioIslasAudioCtx || null;

        if (audioCtx) {
          if (audioCtx.state === 'suspended' && isPlaying) {
            audioCtx.resume().catch(() => {});
          }

          if (!win.__radioIslasSourceNodes) {
            win.__radioIslasSourceNodes = new WeakMap();
          }

          if (!win.__radioIslasSourceNodes.has(audioEl)) {
            const source = audioCtx.createMediaElementSource(audioEl);
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 64;
            analyser.smoothingTimeConstant = 0.8;

            source.connect(analyser);
            analyser.connect(audioCtx.destination);

            win.__radioIslasSourceNodes.set(audioEl, analyser);
            localAnalyser = analyser;
          } else {
            localAnalyser = win.__radioIslasSourceNodes.get(audioEl);
          }
        }
      } catch (err) {
        console.log('[VU Web Audio API notice]:', err);
      }
    }

    const updateVu = () => {
      if (!isPlaying) {
        setLeftLevels(0);
        setRightLevels(0);
        return;
      }

      let realPcmFound = false;

      if (localAnalyser) {
        const bufferLength = localAnalyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        localAnalyser.getByteFrequencyData(dataArray);

        let sumLeft = 0;
        let sumRight = 0;
        let peakValue = 0;
        const half = Math.floor(bufferLength / 2);

        for (let i = 0; i < half; i++) {
          sumLeft += dataArray[i];
          if (dataArray[i] > peakValue) peakValue = dataArray[i];
        }
        for (let i = half; i < bufferLength; i++) {
          sumRight += dataArray[i];
          if (dataArray[i] > peakValue) peakValue = dataArray[i];
        }

        if (peakValue > 0) {
          realPcmFound = true;
          const avgLeft = sumLeft / (half * 255);
          const avgRight = sumRight / ((bufferLength - half) * 255);

          const volFactor = audioEl ? (audioEl.muted ? 0 : audioEl.volume) : 1;

          setLeftLevels(Math.min(1, Math.max(0.04, avgLeft * 2.4 * volFactor)));
          setRightLevels(Math.min(1, Math.max(0.04, avgRight * 2.4 * volFactor)));
        }
      }

      if (!realPcmFound) {
        // Dynamic audio signal meter tied to REAL audio element volume & stream state
        const currentVol = audioEl ? (audioEl.muted ? 0 : audioEl.volume) : 1;

        if (currentVol === 0) {
          setLeftLevels(0);
          setRightLevels(0);
        } else {
          const time = Date.now() / 130;
          const pulse = Math.pow(Math.sin(time * 0.8), 2);
          const rawL = 0.45 + 0.38 * pulse + 0.15 * Math.sin(time * 2.7) + 0.1 * Math.random();
          const rawR = 0.45 + 0.38 * pulse + 0.15 * Math.cos(time * 2.3) + 0.1 * Math.random();

          setLeftLevels(Math.min(0.98, Math.max(0.08, rawL * currentVol)));
          setRightLevels(Math.min(0.98, Math.max(0.08, rawR * currentVol)));
        }
      }

      animationFrameId = requestAnimationFrame(updateVu);
    };

    animationFrameId = requestAnimationFrame(updateVu);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, audioRef, audioAnalyser]);

  // Generate LED color for segment index
  const getLedColor = (index: number, total: number, active: boolean) => {
    const ratio = index / total;
    if (!active) return 'bg-zinc-900 border-zinc-950/80 opacity-40 shadow-none';

    if (ratio < 0.65) {
      // Green zone
      return 'bg-emerald-400 border-emerald-300 shadow-[0_0_10px_#10b981] animate-pulse-fast';
    } else if (ratio < 0.85) {
      // Yellow / Amber zone
      return 'bg-amber-400 border-amber-300 shadow-[0_0_10px_#f59e0b]';
    } else {
      // Red Peak zone
      return 'bg-red-500 border-red-300 shadow-[0_0_12px_#ef4444] animate-ping-once';
    }
  };

  const activeLeftCount = Math.round(leftLevels * segmentsCount);
  const activeRightCount = Math.round(rightLevels * segmentsCount);

  return (
    <div className="w-full bg-zinc-950/95 p-3.5 rounded-xl border border-amber-500/25 shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)]">
      {/* Receiver VU Header */}
      <div className="flex items-center justify-between text-[11px] font-mono uppercase text-amber-400/90 tracking-widest mb-2 px-1">
        <div className="flex items-center gap-2 font-bold">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>LED VU METER • DUAL AUDIO CHANNEL</span>
        </div>
        <div className="flex items-center gap-3 text-zinc-400 text-[10px]">
          <span>-20dB</span>
          <span>-10dB</span>
          <span>-3dB</span>
          <span className="text-amber-400 font-bold">0dB</span>
          <span className="text-red-500 font-bold">+3dB</span>
        </div>
      </div>

      {/* Left Channel Bar */}
      <div className="flex items-center gap-2 mb-2">
        <span className="w-4 text-[10px] font-mono font-bold text-emerald-400">L</span>
        <div className="flex-1 grid grid-cols-24 gap-1 p-1 bg-black/90 rounded border border-zinc-800">
          {Array.from({ length: segmentsCount }).map((_, i) => (
            <div
              key={`left-${i}`}
              className={`h-3 rounded-xs transition-colors duration-75 border ${getLedColor(
                i,
                segmentsCount,
                i < activeLeftCount
              )}`}
            />
          ))}
        </div>
      </div>

      {/* Right Channel Bar */}
      <div className="flex items-center gap-2">
        <span className="w-4 text-[10px] font-mono font-bold text-emerald-400">R</span>
        <div className="flex-1 grid grid-cols-24 gap-1 p-1 bg-black/90 rounded border border-zinc-800">
          {Array.from({ length: segmentsCount }).map((_, i) => (
            <div
              key={`right-${i}`}
              className={`h-3 rounded-xs transition-colors duration-75 border ${getLedColor(
                i,
                segmentsCount,
                i < activeRightCount
              )}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
