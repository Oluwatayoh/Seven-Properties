'use client';

import React from 'react';
import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { FirebaseProvider } from '@/firebase/provider';
import { firebaseConfig } from '@/firebase/config';

let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

// Initialize Firebase on the client side
if (typeof window !== 'undefined') {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  auth = getAuth(app);
  firestore = getFirestore(app);
}

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // This is a safeguard for server-side rendering where Firebase is not initialized.
  // The actual Firebase functionality will only run on the client.
  if (!app) {
    return <>{children}</>;
  }

  return (
    <FirebaseProvider app={app} auth={auth} firestore={firestore}>
      {children}
    </FirebaseProvider>
  );
}
