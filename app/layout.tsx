
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import { useEffect } from "react";

// Определяем шрифт Helvetica
const helvetica = localFont({
  src: [
    {
      path: "../public/fonts/Helvetica.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Helvetica-Oblique.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Helvetica-BoldOblique.woff",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/helvetica-light-587ebe5a59211.woff",
      weight: "300",
      style: "normal",
    },
  ],
  display: "swap",
});

export const metadata = {
  title: "Taits Studio - Креативна дизайн-агенція",
  description: "Ми створюємо унікальний дизайн для кожного клієнта",
};

// Компонент для добавления дефолтного дизайнера


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      <body className={`font-helvetica`}>
        {children}
      </body>
    </html>
  );
}