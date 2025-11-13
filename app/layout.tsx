import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  metadataBase: new URL('https://aivira.sg'),
  title: 'Aivira | AI-Powered Grant Automation for Businesses',
  description: 'Aivira automates grant matching, drafting, and compliance for Singapore businesses. Fast, simple, and affordable.',
  openGraph: {
    title: 'Aivira | AI-Powered Grant Automation for Businesses',
    description: 'Aivira automates grant matching, drafting, and compliance for Singapore businesses. Fast, simple, and affordable.',
    url: 'https://aivira.sg',
    siteName: 'Aivira',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aivira - AI-Powered Grant Automation Platform',
      },
    ],
    locale: 'en_SG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aivira | AI-Powered Grant Automation for Businesses',
    description: 'Aivira automates grant matching, drafting, and compliance for Singapore businesses. Fast, simple, and affordable.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  manifest: '/site.webmanifest',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#ffffff',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Aivira',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light">
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}