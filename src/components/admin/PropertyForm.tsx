'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import Image from 'next/image';

const formSchema = z.object({
  title: z.string().min(3, 'Title is required.'),
  description: z.string().min(10, 'Description is required.'),
  price: z.string().min(1, 'Price is required.'),
  bedrooms: z.coerce.number().int().min(0, 'Must be a positive number.'),
  bathrooms: z.coerce.number().int().min(0, 'Must be a positive number.'),
  sqft: z.coerce.number().int().min(0, 'Must be a positive number.'),
  propertyType: z.enum(['Land', 'Apartment', 'Commercial']),
  images: z.custom<FileList>().optional(),
  imageHints: z.string().optional(),
});

export type PropertyFormState = z.infer<typeof formSchema>;

interface PropertyFormProps {
  onSubmit: (data: PropertyFormState) => void | Promise<void>;
  onCancel: () => void;
  initialData?: Partial<Omit<PropertyFormState, 'images'> & { imageUrls: string[] }>;
}

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
    return (
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isSubmitting ? 'Saving...' : ( 'Save Property' )}
      </Button>
    );
  }

export function PropertyForm({ onSubmit, onCancel, initialData }: PropertyFormProps) {
  const [imagePreviews, setImagePreviews] = useState<string[]>(initialData?.imageUrls || []);

  const form = useForm<PropertyFormState>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: initialData?.title || '',
        description: initialData?.description || '',
        price: initialData?.price || '',
        bedrooms: initialData?.bedrooms || 0,
        bathrooms: initialData?.bathrooms || 0,
        sqft: initialData?.sqft || 0,
        propertyType: initialData?.propertyType || 'Apartment',
        imageHints: Array.isArray(initialData?.imageHints) ? initialData.imageHints.join(', ') : '',
    },
  });

  const { isSubmitting } = form.formState;

  const handleFormSubmit = async (data: PropertyFormState) => {
    await onSubmit(data);
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPreviews = Array.from(files).map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
      form.setValue('images', files);
    }
  };


  return (
    <Card>
        <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">
                {initialData ? 'Edit Property' : 'Add New Property'}
            </CardTitle>
            <CardDescription>
                Fill in the details for the property listing.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a property type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Apartment">Apartment</SelectItem>
                          <SelectItem value="Land">Land</SelectItem>
                          <SelectItem value="Commercial">Commercial Properties</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Property Title</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., The Ambrose Villa" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., ₦1.2B" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Detailed description of the property..." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="bedrooms"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bedrooms</FormLabel>
                            <FormControl>
                            <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bathrooms"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bathrooms</FormLabel>
                            <FormControl>
                            <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sqft"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Square Feet</FormLabel>
                            <FormControl>
                            <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                 <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Images</FormLabel>
                      <FormControl>
                        <Input type="file" multiple onChange={handleImageChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {imagePreviews.map((src, index) => (
                            <div key={index} className="relative aspect-video">
                                <Image src={src} alt={`Preview ${index + 1}`} fill className="object-cover rounded-md" />
                            </div>
                        ))}
                    </div>
                )}
                
                <FormField
                control={form.control}
                name="imageHints"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Image Hints (comma-separated)</FormLabel>
                    <FormControl>
                        <Input placeholder="modern mansion, luxury interior" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>Cancel</Button>
                <SubmitButton isSubmitting={isSubmitting} />
                </div>
            </form>
            </Form>
        </CardContent>
    </Card>
  );
}
