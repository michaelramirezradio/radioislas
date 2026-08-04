'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Radio, Tv, Volume2, VolumeX, Wifi, Zap } from 'lucide-react';

interface TdtBroadcastMuxProps {
  isMuted: boolean;
  isPlayerOpen: boolean;
  onToggleMuxAudio?: () => void;
}

export const TdtBroadcastMux: React.FC<TdtBroadcastMuxProps> = ({
  isMuted,
  isPlayerOpen,
  onToggleMuxAudio
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const broadcastObjRef = useRef<HTMLObjectElement | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [signalQuality, setSignalQuality] = useState(98);

  // Sync MUX Audio Muting when Internet Radio Stream starts/stops (Prevent audio overlap)
  useEffect(() => {
    // Standard HTML5 Video background mute sync
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }

    // OIPF HbbTV Broadcast Video Object control
    try {
      const broadcastObj = broadcastObjRef.current as any;
      if (broadcastObj) {
        if (typeof broadcastObj.bindToCurrentChannel === 'function' && !isMuted) {
          broadcastObj.bindToCurrentChannel();
        }
        if (typeof broadcastObj.setVolume === 'function') {
          broadcastObj.setVolume(isMuted ? 0 : 100);
        }
      }
    } catch (e) {
      console.log('[TDT MUX] Broadcast object handling fallback:', e);
    }
  }, [isMuted]);

  // Periodic random signal fluctuation for realistic TDT feel
  useEffect(() => {
    const interval = setInterval(() => {
      setSignalQuality(96 + Math.floor(Math.random() * 4));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black select-none z-0">
      {/* 1. True HbbTV Broadcast Video Object Tag for Smart TV hardware */}
      <object
        ref={broadcastObjRef}
        id="videoBroadcast"
        type="video/broadcast"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ pointerEvents: 'none' }}
      >
        <param name="autostart" value="true" />
      </object>

      {/* 2. Simulated Broadcast Video Feed for Web Preview / Desktop Browsers */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className="w-full h-full object-cover brightness-[0.85] contrast-[1.05]"
          src="https://assets.mixkit.co/videos/preview/mixkit-radio-studio-host-speaking-into-microphone-43093-large.mp4"
        />

        {/* Subtle background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
      </div>
    </div>
  );
};
