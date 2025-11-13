import { Building2, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-accent" />
              <span className="font-bold font-headline text-2xl">Seven Properties</span>
            </div>
            <p className="font-body text-base text-primary-foreground/80">
              Bespoke luxury residences for the discerning individual.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-primary-foreground/80 hover:text-accent">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            {/* Can add more footer links here if needed */}
          </div>
        </div>
        <div className="mt-12 border-t border-primary-foreground/20 pt-8">
          <p className="text-base text-primary-foreground/80 xl:text-center font-body">
            &copy; {new Date().getFullYear()} Seven Properties Bespoke. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
