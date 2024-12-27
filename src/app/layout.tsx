import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";


const nunito = Nunito({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Language Games",
  description: "Practice languages with fun quizzes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Language Games" />
        <meta property="og:description" content="Practice languages with fun games" />
        <meta property="og:site_name" content="language games" />
        <meta property="og:url" content="https://langgames.vercel.app" />
        <meta property="og:image" content="/thumbnail.png" />
      </head>
      <body
        className={`${nunito.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
