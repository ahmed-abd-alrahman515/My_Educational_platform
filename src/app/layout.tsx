import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Cairo } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LanguageTransition } from "@/components/layout/LanguageTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://codequest.example"),
  title: {
    default: "CodeQuest — Gamified Programming Quizzes",
    template: "%s · CodeQuest",
  },
  description:
    "A bilingual (Arabic/English) gamified programming quiz platform. Master frontend and backend tracks, earn XP, and unlock badges.",
  keywords: [
    "programming quiz",
    "learn to code",
    "frontend",
    "backend",
    "JavaScript",
    "React",
    "Laravel",
    "Arabic programming",
  ],
  openGraph: {
    title: "CodeQuest — Gamified Programming Quizzes",
    description:
      "Master programming by playing. Bilingual quizzes across 13 tracks.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fc" },
    { media: "(prefers-color-scheme: dark)", color: "#060812" },
  ],
};

/**
 * Inline script that applies the persisted theme before React hydrates,
 * preventing a flash of the wrong color scheme on first paint.
 */
const themeScript = `
(function () {
  try {
    var t = localStorage.getItem('codequest:theme') || 'dark';
    var sys = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = t === 'dark' || (t === 'system' && sys);
    document.documentElement.classList.toggle('dark', dark);
    var lang = localStorage.getItem('codequest:language');
    if (lang === 'ar') {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
    }
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${inter.variable} ${mono.variable} ${cairo.variable} font-sans antialiased`}
      >
        <AppProviders>
          <LanguageTransition>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </LanguageTransition>
        </AppProviders>
      </body>
    </html>
  );
}
