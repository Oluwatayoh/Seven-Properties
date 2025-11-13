'use client';

import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase/config';

function initializeFirebase() {
  const isInitialized = getApps().length > 0;
  const app = isInitialized ? getApp() : initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  return { app, auth, firestore, isInitialized };
}

export { initializeFirebase };

export * from './provider';
export * from './client-provider';
export * from './auth/use-user';
