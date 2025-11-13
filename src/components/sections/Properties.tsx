import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimatedSection } from '@/components/AnimatedSection';

const properties = [
  {
    id: 'ikoyi-residence',
    title: 'The Ikoyi Collection',
    location: 'Ikoyi, Lagos',
    tags: ['Investment Grade', 'Waterfront Views'],
  },
  {
    id: 'banana-island-villa',
    title: 'Banana Island Estates',
    location: 'Banana Island, Lagos',
    tags: ['Ultra-Luxury', 'Private Marina'],
  },
  {
    id: 'vi-penthouse',
    title: 'Victoria Island Penthouses',
    location: 'Victoria Island, Lagos',
    tags: ['Rooftop Terrace', 'Cityscape'],
  },
];

export default function Properties() {
  const propertyImages = PlaceHolderImages;

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
          {properties.map((prop) => {
            const image = propertyImages.find((img) => img.id === prop.id);
            return (
              <Card key={prop.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border-accent/20 bg-card">
                <CardHeader className="p-0">
                  {image && (
                    <div className="relative h-64 w-full">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
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
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {prop.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-accent/10 text-accent border-accent/20 font-body">{tag}</Badge>
                    ))}
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
