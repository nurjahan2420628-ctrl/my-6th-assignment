import type { Metadata } from "next";

import "./globals.css";

import { FitLogProvider } from "@/components/fitlog-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "FitLog",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FitLogProvider>
          <Navbar />

          <main>
            {children}
          </main>

          <Footer />
        </FitLogProvider>
      </body>
    </html>
  );
}