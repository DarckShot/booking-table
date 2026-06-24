import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SAVEUR — бронирование столика',
  description:
    'Онлайн-бронирование столика в ресторане SAVEUR: выберите дату, время и количество гостей.',
  openGraph: {
    title: 'SAVEUR — бронирование столика',
    description: 'Выберите дату, время и количество гостей — забронируйте столик онлайн.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'SAVEUR',
  },
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-background font-sans text-foreground">
        <div className="min-h-screen bg-[linear-gradient(180deg,#FAFAF8_0%,#F5F0E8_100%)]">
          <header className="border-b border-border/70 bg-background/85 backdrop-blur">
            <div className="mx-auto w-full max-w-6xl px-5 py-3 sm:px-8 lg:px-12">
              <p className="text-2xl font-semibold tracking-[-0.04em]">SAVEUR</p>
              <p className="mt-0.5 text-sm text-muted">Restaurant booking</p>
            </div>
          </header>

          <main className="mx-auto w-full max-w-6xl px-5 py-5 sm:px-8 sm:py-6 lg:px-12 lg:py-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
