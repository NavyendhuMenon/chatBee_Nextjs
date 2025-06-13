import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your App Title',
  description: 'Your app description here',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-200">
        {children}
      </body>
    </html>
  );
}