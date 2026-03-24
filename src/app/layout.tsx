/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteTitle = "Depth Lab - 깊이를 해부하다 | 지각심리학 체험형 웹앱";
const siteDescription =
  "7가지 깊이 단서를 탐험하고 15개 2AFC 트라이얼로 자신의 지각 프로필을 확인하는 인터랙티브 3D Depth Lab.";
const localMetadataBase = "http://localhost:3000";

function getMetadataBase() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL;

  if (!siteUrl) {
    return new URL(localMetadataBase);
  }

  const normalizedSiteUrl = siteUrl.startsWith("http") ? siteUrl : `https://${siteUrl}`;

  try {
    return new URL(normalizedSiteUrl);
  } catch {
    return new URL(localMetadataBase);
  }
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: siteTitle,
  description: siteDescription,
  applicationName: "Depth Lab",
  keywords: [
    "Depth Lab",
    "깊이 지각",
    "지각심리학",
    "depth perception",
    "3D learning",
    "2AFC",
  ],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: "Depth Lab",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Outfit:wght@100..900&display=swap"
        />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pretendard/dist/web/static/pretendard.css" />
      </head>
      <body className="min-h-screen bg-background font-sans text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
