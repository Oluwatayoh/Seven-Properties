
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Building2, Eye, Plane, Route } from 'lucide-react';

const reasons = [
  {
    title: "Verified Developments Only",
    description: "No speculative projects. No unclear delivery timelines.",
    icon: ShieldCheck
  },
  {
    title: "Developer Credibility",
    description: "We work exclusively with proven builders with decades of execution.",
    icon: Building2
  },
  {
    title: "Transparent Advisory",
    description: "Clear pricing. Clear timelines. No hidden variables.",
    icon: Eye
  },
  {
    title: "Diaspora-Focused Process",
    description: "Remote acquisition support from inspection to documentation.",
    icon: Plane
  },
  {
    title: "End-to-End Guidance",
    description: "From selection to handover—and beyond.",
    icon: Route
  }
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl md:text-5xl text-primary">Why High-Net-Worth Buyers Choose Us</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <Card key={index} className="border-accent/10 hover:shadow-xl transition-shadow bg-card h-full">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <reason.icon className="text-accent h-6 w-6" />
                </div>
                <CardTitle className="font-headline text-2xl text-primary">{reason.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-body text-lg text-foreground/70">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
