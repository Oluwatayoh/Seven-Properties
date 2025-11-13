'use client';

import { useMemo, useState } from 'react';
import { collection } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { useCollection, WithId } from '@/firebase/firestore/use-collection';
import type { PropertyCollection } from '@/lib/properties-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, PlusCircle, Trash2 } from 'lucide-react';
import { CollectionForm, CollectionFormState } from './CollectionForm';
import { addPropertyCollection, deletePropertyCollection } from '@/lib/properties-data';
import { useToast } from '@/hooks/use-toast';
import ManageProperties from './ManageProperties';
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

export default function ManageCollections() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<WithId<PropertyCollection> | null>(null);

  const collectionsQuery = useMemo(() => collection(firestore, 'propertyCollections'), [firestore]);
  const { data: collections, isLoading } = useCollection<PropertyCollection>(collectionsQuery);

  const handleAddCollection = async (data: CollectionFormState) => {
    if (!data.title || !data.location || !data.description) return;
    try {
      await addPropertyCollection(firestore, {
        title: data.title,
        location: data.location,
        description: data.description,
        tags: data.tags.split(',').map(t => t.trim()).filter(Boolean),
      });
      toast({ title: 'Success', description: 'Property collection added.' });
      setIsAdding(false);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not add property collection.' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePropertyCollection(firestore, id);
      toast({ title: 'Success', description: 'Property collection deleted.' });
      if (selectedCollection?.id === id) {
          setSelectedCollection(null);
      }
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not delete property collection. Make sure all properties inside are deleted first.' });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (selectedCollection) {
      return <ManageProperties collection={selectedCollection} onBack={() => setSelectedCollection(null)} />
  }

  return (
    <div className="space-y-8">
       <Card className="bg-card">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary">Property Collections</CardTitle>
          <CardDescription>Manage your property groupings. Click a collection to manage its properties.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {collections && collections.map(col => (
            <div key={col.id} className="flex items-center justify-between p-4 rounded-lg border bg-background hover:bg-muted/50 transition-colors">
              <button onClick={() => setSelectedCollection(col)} className="text-left flex-grow">
                <h3 className="font-semibold text-lg">{col.title}</h3>
                <p className="text-sm text-muted-foreground">{col.location}</p>
              </button>
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
                      This action cannot be undone. This will permanently delete the collection.
                      You must delete all properties in this collection first.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(col.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
          {(!collections || collections.length === 0) && !isAdding && (
            <p className="text-muted-foreground text-center py-8">No collections found.</p>
          )}

          {isAdding && (
             <CollectionForm
                onSubmit={handleAddCollection}
                onCancel={() => setIsAdding(false)}
                />
          )}

        </CardContent>
        <CardFooter>
            {!isAdding && (
                 <Button onClick={() => setIsAdding(true)} variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Collection
                </Button>
            )}
        </CardFooter>
      </Card>
    </div>
  );
}
