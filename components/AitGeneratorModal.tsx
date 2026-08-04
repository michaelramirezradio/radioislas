'use client';

import React, { useState } from 'react';
import { Check, Copy, Download, FileCode2, Radio, X } from 'lucide-react';

interface AitGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AitGeneratorModal: React.FC<AitGeneratorModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const appUrl = typeof window !== 'undefined' ? window.location.href : 'https://radioislas.es/hbbtv/';

  const aitXmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<!-- HbbTV Application Information Table (AIT) Descriptor for RADIOISLAS -->
<!-- ETSI TS 102 796 v2.0.2 Compliant - MUX TDT CANARIAS -->
<mhp:ServiceDiscovery xmlns:mhp="urn:dvb:mhp:2009" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <mhp:ApplicationDiscoveryDomain>
    <mhp:ApplicationTable>
      <mhp:Application>
        <mhp:appNameLanguage>spa</mhp:appNameLanguage>
        <mhp:appName>RADIOISLAS HD - Servicios Interactivos</mhp:appName>
        <mhp:applicationIdentifier>
          <mhp:orgId>0x000000FA</mhp:orgId> <!-- RadioIslas Broadcaster ID -->
          <mhp:appId>0x0001</mhp:appId>      <!-- Interactive Radio Player App ID -->
        </mhp:applicationIdentifier>
        <mhp:applicationControlCode>PRESENT</mhp:applicationControlCode>
        <mhp:applicationDescriptor>
          <mhp:type>0x0010</mhp:type> <!-- HbbTV Application Type -->
          <mhp:visibility>VISIBLE_ALL</mhp:visibility>
          <mhp:serviceBound>true</mhp:serviceBound>
          <mhp:priority>1</mhp:priority>
          <mhp:version>1</mhp:version>
          <mhp:mhpVersion>
            <mhp:profile>0x0001</mhp:profile>
            <mhp:versionMajor>2</mhp:versionMajor>
            <mhp:versionMinor>0</mhp:versionMinor>
            <mhp:versionMicro>2</mhp:versionMicro>
          </mhp:mhpVersion>
        </mhp:applicationDescriptor>
        <mhp:applicationBoundary>
          <mhp:boundary>${appUrl.replace(/\/+$/, '')}</mhp:boundary>
        </mhp:applicationBoundary>
        <mhp:applicationSpecificDescriptor>
          <mhp:entryLocation>${appUrl.replace(/\/+$/, '')}/index.html</mhp:entryLocation>
        </mhp:applicationSpecificDescriptor>
      </mhp:Application>
    </mhp:ApplicationTable>
  </mhp:ApplicationDiscoveryDomain>
</mhp:ServiceDiscovery>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(aitXmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([aitXmlContent], { type: 'text/xml' });
    element.href = URL.createObjectURL(file);
    element.download = 'radioislas_ait_signaling.xml';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-zinc-950 border-2 border-amber-500/40 w-full max-w-3xl rounded-3xl p-6 shadow-2xl text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-4">
          <div className="flex items-center gap-3">
            <FileCode2 className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-lg font-black tracking-wide font-sans">
                Señalización AIT (Application Information Table) DVB-TDT
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                Especificación HbbTV ETSI TS 102 796 v2.0.2 para inyección en MUX TDT
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Code View */}
        <div className="relative bg-black rounded-2xl p-4 border border-zinc-800 font-mono text-xs text-emerald-400 max-h-96 overflow-y-auto mb-4">
          <pre>{aitXmlContent}</pre>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <Radio className="w-4 h-4" />
            <span>Organización MHP: 0x000000FA • AppId: 0x0001</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '¡Copiado!' : 'Copiar XML'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black rounded-xl font-black text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-lg shadow-amber-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Descargar .XML</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
