
'use client';

import { Building2, Shield } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/firebase/auth/use-user';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Header() {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex flex-1">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Building2 className="h-7 w-7 text-accent" />
            <span className="font-bold font-headline text-xl text-primary tracking-tight">SEVEN PROPERTIES</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link
              href="/about"
              className={cn(
                'transition-colors hover:text-primary',
                pathname === '/about' ? 'text-primary' : 'text-foreground/80'
              )}
            >
              ABOUT US
            </Link>
            <Link
              href="/#contact-us"
              className="text-foreground/80 hover:text-primary transition-colors uppercase"
            >
              ADVISORY
            </Link>
          </nav>
        </div>
        <nav className="flex items-center gap-4">
          {user ? (
            <Link href="/admin" className="flex items-center space-x-2 text-sm font-medium text-foreground/80 hover:text-primary">
              <Shield className="h-5 w-5 text-accent" />
              <span className="uppercase tracking-tighter">Admin</span>
            </Link>
          ) : (
             <Link href="/login" className="text-xs uppercase font-bold text-foreground/60 hover:text-primary tracking-widest">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
