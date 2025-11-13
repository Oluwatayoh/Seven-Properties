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
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex flex-1">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-accent" />
            <span className="font-bold font-headline text-lg text-primary">Seven Properties</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/about"
              className={cn(
                'transition-colors hover:text-primary',
                pathname === '/about' ? 'text-primary' : 'text-foreground/80'
              )}
            >
              About Us
            </Link>
            <Link
              href="/#contact-us"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
          </nav>
        </div>
        <nav className="flex items-center">
          {user ? (
            <Link href="/admin" className="flex items-center space-x-2 text-sm font-medium text-foreground/80 hover:text-primary">
              <Shield className="h-5 w-5" />
              <span>Admin</span>
            </Link>
          ) : (
             <Link href="/login" className="flex items-center space-x-2 text-sm font-medium text-foreground/80 hover:text-primary">
              <span>Login</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
