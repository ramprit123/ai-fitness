'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SignInButton, useAuth, useUser } from '@clerk/nextjs';
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  const [activeRoute, setActiveRoute] = useState("");

  useEffect(() => {
    // Get current path from window location
    const path = window.location.pathname;
    setActiveRoute(path);
  }, []);

  const isActive = (route: string) => {
    return activeRoute === route ? "text-primary font-bold" : "";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ms:mx-auto">
      <div className="container flex h-16 items-center justify-between mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.svg"
            alt="AI Fitness Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="hidden font-bold sm:inline-block">AI Fitness</span>
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {/* Sign In Button */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="/services"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/services")}`}
            >
              Services
            </Link>
            <Link
              href="/generate-program"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary }`,
                isActive("/generate-program") && "text-yellow font-bold"
              )}
            >
              Generate
            </Link>
          </nav>
          {isSignedIn ? (
            <>
              <div className="hidden sm:block">Welcome, {user?.firstName}</div>
              <Button
                variant="outline"
                onClick={() => signOut()}
                className="hidden sm:inline-flex"
              >
                Sign Out
              </Button>
              <Button
                variant="outline"
                onClick={() => signOut()}
                className="sm:hidden"
                size="icon"
              >
                <LogOutIcon className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <SignInButton />
            </>
          )}
        </div>
      </div>
    </header>
  );
};


const LogOutIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);
