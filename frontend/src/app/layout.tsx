import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'QuickHire — Find Your Dream Job',
  description:
    'QuickHire is the best job board for job seekers and companies. Discover more than 5000+ jobs.',
  keywords: ['jobs', 'hiring', 'career', 'job board', 'QuickHire'],
  openGraph: {
    title: 'QuickHire — Find Your Dream Job',
    description: 'Search and apply for thousands of jobs on QuickHire.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
