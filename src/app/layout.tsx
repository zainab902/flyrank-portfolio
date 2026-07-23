import type { Metadata } from 'next';
import './globals.css'; // remove this line if you don't have globals.css

export const metadata: Metadata = {
  title: 'Zainab Sultan | Portfolio',
  description: 'Software Engineer & Web Developer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}