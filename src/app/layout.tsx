import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.scss";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Life Experiment",
  description: "Turn what you read into real experiments.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-TW" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
