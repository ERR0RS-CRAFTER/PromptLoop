"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { cn } from "@/utils";
import { supabase } from "@/lib/supabase";
import ThemeToggle from "./theme-toggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check for user session on mount
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };
    
    checkUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled
          ? "bg-white/80 dark:bg-dark-background/80 backdrop-blur-sm shadow-sm"
          : "bg-white dark:bg-dark-background"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary-500 dark:text-dark-primary">
                PromptLoop
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/prompts"
              className="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-dark-primary"
            >
              Browse
            </Link>
            <Link
              href="/categories"
              className="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-dark-primary"
            >
              Categories
            </Link>
            <Link
              href="/submit"
              className="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-dark-primary"
            >
              Submit
            </Link>
            <Link
              href="/ads"
              className="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-dark-primary"
            >
              Sponsors
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Icon */}
            <Link
              href="/prompts"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Search size={20} />
            </Link>
            
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Actions */}
            {user ? (
              <Link
                href="/dashboard"
                className="btn btn-primary"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="btn btn-primary"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-dark-background border-t dark:border-gray-800">
          <div className="container px-4 pt-2 pb-4 space-y-3">
            <Link
              href="/prompts"
              className="block py-2 text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-dark-primary"
              onClick={toggleMenu}
            >
              Browse
            </Link>
            <Link
              href="/categories"
              className="block py-2 text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-dark-primary"
              onClick={toggleMenu}
            >
              Categories
            </Link>
            <Link
              href="/submit"
              className="block py-2 text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-dark-primary"
              onClick={toggleMenu}
            >
              Submit
            </Link>
            <Link
              href="/ads"
              className="block py-2 text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-dark-primary"
              onClick={toggleMenu}
            >
              Sponsors
            </Link>
            
            <div className="flex items-center justify-between pt-4 border-t dark:border-gray-800">
              <ThemeToggle />
              
              {user ? (
                <Link
                  href="/dashboard"
                  className="btn btn-primary"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  className="btn btn-primary"
                  onClick={toggleMenu}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 