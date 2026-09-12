import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';


const manrope = localFont({
  src: [
    { path: '../../public/fonts/manrope-regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/manrope-medium.ttf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/manrope-semibold.ttf', weight: '600', style: 'normal' },
  ],
  variable: '--font-manrope', display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.juan-oclock.com'),
  title: 'Juan Oclock — From idea to “wait, it works.”',
  description: 'Developer. Dad. Curious builder. A home for my side projects, including CalorieCue and Taqvo, and the occasional questionable idea.',
  authors: [{ name: 'Juan Oclock' }],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Juan Oclock — Developer & curious builder',
    description: 'Side projects, real apps, and occasional sleep. Explore CalorieCue, Taqvo, and what comes next.',
    url: '/', siteName: 'Juan Oclock', type: 'website', locale: 'en_US',
    images: [{ url: '/images/portfolio/juan-hero-wide.webp', width: 1487, height: 1058, alt: 'Juan sitting on a sofa against a warm stone wall' }],
  },
  twitter: { card: 'summary_large_image', title: 'Juan Oclock — Developer & curious builder', description: 'Side projects, real apps, and occasional sleep.', images: ['/images/portfolio/juan-hero-wide.webp'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={manrope.variable}>{children}</body></html>;
}
