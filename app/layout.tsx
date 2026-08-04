import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Radio Islas • HbbTV TDT Interactivo',
  description: 'Aplicación HbbTV 1.5 / 2.0+ interactiva para Smart TV en el canal de audio TDT de Radio Islas. Incluye reproductor vintage, VU-metro LED y streaming en directo.',
  other: {
    'hbbtv-version': '1.5.1,2.0.1,2.0.2,2.0.3,2.0.4',
    'application-type': 'application/vnd.hbbtv.xhtml+xml'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark bg-black overflow-hidden h-full w-full">
      <head>
        <meta httpEquiv="Content-Type" content="application/vnd.hbbtv.xhtml+xml; charset=utf-8" />
        <meta name="viewport" content="width=1280, height=720, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body suppressHydrationWarning className="bg-black text-slate-100 antialiased overflow-hidden h-full w-full select-none">
        {children}
      </body>
    </html>
  );
}

