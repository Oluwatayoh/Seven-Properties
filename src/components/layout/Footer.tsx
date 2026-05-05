
import { Building2, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container mx-auto py-16 px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-accent" />
              <span className="font-bold font-headline text-2xl tracking-tighter">SEVEN PROPERTIES</span>
            </div>
            <p className="font-body text-base text-primary-foreground/80 leading-relaxed">
              Nigeria's premier luxury real estate advisory, connecting high-net-worth individuals with verified, elite residences in Lagos.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold text-accent uppercase tracking-widest mb-6">Explore</h3>
            <ul className="space-y-4 font-body text-primary-foreground/80">
              <li><a href="/collections" className="hover:text-white transition-colors">Residences</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">Our Pedigree</a></li>
              <li><a href="/#contact-us" className="hover:text-white transition-colors">Advisory Service</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold text-accent uppercase tracking-widest mb-6">Locations</h3>
            <ul className="space-y-4 font-body text-primary-foreground/80">
              <li>Ikoyi, Lagos</li>
              <li>Victoria Island, Lagos</li>
              <li>Banana Island, Lagos</li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold text-accent uppercase tracking-widest mb-6">Contact</h3>
            <div className="space-y-4 font-body text-primary-foreground/80">
              <p>123 Luxury Avenue, Ikoyi<br/>Lagos, Nigeria</p>
              <p>Phone: +234 (800) 123-4567</p>
              <p>Email: info@sevenproperties.ng</p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-primary-foreground/60 font-body">
            &copy; {new Date().getFullYear()} Seven Properties Nigeria Limited. All rights reserved. Registered in Nigeria.
          </p>
        </div>
      </div>
    </footer>
  );
}
