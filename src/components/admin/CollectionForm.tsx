'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long.'),
  location: z.string().min(2, 'Location is required.'),
  description: z.string().min(10, 'Description is required.'),
  tags: z.string().optional(),
});

export type CollectionFormState = z.infer<typeof formSchema>;

interface CollectionFormProps {
  onSubmit: (data: CollectionFormState) => void;
  onCancel: () => void;
  initialData?: Partial<CollectionFormState>;
}

export function CollectionForm({ onSubmit, onCancel, initialData }: CollectionFormProps) {
  const form = useForm<CollectionFormState>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || '',
      location: initialData?.location || '',
      description: initialData?.description || '',
      tags: initialData?.tags || '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded-lg bg-background">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., The Ikoyi Collection" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Ikoyi, Lagos" {...field} />
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
                <Textarea placeholder="A short description of the collection." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Investment Grade, Waterfront" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button type="submit">{initialData ? 'Save Changes' : 'Create Collection'}</Button>
        </div>
      </form>
    </Form>
  );
}
