'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HbbtvEngine } from '@/components/HbbtvEngine';
import { TdtBroadcastMux } from '@/components/TdtBroadcastMux';
import { RedButtonTrigger } from '@/components/RedButtonTrigger';
import { VintagePlayerModal } from '@/components/VintagePlayerModal';
import { AitGeneratorModal } from '@/components/AitGeneratorModal';
import { COMMUNICATORS } from '@/lib/hbbtv-types';

export default function HbbtvPage() {
  // Application state
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isStreamPlaying, setIsStreamPlaying] = useState(false);
  const [streamStatus, setStreamStatus] = useState<'idle' | 'connecting' | 'playing' | 'error'>('idle');
  const [volume, setVolume] = useState(85);
  const [isMuted, setIsMuted] = useState(false);
  const [tdtMuxMuted, setTdtMuxMuted] = useState(false);
  const [isAitOpen, setIsAitOpen] = useState(false);

  // Audio stream reference for RadioIslas internet broadcast
  const STREAM_URL = 'https://de4.streamingpulse.com/stream/radiolaspalmas';
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize & Sync HTML5 Audio element
  useEffect(() => {
    const audio = new Audio();
    try {
      audio.crossOrigin = 'anonymous';
    } catch (_) {}
    audio.src = STREAM_URL;
    audio.preload = 'none';
    audioRef.current = audio;

    const handlePlaying = () => setStreamStatus('playing');
    const handleWaiting = () => setStreamStatus('connecting');
    const handleError = (e: any) => {
      console.warn('[Audio Stream Error] Trying fallback reconnect:', e);
      setStreamStatus('error');
    };

    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('error', handleError);
      audioRef.current = null;
    };
  }, []);

  // Sync volume & mute state on stream audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  // Open Vintage Player & Mute TDT Broadcast Audio (Prevent Audio Overlap)
  const openPlayer = useCallback(() => {
    setIsPlayerOpen(true);
    setTdtMuxMuted(true); // Silence TDT MUX signal audio

    if (audioRef.current) {
      setStreamStatus('connecting');
      audioRef.current
        .play()
        .then(() => {
          setIsStreamPlaying(true);
          setStreamStatus('playing');
        })
        .catch((err) => {
          console.log('[Autoplay note] User interaction needed for stream:', err);
          setIsStreamPlaying(false);
          setStreamStatus('idle');
        });
    }
  }, []);

  // Close Vintage Player & Restore TDT Broadcast Audio
  const closePlayer = useCallback(() => {
    setIsPlayerOpen(false);
    setTdtMuxMuted(false); // Restore TDT MUX signal audio

    if (audioRef.current) {
      audioRef.current.pause();
      setIsStreamPlaying(false);
      setStreamStatus('idle');
    }
  }, []);

  // Toggle Play / Pause on RadioStream
  const togglePlayStream = useCallback(() => {
    if (!audioRef.current) return;

    if (isStreamPlaying) {
      audioRef.current.pause();
      setIsStreamPlaying(false);
      setStreamStatus('idle');
      setTdtMuxMuted(false); // Restore TDT audio when radio paused
    } else {
      setTdtMuxMuted(true); // Silence TDT audio when radio active
      setStreamStatus('connecting');
      audioRef.current
        .play()
        .then(() => {
          setIsStreamPlaying(true);
          setStreamStatus('playing');
        })
        .catch((err) => {
          console.error('Stream play error:', err);
          setStreamStatus('error');
        });
    }
  }, [isStreamPlaying]);

  // Handle HbbTV Smart TV Remote key presses
  const handleRemoteKeyPress = useCallback(
    (keyName: string) => {
      console.log('[Smart TV Key Event]:', keyName);

      switch (keyName) {
        case 'RED':
          if (isPlayerOpen) {
            closePlayer();
          } else {
            openPlayer();
          }
          break;

        case 'GREEN':
          if (isPlayerOpen) {
            togglePlayStream();
          } else {
            openPlayer();
          }
          break;

        case 'YELLOW':
          setIsMuted((prev) => !prev);
          break;

        case 'BLUE':
          // Toggle TDT audio override manually
          setTdtMuxMuted((prev) => !prev);
          break;

        case 'ENTER':
          if (!isPlayerOpen) {
            openPlayer();
          } else {
            togglePlayStream();
          }
          break;

        case 'BACK':
          if (isPlayerOpen) {
            closePlayer();
          }
          break;

        case 'UP':
          setVolume((prev) => Math.min(100, prev + 10));
          break;

        case 'DOWN':
          setVolume((prev) => Math.max(0, prev - 10));
          break;

        default:
          break;
      }
    },
    [isPlayerOpen, openPlayer, closePlayer, togglePlayStream]
  );

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black font-sans antialiased select-none">
      {/* 1. HbbTV OIPF Native Engine & Event Intercept */}
      <HbbtvEngine onKeyPress={handleRemoteKeyPress} />

      {/* 2. TDT MUX Live Video Background Signal */}
      <TdtBroadcastMux
        isMuted={tdtMuxMuted}
        isPlayerOpen={isPlayerOpen}
        onToggleMuxAudio={() => setTdtMuxMuted((prev) => !prev)}
      />

      {/* 3. Centered Bottom Red Button Banner ("SERVICIOS INTERACTIVOS") */}
      {!isPlayerOpen && <RedButtonTrigger onOpenPlayer={openPlayer} />}

      {/* 4. Interactive Vintage RadioIslas Player Modal */}
      <VintagePlayerModal
        isOpen={isPlayerOpen}
        onClose={closePlayer}
        isStreamPlaying={isStreamPlaying}
        onTogglePlayStream={togglePlayStream}
        streamStatus={streamStatus}
        audioRef={audioRef}
        volume={volume}
        onVolumeChange={setVolume}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted((prev) => !prev)}
        tdtMuxMuted={tdtMuxMuted}
        onToggleTdtMuxAudio={() => setTdtMuxMuted((prev) => !prev)}
        onOpenAitModal={() => setIsAitOpen(true)}
      />

      {/* 5. HbbTV AIT Table Descriptor Generator Modal */}
      <AitGeneratorModal isOpen={isAitOpen} onClose={() => setIsAitOpen(false)} />
    </main>
  );
}
