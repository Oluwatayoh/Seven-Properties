
'use client';

const steps = [
  {
    number: "01",
    title: "Consultation",
    description: "We understand your needs and investment goals"
  },
  {
    number: "02",
    title: "Curated Selection",
    description: "Only relevant, verified options are presented"
  },
  {
    number: "03",
    title: "Due Diligence & Advisory",
    description: "Full clarity before commitment"
  },
  {
    number: "04",
    title: "Acquisition & Support",
    description: "Secure purchase and ongoing assistance"
  }
];

export default function Process() {
  return (
    <section className="py-24 bg-background border-t border-accent/10">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl md:text-5xl text-primary">How It Works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="text-6xl font-headline text-accent/20 group-hover:text-accent/40 transition-colors mb-4">
                {step.number}
              </div>
              <h3 className="font-headline text-2xl text-primary mb-4">{step.title}</h3>
              <p className="font-body text-lg text-foreground/70">{step.description}</p>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-6 w-12 h-[1px] bg-accent/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
