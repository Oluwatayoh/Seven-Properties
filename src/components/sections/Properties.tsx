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


const propertyImages = [
  {
    id: 'ikoyi-residence',
    imageUrl: 'https://images.unsplash.com/photo-1597285112431-115a1f48bde2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxsdXh1cnklMjBhcGFydG1lbnR8ZW58MHx8fHwxNzYyOTUzNzE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'luxury apartment',
  },
  {
    id: 'banana-island-villa',
    imageUrl: 'https://images.unsplash.com/photo-1708113388262-17fdf0e21205?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaXZpbmdyb29tfGVufDB8fHx8MTc2MzAwNjk3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'modern livingroom',
  },
  {
    id: 'vi-penthouse',
    imageUrl: 'https://images.unsplash.com/photo-1705095605806-4b2936e90471?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8cm9vZnRvcCUyMHRlcnJhY2V8ZW58MHx8fHwxNzYyOTg2ODQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'rooftop terrace',
  },
];


export default function Properties() {
  const firestore = useFirestore();
  const collectionsQuery = useMemo(() => collection(firestore, 'propertyCollections'), [firestore]);
  const { data: collections, isLoading } = useCollection<PropertyCollection>(collectionsQuery);

  if (isLoading) {
    return (
      <AnimatedSection className="py-24 sm:py-32 bg-primary/5">
        <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-headline text-4xl text-primary">Our Signature Residences</h2>
              <p className="mt-6 font-body text-lg leading-8 text-foreground/80 max-w-2xl mx-auto">
                Loading our curated selection of properties...
              </p>
            </div>
        </div>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection className="py-24 sm:py-32 bg-primary/5">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-4xl text-primary">Our Signature Residences</h2>
          <p className="mt-6 font-body text-lg leading-8 text-foreground/80 max-w-2xl mx-auto">
            A curated selection of properties in Lagos' most prestigious neighborhoods, each offering a unique statement of luxury.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {collections?.map((prop: WithId<PropertyCollection>) => {
            const image = propertyImages.find((img) => img.id === prop.id) ?? propertyImages.find(img => img.id === 'ikoyi-residence');
            return (
              <Card key={prop.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border-accent/20 bg-card flex flex-col">
                <CardHeader className="p-0">
                  {image && (
                    <div className="relative h-64 w-full">
                      <Image
                        src={image.imageUrl}
                        alt={prop.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        data-ai-hint={image.imageHint}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <CardTitle className="font-headline text-2xl text-primary">{prop.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 pt-2 text-accent font-body">
                      <MapPin className="h-4 w-4" />
                      {prop.location}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div className="flex flex-wrap gap-2">
                    {prop.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-accent/10 text-accent border-accent/20 font-body">{tag}</Badge>
                    ))}
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
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
