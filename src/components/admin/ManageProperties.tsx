'use client';

import { useMemo, useState } from 'react';
import { collection } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { useCollection, WithId } from '@/firebase/firestore/use-collection';
import { Property, PropertyCollection, addProperty, updateProperty, deleteProperty } from '@/lib/properties-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowLeft, PlusCircle, Trash2, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PropertyForm, PropertyFormState } from './PropertyForm';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ManagePropertiesProps {
    collection: WithId<PropertyCollection>;
    onBack: () => void;
}

export default function ManageProperties({ collection: currentCollection, onBack }: ManagePropertiesProps) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [editingProperty, setEditingProperty] = useState<WithId<Property> | 'new' | null>(null);

  const propertiesQuery = useMemo(() => collection(firestore, 'propertyCollections', currentCollection.id, 'properties'), [firestore, currentCollection.id]);
  const { data: properties, isLoading, error } = useCollection<Property>(propertiesQuery);

  const handleFormSubmit = async (data: PropertyFormState) => {
    try {
      const propertyData = {
        ...data,
        bedrooms: Number(data.bedrooms),
        bathrooms: Number(data.bathrooms),
        sqft: Number(data.sqft),
        imageUrls: data.imageUrls.split(',').map(url => url.trim()).filter(Boolean),
        imageHints: data.imageHints.split(',').map(hint => hint.trim()).filter(Boolean),
      };

      if (editingProperty === 'new') {
        await addProperty(firestore, currentCollection.id, propertyData);
        toast({ title: 'Success', description: 'Property added.' });
      } else if (editingProperty) {
        await updateProperty(firestore, currentCollection.id, editingProperty.id, propertyData);
        toast({ title: 'Success', description: 'Property updated.' });
      }
      setEditingProperty(null);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'An error occurred.' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProperty(firestore, currentCollection.id, id);
      toast({ title: 'Success', description: 'Property deleted.' });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not delete property.' });
    }
  };

  if (editingProperty) {
      return <PropertyForm 
        onSubmit={handleFormSubmit}
        onCancel={() => setEditingProperty(null)}
        initialData={editingProperty === 'new' ? undefined : editingProperty}
      />
  }

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center gap-4'>
            <Button variant="outline" size="icon" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
                <CardTitle className="font-headline text-2xl text-primary">Manage: {currentCollection.title}</CardTitle>
                <CardDescription>Add, edit, or delete properties in this collection.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && <div className="flex justify-center items-center py-8"><Loader2 className="h-6 w-6 animate-spin" /></div>}
        
        <div className="space-y-4">
            {properties && properties.map(prop => (
                <div key={prop.id} className="flex items-center justify-between p-3 rounded-lg border bg-background hover:bg-muted/50 transition-colors">
                    <p className="font-semibold">{prop.title}</p>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => setEditingProperty(prop)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this property.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(prop.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                            </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            ))}
        </div>

        {(!properties || properties.length === 0) && !isLoading && (
            <p className="text-muted-foreground text-center py-8">No properties in this collection.</p>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={() => setEditingProperty('new')} variant="default">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Property
        </Button>
      </CardFooter>
    </Card>
  );
}
