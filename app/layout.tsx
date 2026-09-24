import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Promptothon AI Edition — Generate Your Attendee Badge",
  description:
    "Create and download your personalized 'I'm Attending Promptothon AI Edition!' digital badge. Join us on 26–27 September 2026 at AVN Institute of Engineering and Technology, Hyderabad.",
  keywords: [
    "Promptothon",
    "AI Hackathon",
    "Attendee Badge",
    "AVNIET",
    "Hyderabad",
    "Prompt Engineering",
  ],
  openGraph: {
    title: "Promptothon AI Edition 2026 — Attendee Badge Generator",
    description:
      "Generate your personalized attendee badge for Promptothon AI Edition 2026!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
