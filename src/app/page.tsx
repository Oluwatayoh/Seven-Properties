
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import PositioningStatement from '@/components/sections/PositioningStatement';
import WhyUs from '@/components/sections/WhyUs';
import Properties from '@/components/sections/Properties';
import FeaturedDevelopments from '@/components/sections/FeaturedDevelopments';
import Diaspora from '@/components/sections/Diaspora';
import Process from '@/components/sections/Process';
import FinalCTA from '@/components/sections/FinalCTA';
import KeywordTool from '@/components/sections/KeywordTool';
import { AnimatedSection } from '@/components/AnimatedSection';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Hero />
        <AnimatedSection>
          <TrustBar />
        </AnimatedSection>
        <AnimatedSection>
          <PositioningStatement />
        </AnimatedSection>
        <AnimatedSection>
          <WhyUs />
        </AnimatedSection>
        <AnimatedSection>
          <Properties />
        </AnimatedSection>
        <AnimatedSection>
          <FeaturedDevelopments />
        </AnimatedSection>
        <AnimatedSection>
          <Diaspora />
        </AnimatedSection>
        <AnimatedSection>
          <Process />
        </AnimatedSection>
        <AnimatedSection>
          <FinalCTA />
        </AnimatedSection>
        <AnimatedSection>
          <KeywordTool />
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}
