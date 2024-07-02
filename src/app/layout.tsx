import "./global.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { DProvider } from "@/components/DProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { DFooter } from "@/components/DFooter";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <link
          href="/assets/MadimiOne-Regular.ttf"
          rel="preload"
          crossOrigin="anonymous"
        ></link>
      </head>
      <body>
        <AppRouterCacheProvider>
          <DProvider>{children}</DProvider>
        </AppRouterCacheProvider>
        <GoogleAnalytics gaId="G-W3WL439YW6" />
        <DFooter />
      </body>
    </html>
  );
}
