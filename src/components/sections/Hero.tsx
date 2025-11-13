'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/AnimatedSection';

export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-[-1]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          poster="https://picsum.photos/seed/hero/1800/1200"
        >
          <source src="https://videos.pexels.com/video-files/8053676/8053676-hd_1920_1080_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
