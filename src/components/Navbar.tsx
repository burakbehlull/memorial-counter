'use client';

import Link from 'next/link';
import { Github } from 'lucide-react';
import { ModeToggle } from "@/components/mode-toggle";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border h-16 flex items-center justify-between px-6 md:px-12 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-800 dark:from-white dark:via-zinc-400 dark:to-zinc-600 transition-all duration-300">
          Hırtlar tarafından öldürülenlerin hatırasına
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        <Link 
          href="https://github.com" 
          target="_blank" 
          className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors text-muted-foreground"
        >
          <Github size={24} />
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
