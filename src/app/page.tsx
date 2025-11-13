import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Properties from '@/components/sections/Properties';
import Diaspora from '@/components/sections/Diaspora';
import KeywordTool from '@/components/sections/KeywordTool';
import ContactUs from '@/components/sections/ContactUs';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Properties />
        <Diaspora />
        <ContactUs />
        <KeywordTool />
      </main>
      <Footer />
    </div>
  );
}
