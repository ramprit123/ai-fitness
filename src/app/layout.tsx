import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "AI Fitness - Your Personal AI Workout Companion",
  description:
    "Transform your fitness journey with AI-powered personalized workout plans, nutrition guidance, and real-time exercise tracking. Get fit smarter with AI Fitness.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: [
    "AI fitness",
    "workout app",
    "personal trainer",
    "exercise tracking",
    "fitness technology",
  ],
  authors: [{ name: "AI Fitness Team" }],
  openGraph: {
    title: "AI Fitness - Smart Workout Solutions",
    description:
      "Your AI-powered fitness companion for personalized workouts and nutrition guidance",
    images: [{ url: "/og-image.jpg" }],
  },
};
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geist.variable}`}>
        <body>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
