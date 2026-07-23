import type { Metadata } from 'next';

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