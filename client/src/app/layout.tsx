import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";

const noto_sans = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Klayd",
  description: "Klayd is a new way to build web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={noto_sans.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
