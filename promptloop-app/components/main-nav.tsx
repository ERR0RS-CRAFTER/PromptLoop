"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { Button } from "./ui/button";

interface MainNavProps {
  dictionary: {
    navigation: {
      home: string;
      explore: string;
      categories: string;
      roadmap: string;
      create: string;
      login: string;
      signup: string;
      profile: string;
      settings: string;
      logout: string;
    };
  };
  isLoggedIn?: boolean;
}

export function MainNav({ dictionary, isLoggedIn = false }: MainNavProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const routes = [
    {
      href: "/",
      label: dictionary.navigation.home,
      active: pathname === "/",
    },
    {
      href: "/explore",
      label: dictionary.navigation.explore,
      active: pathname === "/explore",
    },
    {
      href: "/categories",
      label: dictionary.navigation.categories,
      active: pathname === "/categories",
    },
    {
      href: "/roadmap",
      label: dictionary.navigation.roadmap,
      active: pathname === "/roadmap",
    },
  ];

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-ninja text-2xl text-primary">PromptLoop</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.active
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <LanguageSwitcher />
        {isLoggedIn ? (
          <>
            <Button
              variant="ghost"
              size="sm"
              asChild
            >
              <Link href="/create">
                {dictionary.navigation.create}
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
            >
              <Link href="/profile">
                {dictionary.navigation.profile}
              </Link>
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              size="sm"
              asChild
            >
              <Link href="/login">
                {dictionary.navigation.login}
              </Link>
            </Button>
            <Button
              size="sm"
              asChild
            >
              <Link href="/signup">
                {dictionary.navigation.signup}
              </Link>
            </Button>
          </>
        )}
        
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 12h16M4 6h16M4 18h16" />
            )}
          </svg>
        </Button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-50 bg-background p-4 border-b shadow-lg md:hidden">
          <nav className="flex flex-col space-y-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  route.active
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <>
                <Link
                  href="/create"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {dictionary.navigation.create}
                </Link>
                <Link
                  href="/profile"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {dictionary.navigation.profile}
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {dictionary.navigation.login}
                </Link>
                <Link
                  href="/signup"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {dictionary.navigation.signup}
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
} 