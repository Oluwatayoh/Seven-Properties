
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const developments = [
  {
    name: "10 Queens Drive, Ikoyi",
    tagline: "Ultra-Exclusive Residences",
    details: ["Total Units: 6", "Floors: 5", "Available: Floors 3, 4, 5"],
    positioning: "A rare, low-density development for buyers who value privacy and scale.",
    image: "https://picsum.photos/seed/queens/800/600",
    ctas: ["Request Pricing", "Request Floor Plans"]
  },
  {
    name: "16 Alexander Tower, Ikoyi",
    tagline: "Elevated City Living",
    details: ["Total Units: 42", "Floors: 21", "Available: Floors 2–5"],
    positioning: "A refined residential tower combining location, elevation, and functionality.",
    image: "https://picsum.photos/seed/alexander/800/600",
    ctas: ["View Availability", "Book Inspection"]
  },
  {
    name: "Quantum Luxury Tower, Victoria Island",
    tagline: "Prime Waterfront Axis",
    details: ["Total Units: 46", "Floors: 25", "Available: Floors 3–5"],
    positioning: "A statement address in the heart of Victoria Island.",
    image: "https://picsum.photos/seed/quantum/800/600",
    ctas: ["Book Private Viewing", "Request Investment Brief"]
  }
];

export default function FeaturedDevelopments() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl md:text-5xl text-primary">Featured Developments</h2>
        </div>
        <div className="space-y-16">
          {developments.map((dev, idx) => (
            <div key={idx} className={`flex flex-col lg:flex-row gap-12 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="w-full lg:w-1/2 relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src={dev.image} 
                  alt={dev.name} 
                  fill 
                  className="object-cover"
                  data-ai-hint="luxury architecture"
                />
              </div>
              <div className="w-full lg:w-1/2 space-y-6">
                <Badge variant="outline" className="border-accent text-accent uppercase tracking-widest">{dev.tagline}</Badge>
                <h3 className="font-headline text-3xl md:text-4xl text-primary">{dev.name}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-accent/10 py-6">
                  {dev.details.map((detail, i) => (
                    <div key={i} className="font-body text-sm font-semibold text-primary">{detail}</div>
                  ))}
                </div>
                <p className="font-body text-xl text-foreground/70 italic leading-relaxed">
                  "{dev.positioning}"
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  {dev.ctas.map((cta, i) => (
                    <Button key={i} variant={i === 0 ? "default" : "outline"} size="lg" className={i === 0 ? "bg-primary" : "border-primary text-primary"}>
                      {cta}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
