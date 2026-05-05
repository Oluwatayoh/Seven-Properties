
import { collection, doc, getDocs, getDoc, setDoc, deleteDoc, addDoc, Firestore, CollectionReference, DocumentReference } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export type PropertyCollection = {
  id: string;
  title: string;
  location: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  imageHint?: string;
};

export type Property = {
  id: string;
  title: string;
  price: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  description: string;
  propertyType: 'Land' | 'Apartment' | 'Commercial' | 'Simplex' | 'Penthouse' | 'Duplex';
  totalUnits?: number;
  floors?: number;
  availableFloors?: string;
  positioningLine?: string;
  imageUrls: string[];
  imageHints: string[];
};


// --- Data Access Functions ---

const collectionsRef = (db: Firestore) => collection(db, 'propertyCollections') as CollectionReference<Omit<PropertyCollection, 'id'>>;
const collectionRef = (db: Firestore, id: string) => doc(db, 'propertyCollections', id) as DocumentReference<Omit<PropertyCollection, 'id'>>;

const propertiesRef = (db: Firestore, collectionId: string) => collection(db, 'propertyCollections', collectionId, 'properties') as CollectionReference<Omit<Property, 'id'>>;
const propertyRef = (db: Firestore, collectionId: string, propertyId: string) => doc(db, 'propertyCollections', collectionId, 'properties', propertyId) as DocumentReference<Omit<Property, 'id'>>;

// === Property Collection Functions ===

export const getPropertyCollections = async (db: Firestore): Promise<PropertyCollection[]> => {
  const snapshot = await getDocs(collectionsRef(db));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as Omit<PropertyCollection, 'id'> }));
};

export const getPropertyCollection = async (db: Firestore, id: string): Promise<PropertyCollection | null> => {
    const docSnap = await getDoc(collectionRef(db, id));
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() as Omit<PropertyCollection, 'id'> };
    }
    return null;
};

export const addPropertyCollection = (db: Firestore, data: Omit<PropertyCollection, 'id'>) => {
  return addDoc(collectionsRef(db), data)
    .catch(error => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: 'propertyCollections',
        operation: 'create',
        requestResourceData: data,
      }));
      throw error;
    });
};

export const updatePropertyCollection = (db: Firestore, id: string, data: Partial<Omit<PropertyCollection, 'id'>>) => {
  return setDoc(collectionRef(db, id), data, { merge: true })
    .catch(error => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: `propertyCollections/${id}`,
        operation: 'update',
        requestResourceData: data,
      }));
      throw error;
    });
};

export const deletePropertyCollection = (db: Firestore, id: string) => {
    return deleteDoc(collectionRef(db, id))
        .catch(error => {
            errorEmitter.emit('permission-error', new FirestorePermissionError({
                path: `propertyCollections/${id}`,
                operation: 'delete',
            }));
            throw error;
        });
};


// === Property Functions ===

export const getProperties = async (db: Firestore, collectionId: string): Promise<Property[]> => {
    const snapshot = await getDocs(propertiesRef(db, collectionId));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as Omit<Property, 'id'> }));
};

export const addProperty = (db: Firestore, collectionId: string, data: Omit<Property, 'id'>) => {
    return addDoc(propertiesRef(db, collectionId), data)
        .catch(error => {
            errorEmitter.emit('permission-error', new FirestorePermissionError({
                path: `propertyCollections/${collectionId}/properties`,
                operation: 'create',
                requestResourceData: data,
            }));
            throw error;
        });
};

export const updateProperty = (db: Firestore, collectionId: string, propertyId: string, data: Partial<Omit<Property, 'id'>>) => {
    return setDoc(propertyRef(db, collectionId, propertyId), data, { merge: true })
        .catch(error => {
            errorEmitter.emit('permission-error', new FirestorePermissionError({
                path: `propertyCollections/${collectionId}/properties/${propertyId}`,
                operation: 'update',
                requestResourceData: data,
            }));
            throw error;
        });
};

export const deleteProperty = (db: Firestore, collectionId: string, propertyId: string) => {
    return deleteDoc(propertyRef(db, collectionId, propertyId))
        .catch(error => {
            errorEmitter.emit('permission-error', new FirestorePermissionError({
                path: `propertyCollections/${collectionId}/properties/${propertyId}`,
                operation: 'delete',
            }));
            throw error;
        });
};
