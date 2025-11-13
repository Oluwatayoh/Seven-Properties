'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/AnimatedSection';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative h-screen w-full">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
                src="https://picsum.photos/seed/hero/1800/1200"
                alt="Luxurious modern home exterior"
                fill
                className="object-cover"
                priority
                data-ai-hint="luxury estate"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        </div>
      
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
        <AnimatedSection as="div" className="w-full">
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl drop-shadow-lg">
              Exclusivity, Redefined.
            </h1>
            <p className="mt-4 max-w-2xl mx-auto font-body text-lg md:text-xl text-neutral-200 drop-shadow-md">
              Discover Seven Properties—where architectural brilliance meets bespoke luxury in the heart of Lagos.
            </p>
            <Button size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 font-body" asChild>
              <Link href="/collections">Explore Residences</Link>
            </Button>
        </AnimatedSection>
      </div>
    </div>
  );
}
