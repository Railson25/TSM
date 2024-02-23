import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, auth } from "@clerk/nextjs";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Container } from "@/components/conatiner";
import { Toaster } from "@/components/ui/toaster";
import { Heading } from "@/components/heading";
import { GameDataProvider } from "@/context/game-data-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TSM",
  description: "Toxic Solo Merda team",
  icons: {
    icon: [
      {
        url: "/images/tsm3.jpg",
        href: "/images/tsm3.jpg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();
  return (
    <ClerkProvider>
      <GameDataProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={inter.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              <main className=" flex flex-col min-h-screen bg-secondary">
                <Navbar />
                <section className="flex-grow">
                  <Container>
                    {children}
                    {!userId && <Heading />}
                  </Container>
                </section>
              </main>
            </ThemeProvider>
          </body>
        </html>
      </GameDataProvider>
    </ClerkProvider>
  );
}
