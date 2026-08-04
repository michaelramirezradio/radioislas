'use client';

import React, { useEffect } from 'react';
import { HBBTV_KEYS } from '@/lib/hbbtv-types';

interface HbbtvEngineProps {
  onKeyPress: (keyName: string, keyCode: number) => void;
}

export const HbbtvEngine: React.FC<HbbtvEngineProps> = ({ onKeyPress }) => {
  useEffect(() => {
    // Standard HbbTV OIPF Application Manager Initialization
    try {
      const appMgr = (document.getElementById('appmgr') || document.getElementById('oipfAppMgr')) as any;
      if (appMgr && typeof appMgr.getOwnerApplication === 'function') {
        const app = appMgr.getOwnerApplication(document);
        if (app) {
          app.show(); // Display the HbbTV UI canvas
          
          // Set HbbTV KeySet Mask to capture navigation, color keys, media keys
          if (app.privateData && app.privateData.keyset) {
            const keyset = app.privateData.keyset;
            // 0x1: NAVIGATION, 0x2: COLOR, 0x4: VCR/MEDIA, 0x8: NUMERIC, 0x10: ALPHA
            const mask =
              (keyset.NAVIGATION || 0x1) |
              (keyset.COLOR || 0x2) |
              (keyset.VCR || 0x4) |
              (keyset.NUMERIC || 0x8) |
              (keyset.ALPHA || 0x10);
            keyset.setValue(mask);
            console.log('[HbbTV Engine] Smart TV Application initialized & keyset registered:', mask);
          }
        }
      }
    } catch (err) {
      console.log('[HbbTV Engine] Running in web simulation mode:', err);
    }

    // Keydown Listener mapping Smart TV remote control keys
    const handleKeyDown = (event: KeyboardEvent) => {
      const code = event.keyCode || event.which;

      let keyName = 'UNKNOWN';

      if (HBBTV_KEYS.VK_RED.includes(code)) keyName = 'RED';
      else if (HBBTV_KEYS.VK_GREEN.includes(code)) keyName = 'GREEN';
      else if (HBBTV_KEYS.VK_YELLOW.includes(code)) keyName = 'YELLOW';
      else if (HBBTV_KEYS.VK_BLUE.includes(code)) keyName = 'BLUE';
      else if (HBBTV_KEYS.VK_UP.includes(code)) keyName = 'UP';
      else if (HBBTV_KEYS.VK_DOWN.includes(code)) keyName = 'DOWN';
      else if (HBBTV_KEYS.VK_LEFT.includes(code)) keyName = 'LEFT';
      else if (HBBTV_KEYS.VK_RIGHT.includes(code)) keyName = 'RIGHT';
      else if (HBBTV_KEYS.VK_ENTER.includes(code)) keyName = 'ENTER';
      else if (HBBTV_KEYS.VK_BACK.includes(code)) keyName = 'BACK';
      else if (HBBTV_KEYS.VK_PLAY.includes(code)) keyName = 'PLAY';
      else if (HBBTV_KEYS.VK_PAUSE.includes(code)) keyName = 'PAUSE';
      else if (HBBTV_KEYS.VK_STOP.includes(code)) keyName = 'STOP';

      if (keyName !== 'UNKNOWN') {
        event.preventDefault();
        onKeyPress(keyName, code);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onKeyPress]);

  return (
    <div className="hidden" aria-hidden="true" id="hbbtv-oipf-objects">
      {/* OIPF Application Manager object required by ETSI TS 102 796 */}
      <object
        id="appmgr"
        type="application/x-hbbtv-settings"
        style={{ position: 'absolute', width: 0, height: 0, opacity: 0 }}
      />
      {/* Fallback OIPF object for legacy receivers */}
      <object
        id="oipfAppMgr"
        type="application/oipfApplicationManager"
        style={{ position: 'absolute', width: 0, height: 0, opacity: 0 }}
      />
      {/* OIPF Configuration object */}
      <object
        id="oipfConfig"
        type="application/oipfConfiguration"
        style={{ position: 'absolute', width: 0, height: 0, opacity: 0 }}
      />
      {/* OIPF Capabilities object */}
      <object
        id="oipfCapabilities"
        type="application/oipfCapabilities"
        style={{ position: 'absolute', width: 0, height: 0, opacity: 0 }}
      />
    </div>
  );
};

