import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./QueryProvider";
import { Toaster } from "@/components/ui/toaster";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata: Metadata = {
  title: "Questionnaire system",
  description: "Generated by create next app",
  icons: { icon: "/icon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <NuqsAdapter>
            {children}
            <Toaster />
          </NuqsAdapter>
        </QueryProvider>
      </body>
    </html>
  );
}
