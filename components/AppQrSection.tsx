'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Smartphone, QrCode } from 'lucide-react';

export const AppQrSection: React.FC = () => {
  // Deep link URLs or app download landing pages
  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.radioislas.app';
  const appStoreUrl = 'https://apps.apple.com/app/radioislas-hd/id123456789';

  return (
    <div className="bg-zinc-950/90 border border-amber-500/20 p-4 rounded-2xl shadow-xl">
      <div className="flex items-center gap-2 mb-3 text-amber-400 font-bold text-xs uppercase tracking-wider">
        <Smartphone className="w-4 h-4 text-amber-400" />
        <span>DESCARGA NUESTRA APP EN TU MÓVIL</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Google Play Box */}
        <div className="flex items-center gap-3 bg-black/80 p-2.5 rounded-xl border border-zinc-800 hover:border-emerald-500/40 transition-colors">
          <div className="bg-white p-1.5 rounded-lg shadow-md shrink-0">
            <QRCodeSVG
              value={playStoreUrl}
              size={56}
              bgColor="#ffffff"
              fgColor="#0f172a"
              level="M"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-0.5">
              <QrCode className="w-3 h-3" />
              <span>Google Play</span>
            </div>
            <span className="text-white font-extrabold text-xs">Android App</span>
            <span className="text-[10px] text-zinc-400 mt-0.5">Escanea con la cámara</span>
          </div>
        </div>

        {/* Apple App Store Box */}
        <div className="flex items-center gap-3 bg-black/80 p-2.5 rounded-xl border border-zinc-800 hover:border-sky-500/40 transition-colors">
          <div className="bg-white p-1.5 rounded-lg shadow-md shrink-0">
            <QRCodeSVG
              value={appStoreUrl}
              size={56}
              bgColor="#ffffff"
              fgColor="#0f172a"
              level="M"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1 text-[10px] text-sky-400 font-bold uppercase tracking-wider mb-0.5">
              <QrCode className="w-3 h-3" />
              <span>App Store</span>
            </div>
            <span className="text-white font-extrabold text-xs">iOS App</span>
            <span className="text-[10px] text-zinc-400 mt-0.5">Escanea con la cámara</span>
          </div>
        </div>
      </div>
    </div>
  );
};
