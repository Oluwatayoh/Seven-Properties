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

const formSchema = z.object({
  title: z.string().min(3, 'Title is required.'),
  description: z.string().min(10, 'Description is required.'),
  price: z.string().min(1, 'Price is required.'),
  bedrooms: z.coerce.number().int().min(0, 'Must be a positive number.'),
  bathrooms: z.coerce.number().int().min(0, 'Must be a positive number.'),
  sqft: z.coerce.number().int().min(0, 'Must be a positive number.'),
  imageUrls: z.string().min(1, 'At least one image URL is required.'),
  imageHints: z.string().optional(),
});

export type PropertyFormState = z.infer<typeof formSchema>;

interface PropertyFormProps {
  onSubmit: (data: PropertyFormState) => void | Promise<void>;
  onCancel: () => void;
  initialData?: Partial<PropertyFormState>;
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
  const form = useForm<PropertyFormState>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: initialData?.title || '',
        description: initialData?.description || '',
        price: initialData?.price || '',
        bedrooms: initialData?.bedrooms || 0,
        bathrooms: initialData?.bathrooms || 0,
        sqft: initialData?.sqft || 0,
        imageUrls: Array.isArray(initialData?.imageUrls) ? initialData.imageUrls.join(', ') : '',
        imageHints: Array.isArray(initialData?.imageHints) ? initialData.imageHints.join(', ') : '',
    },
  });

  const { isSubmitting } = form.formState;

  const handleFormSubmit = async (data: PropertyFormState) => {
    await onSubmit(data);
  }

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
                name="imageUrls"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Image URLs (comma-separated)</FormLabel>
                    <FormControl>
                        <Textarea placeholder="https://picsum.photos/1, https://picsum.photos/2" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
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