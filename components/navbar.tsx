'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetTrigger 
} from '@/components/ui/sheet';
import { navigationLinks } from '@/lib/constants';
import { Menu, MonitorSmartphone, X } from 'lucide-react';
import { motion } from 'framer-motion';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link href="/" className="flex items-center space-x-2">
          <MonitorSmartphone className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Aivira</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href ? 'text-primary' : 'text-foreground/70'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border-0">
            <Link href="/pilot/login">Get Started</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader className="mb-4">
              <SheetTitle className="flex items-center space-x-2">
                <MonitorSmartphone className="h-5 w-5 text-primary" />
                <span>Aivira</span>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base py-2 px-4 rounded-md transition-colors hover:bg-accent ${
                    pathname === link.href ? 'bg-accent text-primary font-medium' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border-0">
                  <Link href="/pilot/login" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}