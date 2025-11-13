'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Property, PropertyCollection } from '@/lib/properties-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { BedDouble, Bath, Square, Loader2, Building } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useFirestore } from '@/firebase';
import { useDoc, useCollection, WithId } from '@/firebase';
import { doc, collection } from 'firebase/firestore';
import { useMemo } from 'react';

type Props = {
  params: {
    collectionId: string;
  };
};

export default function CollectionPage({ params: { collectionId } }: Props) {
  const firestore = useFirestore();

  const collectionQuery = useMemo(() => doc(firestore, 'propertyCollections', collectionId), [firestore, collectionId]);
  const { data: collectionData, isLoading: isCollectionLoading } = useDoc<PropertyCollection>(collectionQuery);

  const propertiesQuery = useMemo(() => collection(firestore, 'propertyCollections', collectionId, 'properties'), [firestore, collectionId]);
  const { data: properties, isLoading: arePropertiesLoading } = useCollection<Property>(propertiesQuery);


  if (isCollectionLoading || arePropertiesLoading) {
    return (
       <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
    </div>
    );
  }

  if (!collectionData) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <AnimatedSection className="py-24 sm:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h1 className="font-headline text-5xl md:text-7xl text-primary">{collectionData.title}</h1>
              <p className="mt-6 font-body text-lg leading-8 text-foreground/80 max-w-3xl mx-auto">
                {collectionData.description}
              </p>
            </div>
          </div>
        </AnimatedSection>
        
        <div className="container mx-auto px-6 lg:px-8 pb-24 sm:pb-32">
          <div className="space-y-16">
            {properties && properties.map((property: WithId<Property>, index: number) => (
              <AnimatedSection key={property.id}>
                <Card className="overflow-hidden shadow-lg border-accent/20 bg-card">
                  <div className="grid md:grid-cols-2">
                    <div className={index % 2 === 0 ? 'md:order-1' : 'md:order-2'}>
                       <Carousel className="w-full">
                        <CarouselContent>
                          {property.imageUrls.map((url, i) => (
                            <CarouselItem key={i}>
                              <div className="relative h-96 w-full">
                                <Image
                                  src={url}
                                  alt={`${property.title} - view ${i + 1}`}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                  className="object-cover"
                                  data-ai-hint={property.imageHints && property.imageHints[i] ? property.imageHints[i] : ''}
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-4" />
                        <CarouselNext className="absolute right-4" />
                      </Carousel>
                    </div>

                    <div className={`p-8 flex flex-col justify-center ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                      <CardHeader>
                        <CardTitle className="font-headline text-4xl text-primary">{property.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-body text-lg text-foreground/80 mb-6">{property.description}</p>
                        <div className="flex items-center space-x-6 text-foreground">
                            <div className="flex items-center space-x-2">
                                <Building className="h-5 w-5 text-accent"/>
                                <span className="font-body">{property.propertyType}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <BedDouble className="h-5 w-5 text-accent"/>
                                <span className="font-body">{property.bedrooms} Beds</span>
                            </div>
                             <div className="flex items-center space-x-2">
                                <Bath className="h-5 w-5 text-accent"/>
                                <span className="font-body">{property.bathrooms} Baths</span>
                            </div>
                             <div className="flex items-center space-x-2">
                                <Square className="h-5 w-5 text-accent"/>
                                <span className="font-body">{property.sqft.toLocaleString()} sqft</span>
                            </div>
                        </div>
                        <Separator className="my-6" />
                        <div>
                            <p className="text-sm font-body text-muted-foreground">Starting From</p>
                            <p className="font-headline text-3xl text-primary">{property.price}</p>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
             {(!properties || properties.length === 0) && (
                <div className="text-center py-16">
                    <h2 className="font-headline text-3xl text-primary">Coming Soon</h2>
                    <p className="mt-4 font-body text-lg text-foreground/80">
                        Properties for this collection will be unveiled shortly.
                    </p>
                </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
