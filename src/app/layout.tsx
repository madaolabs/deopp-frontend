import type { Metadata } from "next";
import "./global.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { DProvider } from "@/components/DProvider";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <AppRouterCacheProvider>
          <DProvider>{children}</DProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
