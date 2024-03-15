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
import { getRole } from "@/utils/roles";
import { RoleProvider } from "@/context/role-context";
import { Team } from "@/components/team";
import { ModalProvider } from "@/providers/modal-provider";

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
  const initialRole = getRole();

  return (
    <ClerkProvider>
      <GameDataProvider>
        <RoleProvider initialRole={initialRole}>
          <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
              <ModalProvider />
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Toaster />
                <main className=" flex flex-col  bg-secondary">
                  <Navbar />
                  <section className="min-h-screen">
                    <Container>
                      {userId === null ? (
                        <>
                          <Heading />
                          <Team />
                          <p className="italic text-sm text-center">
                            Developed by{" "}
                            <span className="font-bold">Railson Santiago</span>.
                            All rights reserved ©
                          </p>
                        </>
                      ) : (
                        <>{children}</>
                      )}
                    </Container>
                  </section>
                </main>
              </ThemeProvider>
            </body>
          </html>
        </RoleProvider>
      </GameDataProvider>
    </ClerkProvider>
  );
}
