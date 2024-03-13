"use client";

import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
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
    <div className="sticky px-3 top-0 border border-b-purple-500/20 bg-secondary z-10">
      <Container>
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src="/images/tsm3.jpg"
              alt="TSM logo"
              width={100}
              height={30}
              className="w-[30px] h-[30px]"
            />
            <div className="font-bold text-xl">Toxic Solo Merda</div>
          </div>
          <div className="flex gap-3 items-center">
            <div>
              <ThemeToggle />
              {userId && <NavMenu />}
            </div>
            <UserButton afterSignOutUrl="/" />
            {!userId && (
              <>
                <SignInButton mode="modal">
                  <Button variant="outline" size="sm">
                    Sign in
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm">Sign up</Button>
                </SignUpButton>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
