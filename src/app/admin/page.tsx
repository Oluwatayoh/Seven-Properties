'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { getAuth, signOut } from 'firebase/auth';

function AdminDashboard() {
  const { user, loading } = useUser();
  
  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="container mx-auto px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline text-4xl text-primary">Admin Dashboard</h1>
        {user && (
          <div className="flex items-center gap-4">
            <span className="font-body text-foreground/80">Welcome, {user.displayName || user.email}</span>
            <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
          </div>
        )}
      </div>
      <div className="bg-card p-8 rounded-lg shadow-lg border-accent/20">
        <h2 className="font-headline text-2xl text-primary mb-4">Manage Properties</h2>
        <p className="font-body text-foreground/80">
          Here you will be able to add, update, and delete property collections and individual property listings.
        </p>
        <div className="mt-8 text-center py-16 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground font-body">Management components coming soon.</p>
        </div>
      </div>
    </div>
  );
}


export default function AdminPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Header />
            <main className="flex-1 flex items-center justify-center">
                <p>Loading...</p>
            </main>
            <Footer />
        </div>
    );
  }

  if (!user) {
    return null; 
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <AdminDashboard />
      </main>
      <Footer />
    </div>
  );
}
