
'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function Diaspora() {
  const points = [
    "Verified documentation",
    "Developer transparency",
    "Remote walkthroughs",
    "Structured payment guidance",
    "Legal alignment"
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="font-headline text-4xl md:text-5xl text-primary">Buying Property in Nigeria—Without the Risk</h2>
            <p className="font-body text-xl text-foreground/70 leading-relaxed">
              We understand the hesitation. That’s why our process is built for clarity and control. You don’t need to be present to make the right decision.
            </p>
            <ul className="space-y-4">
              {points.map((point, i) => (
                <li key={i} className="flex items-center gap-3 font-body text-lg text-primary">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
             <Image 
                src="https://picsum.photos/seed/diaspora-lagos/1000/800" 
                alt="Diaspora investment" 
                fill 
                className="object-cover"
                data-ai-hint="businessman travel"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-headline text-2xl italic">"An Investment in Your Heritage"</p>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
