import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

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
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className=" flex flex-col min-h-screen bg-secondary">
              <Navbar />
              <section className="flex-grow">{children}</section>
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
