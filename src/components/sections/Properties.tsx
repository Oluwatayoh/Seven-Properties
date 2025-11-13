'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { useFirestore } from '@/firebase';
import { useCollection, WithId } from '@/firebase/firestore/use-collection';
import { collection } from 'firebase/firestore';
import { useMemo } from 'react';
import type { PropertyCollection } from '@/lib/properties-data';


const defaultImage = {
    imageUrl: 'https://picsum.photos/seed/default-prop/800/600',
    imageHint: 'modern building',
};


export default function Properties() {
  const firestore = useFirestore();
  const collectionsQuery = useMemo(() => collection(firestore, 'propertyCollections'), [firestore]);
  const { data: collections, isLoading } = useCollection<PropertyCollection>(collectionsQuery);

  if (isLoading) {
    return (
      <section className="py-24 sm:py-32 bg-primary/5">
        <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-headline text-4xl text-primary">Our Signature Residences</h2>
              <p className="mt-6 font-body text-lg leading-8 text-foreground/80 max-w-2xl mx-auto">
                Loading our curated selection of properties...
              </p>
            </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 sm:py-32 bg-primary/5">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-4xl text-primary">Our Signature Residences</h2>
          <p className="mt-6 font-body text-lg leading-8 text-foreground/80 max-w-2xl mx-auto">
            A curated selection of properties in Lagos' most prestigious neighborhoods, each offering a unique statement of luxury.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {collections?.map((prop: WithId<PropertyCollection>) => {
            return (
              <AnimatedSection key={prop.id} as="div">
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border-accent/20 bg-card flex flex-col h-full">
                  <CardHeader className="p-0">
                    <div className="relative h-64 w-full">
                      <Image
                        src={prop.imageUrl || defaultImage.imageUrl}
                        alt={prop.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        data-ai-hint={prop.imageHint || defaultImage.imageHint}
                      />
                    </div>
                    <div className="p-6">
                      <CardTitle className="font-headline text-2xl text-primary">{prop.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 pt-2 text-accent font-body">
                        <MapPin className="h-4 w-4" />
                        {prop.location}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <div>
                      <p className="font-body text-sm text-foreground/80 mb-4">{prop.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {prop.tags?.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-accent/10 text-accent border-accent/20 font-body">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/properties/${prop.id}`}>
                          View Collection <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
