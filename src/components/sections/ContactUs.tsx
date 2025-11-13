'use client';

import React from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Mail, Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type FormState = {
  message: string;
  success?: boolean;
};

const initialState: FormState = {
  message: '',
};

async function handleContactSubmit(prevState: FormState, formData: FormData): Promise<FormState> {
  // Here you would typically send the form data to your backend or a service like Formspree
  console.log({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  // Simulate a network request
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In a real app, handle success/error from the API call
  const success = true; 

  if (success) {
    return {
      message: "Thank you for your message! We'll be in touch soon.",
      success: true,
    };
  } else {
    return {
      message: 'Sorry, there was an error sending your message. Please try again.',
      success: false,
    };
  }
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto bg-primary hover:bg-primary/90">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Send Message
        </>
      )}
    </Button>
  );
}

export default function ContactUs() {
  const [state, formAction] = useActionState(handleContactSubmit, initialState);
  const { toast } = useToast();
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Message Sent!' : 'Oops!',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
      if (state.success) {
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  return (
    <>
      <AnimatedSection id="contact-us" className="py-24 sm:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <Card className="max-w-3xl mx-auto shadow-lg border-accent/20 bg-card">
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="flex-shrink-0 bg-primary text-accent rounded-full p-3">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="font-headline text-2xl text-primary">Get in Touch</CardTitle>
                  <CardDescription className="font-body mt-1">
                    Have a question or want to schedule a private viewing? Fill out the form below and we'll get back to you.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <form action={formAction} ref={formRef}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-body">Full Name</Label>
                    <Input id="name" name="name" type="text" placeholder="John Doe" required className="font-body bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-body">Email Address</Label>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" required className="font-body bg-background" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="font-body">Message</Label>
                  <Textarea id="message" name="message" placeholder="Your message..." required className="min-h-32 font-body bg-background" />
                </div>
                 <div className="flex justify-end">
                    <SubmitButton />
                </div>
              </CardContent>
            </form>
          </Card>
        </div>
      </AnimatedSection>
      <AnimatedSection>
          <div className="h-[400px] w-full bg-muted">
             <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63426.24831627581!2d3.398642578508434!3d6.444985655523072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9a87f36743964b!2sIkoyi%2C%20Lagos%20106104%2C%20Lagos!5e0!3m2!1sen!2sng!4v1721833502852!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
             ></iframe>
          </div>
      </AnimatedSection>
    </>
  );
}
