"use client";

import { SignInButton, useAuth } from "@clerk/nextjs";

import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";

export const Heading = () => {
  return (
    <div className="font-bold pt-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
        <h1>The best team of </h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-t from-yellow-300 to-yellow-900">
          <TypewriterComponent
            options={{
              strings: ["Wild rift", "Brazil", "South America"],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <div className="pt-5">
          <SignInButton mode="modal">
            <Button
              variant="premium"
              className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
            >
              Login now
            </Button>
          </SignInButton>
        </div>
      </div>
    </div>
  );
};
