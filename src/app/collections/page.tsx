'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Properties from '@/components/sections/Properties';
import { AnimatedSection } from '@/components/AnimatedSection';

export default function CollectionsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <AnimatedSection id="collections" className="py-24 sm:py-32">
            <Properties />
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}
