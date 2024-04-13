import type { Metadata } from "next";
import "./global.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { DProvider } from "@/components/DProvider";
import { GoogleAnalytics } from "@next/third-parties/google";

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
        <GoogleAnalytics gaId="G-W3WL439YW6" />
      </body>
    </html>
  );
}
