import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Properties from '@/components/sections/Properties';
import Diaspora from '@/components/sections/Diaspora';
import KeywordTool from '@/components/sections/KeywordTool';
import ContactUs from '@/components/sections/ContactUs';
import { AnimatedSection } from '@/components/AnimatedSection';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <div className="flex-1">
        <Hero />
        <div className="relative z-10 bg-background">
          <AnimatedSection>
            <Properties />
          </AnimatedSection>
          <AnimatedSection>
            <Diaspora />
          </AnimatedSection>
          <AnimatedSection>
            <ContactUs />
          </AnimatedSection>
          <AnimatedSection>
            <KeywordTool />
          </AnimatedSection>
        </div>
      </div>
      <Footer />
    </div>
  );
}
