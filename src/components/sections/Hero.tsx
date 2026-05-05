
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/AnimatedSection';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0 scale-110">
            <Image
                src="https://picsum.photos/seed/luxury-lagos/1800/1200"
                alt="Luxurious Nigerian residence"
                fill
                className="object-cover"
                priority
                data-ai-hint="luxury mansion"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
      
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <AnimatedSection as="div" className="max-w-4xl mx-auto">
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl drop-shadow-lg leading-tight">
              Acquire Prime Real Estate in Nigeria—With Absolute Confidence
            </h1>
            <p className="mt-6 font-body text-xl md:text-2xl text-neutral-200 drop-shadow-md max-w-2xl mx-auto">
              Curated luxury residences in Ikoyi and Victoria Island, delivered by Nigeria’s most reputable developers.
            </p>
            <p className="mt-4 font-body text-sm md:text-base text-accent italic uppercase tracking-widest">
              For Nigerians abroad. For expatriates. For investors who require certainty.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-body px-8 py-6 text-lg" asChild>
                    <Link href="/#contact-us">Schedule a Private Consultation</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black font-body px-8 py-6 text-lg" asChild>
                    <Link href="/collections">View Available Residences</Link>
                </Button>
            </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
