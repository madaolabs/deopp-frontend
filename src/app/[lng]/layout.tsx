import type { Metadata } from "next";
import { dir } from "i18next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zetascritpion",
  description: "Inscription site",
};

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  return (
    <html
      lang={lng}
      dir={dir(lng)}
      style={{ color: "#fff", backgroundColor: "#141414" }}
    >
      <body
        // className={inter.className}
        style={{ color: "#fff", backgroundColor: "#141414" }}
      >
        {children}
      </body>
    </html>
  );
}
