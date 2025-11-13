import { AnimatedSection } from '@/components/AnimatedSection';
import { Gem, ShieldCheck, DraftingCompass } from 'lucide-react';

const features = [
  {
    name: 'Unrivaled Pedigree',
    description: 'Our legacy is built on a foundation of trust and a portfolio of architecturally significant properties.',
    icon: Gem,
  },
  {
    name: 'Absolute Security',
    description: 'We ensure peace of mind with state-of-the-art security systems and discreet, professional services.',
    icon: ShieldCheck,
  },
  {
    name: 'Architectural Excellence',
    description: 'Each property is a masterpiece, designed by world-renowned architects to be both iconic and timeless.',
    icon: DraftingCompass,
  },
];

export default function About() {
  return (
    <AnimatedSection id="about-us" className="py-24 sm:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-4xl text-primary">About Us</h2>
          <p className="mt-6 font-body text-lg leading-8 text-foreground/80 max-w-2xl mx-auto">
            Seven Properties is more than a developer; we are curators of an exclusive lifestyle. We cater to a discerning clientele who appreciate artistry, discretion, and unparalleled quality in the world's most dynamic city.
          </p>
        </div>
        <div className="mt-20">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon className="h-6 w-6 text-accent" aria-hidden="true" />
                  </div>
                  <span className="font-headline text-xl">{feature.name}</span>
                </dt>
                <dd className="mt-2 text-base leading-7 text-foreground/80 font-body">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </AnimatedSection>
  );
}
