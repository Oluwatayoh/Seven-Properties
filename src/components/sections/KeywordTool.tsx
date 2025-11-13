'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { handleGenerateKeywords, type FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Wand2, Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const initialState: FormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto bg-primary hover:bg-primary/90">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Generate Keywords
        </>
      )}
    </Button>
  );
}

export default function KeywordTool() {
  const [state, formAction] = useFormState(handleGenerateKeywords, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.keywords && !state.issues) {
      toast({
        variant: 'destructive',
        title: 'Error Generating Keywords',
        description: state.message,
      });
    }
  }, [state, toast]);


  return (
    <AnimatedSection className="py-24 sm:py-32 bg-primary/5">
      <div className="container mx-auto px-6 lg:px-8">
        <Card className="max-w-3xl mx-auto shadow-lg border-accent/20 bg-card">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="flex-shrink-0 bg-primary text-accent rounded-full p-3">
                  <Wand2 className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="font-headline text-2xl text-primary">AI-Powered SEO Keyword Tool</CardTitle>
                <CardDescription className="font-body mt-1">
                  Enhance your property listings by generating low-competition keywords tailored for the Lagos luxury market.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <form action={formAction}>
            <CardContent>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="description" className="font-body text-base">Property Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="e.g., A stunning 5-bedroom waterfront villa in Banana Island with a private cinema and infinity pool..."
                  className="min-h-40 font-body bg-background"
                  required
                />
                {state.issues && (
                  <p className="text-sm font-medium text-destructive mt-1">
                    {state.issues[0]}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <SubmitButton />
            </CardFooter>
          </form>

          {state.keywords && state.keywords.length > 0 && (
            <div className="px-6 pb-6">
                <h3 className="font-headline text-lg mb-4 text-primary">Generated Keywords:</h3>
                <div className="flex flex-wrap gap-2">
                    {state.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="text-base font-body bg-accent/10 text-accent border-accent/20">
                            {keyword}
                        </Badge>
                    ))}
                </div>
            </div>
          )}
        </Card>
      </div>
    </AnimatedSection>
  );
}
