"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { Container } from "./conatiner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { NavMenu } from "./nav-menu";

export const Navbar = () => {
  const router = useRouter();
  const { userId } = useAuth();

  return (
    <div className="sticky top-0 border border-b-purple-500/20 bg-secondary">
      <Container>
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src="/images/tsm-logo.png"
              alt="TSM logo"
              width="30"
              height="30"
            />
            <div className="font-bold text-xl">Toxic Solo Merda</div>
          </div>
          <div className="flex gap-3 items-center">
            <div>
              <ThemeToggle />
              <NavMenu />
            </div>
            <UserButton afterSignOutUrl="/" />
            {!userId && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/sign-in")}
                >
                  Sign in
                </Button>
                <Button size="sm" onClick={() => router.push("/sign-up")}>
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
