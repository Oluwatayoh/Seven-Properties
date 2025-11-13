import Image from 'next/image';
import { AnimatedSection } from '@/components/AnimatedSection';

export default function Diaspora() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
          <div>
            <h2 className="font-headline text-4xl text-primary">An Investment in Your Heritage</h2>
            <p className="mt-6 font-body text-lg leading-8 text-foreground/80">
              For our clients in the diaspora, Seven Properties offers a seamless and secure pathway to invest in Nigeria's most valuable real estate. We provide comprehensive support, from virtual tours to legal counsel, ensuring your investment is not just profitable, but a proud addition to your legacy.
            </p>
            <ul className="mt-8 space-y-4 font-body text-foreground/80">
              <li className="flex gap-x-3">
                <span className="text-accent font-bold">✓</span>
                <span>Dedicated diaspora concierge service.</span>
              </li>
              <li className="flex gap-x-3">
                <span className="text-accent font-bold">✓</span>
                <span>Robust capital appreciation and rental yields.</span>
              </li>
              <li className="flex gap-x-3">
                <span className="text-accent font-bold">✓</span>
                <span>A tangible connection to home.</span>
              </li>
            </ul>
          </div>
          <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl aspect-w-4 aspect-h-3">
            <Image
              src="https://picsum.photos/seed/diaspora/800/600"
              alt="A person on a video call looking at architectural plans"
              fill
              className="object-cover"
              data-ai-hint="business meeting"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
