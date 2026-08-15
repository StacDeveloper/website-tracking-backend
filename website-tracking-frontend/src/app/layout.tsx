import type { Metadata } from "next";
import "./globals.css";
import { ColorContextProvider } from "./context/useColorContext";
import { BackendContextProvider } from "./context/useBackendContext";
import { AuthContextProvider } from "./context/useAuthContext";
import { RouteGuard } from "@/lib/RouteGuard";

export const metadata: Metadata = {
  title: "WebTest — Test your website. Get real insights.",
  description:
    "Run automated tests, check performance, SEO, accessibility and more. Everything you need to make your website better.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthContextProvider>
          <BackendContextProvider>
            <ColorContextProvider>
              <RouteGuard>
                {children}
              </RouteGuard>
            </ColorContextProvider>
          </BackendContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
