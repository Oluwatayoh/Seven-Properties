'use client';

import { useUser } from '@/firebase/auth/use-user';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { getAuth, signOut } from 'firebase/auth';
import { Loader2 } from 'lucide-react';
import ManageCollections from '@/components/admin/ManageCollections';

function AdminDashboard() {
  const { user } = useUser();
  
  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-6 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="font-headline text-4xl text-primary">Admin Dashboard</h1>
        {user && (
          <div className="flex items-center gap-4">
            <span className="font-body text-foreground/80">Welcome, {user.displayName || user.email}</span>
            <Button onClick={handleSignOut} variant="outline" size="sm">Sign Out</Button>
          </div>
        )}
      </div>
      <ManageCollections />
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
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
      <main className="flex-1 bg-muted/20">
        <AdminDashboard />
      </main>
      <Footer />
    </div>
  );
}
