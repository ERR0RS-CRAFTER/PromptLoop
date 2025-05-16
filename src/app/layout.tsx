import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'PromptLoop - Social Network for AI Prompts',
  description: 'The first social network and search engine focused solely on high-quality AI prompts for ChatGPT, Midjourney, and other AI tools.',
  keywords: ['AI prompts', 'ChatGPT prompts', 'Midjourney prompts', 'AI tools', 'Prompt engineering'],
  openGraph: {
    title: 'PromptLoop - Social Network for AI Prompts',
    description: 'Discover, share, and rate high-quality AI prompts for popular tools like ChatGPT, Midjourney, and more.',
    url: 'https://promptloop.vercel.app',
    siteName: 'PromptLoop',
    images: [
      {
        url: 'https://promptloop.vercel.app/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PromptLoop - Social Network for AI Prompts',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PromptLoop - Social Network for AI Prompts',
    description: 'Discover, share, and rate high-quality AI prompts for popular tools like ChatGPT, Midjourney, and more.',
    images: ['https://promptloop.vercel.app/images/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow container py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
