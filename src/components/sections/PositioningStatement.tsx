
'use client';

import { ShieldCheck, CheckCircle2, Scale } from 'lucide-react';

export default function PositioningStatement() {
  const features = [
    { title: "Verified", icon: ShieldCheck },
    { title: "Developer-backed", icon: CheckCircle2 },
    { title: "Legally & Structurally Sound", icon: Scale }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-headline text-3xl md:text-5xl text-primary leading-tight">
            At Seven Properties, we eliminate uncertainty from property acquisition in Nigeria.
          </h2>
          <p className="mt-8 font-body text-xl text-foreground/70">
            Every listing is:
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="flex flex-col items-center gap-4 p-6 border border-accent/10 rounded-xl bg-card">
                <f.icon className="h-10 w-10 text-accent" />
                <span className="font-headline text-xl text-primary font-semibold">{f.title}</span>
              </div>
            ))}
          </div>
          <p className="mt-12 font-body text-lg text-primary font-bold italic">
            "We don’t market everything. We present only what is worth owning."
          </p>
        </div>
      </div>
    </section>
  );
}
