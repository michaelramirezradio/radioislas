'use client';

import React, { useState, useEffect } from 'react';
import {
  PROGRAM_SCHEDULE,
  ProgramSlot,
  getCurrentProgramSlot,
  getCanaryTimeFormatted,
  getCanaryDate,
  handleImageFallback,
  handleLogoFallback,
  RADIO_ISLAS_LOGO_URL
} from '@/lib/hbbtv-types';
import { LedVuMeter } from './LedVuMeter';
import { AppQrSection } from './AppQrSection';
import {
  Pause,
  Play,
  Radio,
  RadioTower,
  Volume2,
  VolumeX,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Tv,
  Calendar,
  Clock,
  User,
  RotateCcw
} from 'lucide-react';

interface VintagePlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isStreamPlaying: boolean;
  onTogglePlayStream: () => void;
  streamStatus: 'idle' | 'connecting' | 'playing' | 'error';
  audioRef: React.RefObject<HTMLAudioElement | null>;
  volume: number;
  onVolumeChange: (newVol: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  tdtMuxMuted: boolean;
  onToggleTdtMuxAudio: () => void;
  onOpenAitModal?: () => void;
}

export const VintagePlayerModal: React.FC<VintagePlayerModalProps> = ({
  isOpen,
  onClose,
  isStreamPlaying,
  onTogglePlayStream,
  streamStatus,
  audioRef,
  volume,
  onVolumeChange,
  isMuted,
  onToggleMute,
  tdtMuxMuted,
  onToggleTdtMuxAudio,
  onOpenAitModal
}) => {
  // Live Canary Islands Time & Program state
  const [canaryTime, setCanaryTime] = useState<string>('');
  const [canaryDay, setCanaryDay] = useState<string>('Lunes');
  const [canaryFullDate, setCanaryFullDate] = useState<string>('');
  const [liveSlot, setLiveSlot] = useState<ProgramSlot>(getCurrentProgramSlot());

  // Manual browsing state for schedule/communicators
  const [isManualSelection, setIsManualSelection] = useState<boolean>(false);
  const [manualIndex, setManualIndex] = useState<number>(0);

  // Tab & Schedule view state
  const [activeTab, setActiveTab] = useState<'player' | 'schedule'>('player');
  const [selectedDay, setSelectedDay] = useState<string>('Lunes');

  // Update real-time Canary Islands clock and live show matching
  useEffect(() => {
    const updateTime = () => {
      const formatted = getCanaryTimeFormatted();
      setCanaryTime(formatted);

      const cDate = getCanaryDate();
      const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      const cDay = days[cDate.getDay()];
      const dayNum = cDate.getDate();
      const monthName = months[cDate.getMonth()];
      setCanaryDay(cDay);
      setCanaryFullDate(`${cDay}, ${dayNum} ${monthName}`);

      const slot = getCurrentProgramSlot();
      setLiveSlot(slot);

      if (!isManualSelection) {
        setSelectedDay(cDay);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 5000);
    return () => clearInterval(interval);
  }, [isManualSelection]);

  if (!isOpen) return null;

  // Active display slot (either live show or manually navigated slot)
  const displaySlot: ProgramSlot = isManualSelection
    ? PROGRAM_SCHEDULE[manualIndex]
    : liveSlot;

  const isCurrentLiveOnAir = !isManualSelection || displaySlot.id === liveSlot.id;

  const handleNextCommunicator = () => {
    setIsManualSelection(true);
    setManualIndex((prev) => (prev + 1) % PROGRAM_SCHEDULE.length);
  };

  const handlePrevCommunicator = () => {
    setIsManualSelection(true);
    setManualIndex((prev) => (prev - 1 + PROGRAM_SCHEDULE.length) % PROGRAM_SCHEDULE.length);
  };

  const handleSyncToLive = () => {
    setIsManualSelection(false);
    const current = getCurrentProgramSlot();
    setLiveSlot(current);
    const idx = PROGRAM_SCHEDULE.findIndex((s) => s.id === current.id);
    if (idx !== -1) setManualIndex(idx);
  };

  const daysList = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const filteredSchedule = PROGRAM_SCHEDULE.filter((item) => item.day === selectedDay);

  const defaultFallbackImage =
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&auto=format&fit=crop&q=80';

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs select-none">
      {/* Vintage Hi-Fi 80s Receiver Chassis Container */}
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-zinc-900 via-zinc-950 to-black rounded-3xl border-4 border-amber-600/50 shadow-[0_0_60px_rgba(245,158,11,0.25),0_25px_50px_-12px_rgba(0,0,0,0.9)] overflow-hidden text-slate-100 flex flex-col animate-scale-up">
        
        {/* FULL-WIDTH BROADCAST HEADER: RADIO ISLAS LOGO (HEADER PRINCIPAL) */}
        <div className="w-full bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 px-4 py-3 sm:py-4 border-b-2 border-amber-500/40 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center">
          {/* Ambient Glowing Backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          {/* Top Control Bar overlay inside Logo Header */}
          <div className="relative z-10 w-full flex items-center justify-between mb-2 sm:mb-3">
            {/* Left Calendar Date & Canary Clock Display */}
            <div className="flex items-center gap-2 bg-black/80 px-3.5 py-1.5 rounded-full border border-amber-500/40 text-amber-300 font-mono text-xs shadow-md">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold text-amber-300">{canaryFullDate}</span>
              <span className="text-zinc-600">|</span>
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300 font-extrabold">{canaryTime} hs</span>
            </div>

            {/* Right Action Controls: Exit Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 bg-red-950/90 hover:bg-red-800 border border-red-500/50 text-red-200 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all hover:scale-105 cursor-pointer shadow-md"
                title="Cerrar reproductor"
              >
                <span>VOLVER [R]</span>
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Main Large Full-Width Logo Image */}
          <div className="relative z-10 w-full max-w-5xl px-2 flex items-center justify-center">
            <img
              src={RADIO_ISLAS_LOGO_URL}
              alt="Radio Islas - Logo Oficial"
              onError={handleLogoFallback}
              className="w-full max-h-24 sm:max-h-32 md:max-h-40 object-contain drop-shadow-[0_4px_24px_rgba(245,158,11,0.6)] transition-transform duration-300 hover:scale-[1.01]"
            />
          </div>
        </div>

        {/* MAIN BODY: Player View OR Weekly Schedule View */}
        {activeTab === 'player' ? (
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/90 via-black/95 to-black">
            
            {/* LEFT COLUMN: COMMUNICATOR CARD WITH TOP LARGE PHOTO */}
            <div className="md:col-span-5 flex flex-col justify-between">
              
              {/* COMMUNICATOR CARD: LARGE PHOTO AT TOP, INFO & DETAILS BELOW */}
              <div className="relative bg-zinc-950/90 rounded-2xl p-4 border border-zinc-800 shadow-xl overflow-hidden h-full flex flex-col justify-between">
                
                {/* Header Badge: Communicator Title + Live Canary Badge */}
                <div className="flex items-center justify-between text-xs font-mono text-amber-400 uppercase tracking-wider mb-3">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>COMUNICADOR EN ANTENA</span>
                  </div>
                  {isCurrentLiveOnAir ? (
                    <span className="text-[10px] bg-red-950 text-red-300 border border-red-500/50 px-2 py-0.5 rounded-full font-bold flex items-center gap-1 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                      DIRECTO CANARIAS
                    </span>
                  ) : (
                    <button
                      onClick={handleSyncToLive}
                      className="text-[10px] bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/40 px-2 py-0.5 rounded-full font-bold transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>IR A AL AIRE</span>
                    </button>
                  )}
                </div>

                {/* 1. LARGE PHOTO AT THE TOP */}
                <div className="relative w-full overflow-hidden rounded-2xl border-2 border-amber-500/60 shadow-xl bg-zinc-900 group">
                  <img
                    src={displaySlot.imageUrl}
                    alt={displaySlot.communicator}
                    onError={handleImageFallback}
                    className="w-full h-52 sm:h-60 md:h-64 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Overlay Badges on Photo */}
                  <div className="absolute top-2.5 right-2.5 bg-black/85 backdrop-blur-md text-amber-300 border border-amber-500/50 text-[10px] font-mono font-black px-2 py-0.5 rounded-md shadow-md flex items-center gap-1">
                    <RadioTower className="w-3 h-3 text-amber-400 animate-pulse" />
                    <span>HD CANARIAS</span>
                  </div>

                  {isCurrentLiveOnAir && (
                    <div className="absolute bottom-2.5 left-2.5 bg-red-600/95 text-white text-[10px] font-black px-2.5 py-0.5 rounded-md tracking-wider uppercase shadow-lg flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      EN EMISIÓN AHORA
                    </div>
                  )}
                </div>

                {/* 2. ALL INFORMATION BELOW THE PHOTO */}
                <div className="mt-3 flex flex-col gap-1.5 text-slate-100">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-white font-black text-lg sm:text-xl tracking-wide leading-tight truncate">
                      {displaySlot.communicator === '-' ? 'Radio Las Palmas' : displaySlot.communicator}
                    </h3>
                    <span className="text-[10px] font-mono bg-zinc-900 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-bold shrink-0">
                      {displaySlot.day}
                    </span>
                  </div>

                  <p className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                    {displaySlot.role || 'Locutor y Presentador'}
                  </p>

                  <div className="bg-zinc-900/90 border border-zinc-800 p-2.5 rounded-xl mt-1 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-xs text-amber-300 font-extrabold">
                      <Radio className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{displaySlot.program}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 font-semibold">
                      <Clock className="w-3 h-3 shrink-0" />
                      <span>{displaySlot.timeSlot} hs (Horario Islas Canarias)</span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed line-clamp-3 italic mt-0.5">
                    &quot;{displaySlot.bio || `Programa ${displaySlot.program} en la sintonía de Radio Las Palmas.`}&quot;
                  </p>
                </div>

                {/* 3. PARRILLA NAVIGATION CONTROLS */}
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-zinc-800/80 text-xs text-zinc-400">
                  <span className="text-[10px] font-mono">
                    Navegar ({isManualSelection ? manualIndex + 1 : PROGRAM_SCHEDULE.findIndex(s => s.id === displaySlot.id) + 1} / {PROGRAM_SCHEDULE.length})
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrevCommunicator}
                      className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                      title="Anterior Comunicador / Programa"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={handleSyncToLive}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border transition-colors cursor-pointer ${
                        isCurrentLiveOnAir
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                          : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white'
                      }`}
                      title="Sintonizar el programa que está al aire en este momento en Canarias"
                    >
                      {isCurrentLiveOnAir ? 'AL AIRE' : 'AL AIRE AHORA'}
                    </button>

                    <button
                      onClick={handleNextCommunicator}
                      className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                      title="Siguiente Comunicador / Programa"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT COLUMN: PROGRAM NAME, AUDIO CONTROLS, VU METER, QR CODES */}
            <div className="md:col-span-7 flex flex-col justify-between gap-4">
              
              {/* PROGRAM NAME & AUDIO SOURCE SELECTOR PANEL */}
              <div className="bg-zinc-950/90 p-4 rounded-2xl border border-zinc-800 shadow-xl flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-amber-400/90 uppercase tracking-widest font-bold">
                    EMISIÓN DE HOY • HORA CANARIA
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-500/30 shrink-0">
                    {displaySlot.day} {displaySlot.timeSlot} hs
                  </span>
                </div>

                <h2 className="text-2xl font-black text-white tracking-wide font-sans">
                  {displaySlot.program}
                </h2>

                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <User className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-semibold text-amber-200">{displaySlot.communicator}</span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-zinc-400 italic">{displaySlot.role}</span>
                </div>

                {/* Explicit Audio Source Toggle Selector */}
                <div className="pt-2 border-t border-zinc-800/80 flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-wider">
                    SELECCIÓN DE FUENTE DE AUDIO EN DIRECTO:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        if (!isStreamPlaying) onTogglePlayStream();
                        if (!tdtMuxMuted) onToggleTdtMuxAudio();
                      }}
                      className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                        isStreamPlaying && tdtMuxMuted
                          ? 'bg-amber-500 text-zinc-950 border-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-amber-500/50'
                      }`}
                    >
                      <Radio className="w-4 h-4" />
                      <span>AUDIO INTERNET HD (STREAM)</span>
                    </button>

                    <button
                      onClick={() => {
                        if (isStreamPlaying) onTogglePlayStream();
                        if (tdtMuxMuted) onToggleTdtMuxAudio();
                      }}
                      className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                        !tdtMuxMuted && !isStreamPlaying
                          ? 'bg-cyan-500 text-zinc-950 border-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-cyan-500/50'
                      }`}
                    >
                      <Tv className="w-4 h-4" />
                      <span>AUDIO MUX TDT (TV)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* MASTER PLAYER CONTROL PANEL */}
              <div className="bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 p-4 rounded-2xl border-2 border-amber-500/30 shadow-2xl flex items-center justify-between gap-4">
                
                {/* Play / Pause Main Button */}
                <button
                  onClick={onTogglePlayStream}
                  className={`flex items-center gap-3 px-6 py-3.5 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer ${
                    isStreamPlaying
                      ? 'bg-amber-500 text-zinc-950 hover:bg-amber-400 shadow-amber-500/30'
                      : 'bg-red-600 text-white hover:bg-red-500 shadow-red-600/30 animate-pulse'
                  }`}
                >
                  {isStreamPlaying ? (
                    <>
                      <Pause className="w-5 h-5 fill-current" />
                      <span>PAUSAR EMISIÓN</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-current" />
                      <span>SINTONIZAR AHORA</span>
                    </>
                  )}
                </button>

                {/* Status Indicator */}
                <div className="flex flex-col text-right">
                  <span className="text-[10px] font-mono uppercase text-zinc-400">ESTADO DE RECEPCIÓN</span>
                  <span className={`font-mono text-xs font-bold ${
                    streamStatus === 'playing' ? 'text-emerald-400' :
                    streamStatus === 'connecting' ? 'text-amber-400 animate-pulse' : 'text-slate-300'
                  }`}>
                    {streamStatus === 'playing' ? '● EN DIRECTO' :
                     streamStatus === 'connecting' ? '◌ SINTONIZANDO STREAM...' : 'PAUSADO (TDT MUX ACTIVO)'}
                  </span>
                </div>

                {/* Volume & Mute Controls */}
                <div className="flex items-center gap-3 border-l border-zinc-800 pl-4">
                  <button
                    onClick={onToggleMute}
                    className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 transition-colors cursor-pointer"
                    title={isMuted ? 'Desactivar Silencio' : 'Silenciar Stream'}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
                  </button>
                  <div className="flex flex-col w-20">
                    <span className="text-[10px] font-mono text-zinc-400 text-center mb-1">VOL: {volume}%</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => onVolumeChange(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* 80s HORIZONTAL LED VU METER */}
              <LedVuMeter isPlaying={isStreamPlaying && !isMuted} audioRef={audioRef} />

              {/* APP STORE & GOOGLE PLAY QR CODE SECTION */}
              <AppQrSection />

            </div>

          </div>
        ) : (
          /* WEEKLY SCHEDULE TAB VIEW */
          <div className="p-6 bg-zinc-950 flex flex-col gap-4 max-h-[520px] overflow-y-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
              <div>
                <h2 className="text-xl font-black text-amber-400 font-sans tracking-wide flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-400" />
                  <span>PARRILLA DE EMISIÓN • RADIO LAS PALMAS (HORA CANARIA)</span>
                </h2>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">
                  Hoy es {canaryDay} ({canaryTime} hs). Selecciona un día para consultar la programación.
                </p>
              </div>

              <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800 overflow-x-auto">
                {daysList.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                      selectedDay === day
                        ? 'bg-amber-500 text-zinc-950 shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Shows for Selected Day */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredSchedule.map((slot) => {
                const isThisSlotLive = slot.id === liveSlot.id && slot.day === canaryDay;
                return (
                  <div
                    key={slot.id}
                    onClick={() => {
                      const idx = PROGRAM_SCHEDULE.findIndex((s) => s.id === slot.id);
                      if (idx !== -1) {
                        setManualIndex(idx);
                        setIsManualSelection(true);
                        setActiveTab('player');
                      }
                    }}
                    className={`p-3 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer ${
                      isThisSlotLive
                        ? 'bg-amber-950/40 border-amber-500/80 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                        : 'bg-zinc-900/90 border-zinc-800 hover:border-amber-500/50'
                    }`}
                  >
                    <img
                      src={slot.imageUrl}
                      alt={slot.communicator}
                      onError={handleImageFallback}
                      className="w-16 h-16 rounded-xl object-cover border border-amber-500/40 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[10px] font-mono text-amber-400 font-bold flex items-center gap-1">
                          <Clock className="w-3 h-3 text-emerald-400" />
                          {slot.timeSlot} hs
                        </span>
                        {isThisSlotLive ? (
                          <span className="text-[9px] bg-red-600 text-white font-black px-2 py-0.5 rounded uppercase font-mono animate-pulse">
                            AL AIRE
                          </span>
                        ) : (
                          <span className="text-[9px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded uppercase font-mono">
                            {slot.day}
                          </span>
                        )}
                      </div>
                      <h3 className="text-white font-extrabold text-sm truncate">
                        {slot.program}
                      </h3>
                      <p className="text-zinc-300 text-xs flex items-center gap-1 mt-0.5">
                        <User className="w-3 h-3 text-amber-400/80" />
                        <span className="truncate">{slot.communicator}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Vintage Lower Remote Key Guidelines Footer */}
        <div className="bg-zinc-950 px-4 sm:px-6 py-2.5 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto">
            <span className="flex items-center gap-1.5 text-red-400 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> [R] CERRAR / TDT
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> [G] PLAY/PAUSE
            </span>
            <span className="flex items-center gap-1.5 text-amber-400 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> [Y] MUTE
            </span>
            <span className="flex items-center gap-1.5 text-sky-400 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" /> [B] NAVEGAR PARRILLA
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-zinc-500 shrink-0">
            <Tv className="w-3.5 h-3.5 text-amber-400" />
            <span>HbbTV ETSI TS 102 796 v2.0.2 • HORA CANARIA</span>
          </div>
        </div>

      </div>
    </div>
  );
};
