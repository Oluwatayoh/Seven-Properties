
'use client';

import { Button } from '@/components/ui/button';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section id="contact-us" className="py-24 bg-primary text-white">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <h2 className="font-headline text-4xl md:text-6xl mb-8">Ready to Proceed with Confidence?</h2>
        <p className="font-body text-xl md:text-2xl text-neutral-300 mb-12 max-w-2xl mx-auto">
          Speak directly with our advisory team to secure your future in Nigeria's prime real estate.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          <div className="flex flex-col items-center gap-4 p-6 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
            <Mail className="h-8 w-8 text-accent" />
            <span className="font-body text-lg">info@sevenproperties.ng</span>
          </div>
          <div className="flex flex-col items-center gap-4 p-6 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
            <MessageCircle className="h-8 w-8 text-accent" />
            <span className="font-body text-lg">WhatsApp: +234 (800) 123-4567</span>
          </div>
          <div className="flex flex-col items-center gap-4 p-6 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
            <Phone className="h-8 w-8 text-accent" />
            <span className="font-body text-lg">Direct: +234 (800) 765-4321</span>
          </div>
        </div>

        <div className="space-y-8">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-body px-12 py-8 text-xl" asChild>
                <Link href="#">Schedule a Private Consultation</Link>
            </Button>
            <div className="pt-12 border-t border-white/10 max-w-3xl mx-auto">
                <h3 className="font-headline text-2xl mb-4 text-accent">Limited Access. High Demand.</h3>
                <p className="font-body text-lg text-neutral-300 italic">
                    All our developments are low inventory, high demand, and positioned for long-term value. Availability changes quickly.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
}
