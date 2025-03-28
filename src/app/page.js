import Image from 'next/image';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AIFeaturesSection } from './components/AIFeaturesSection';
import { FeaturesSection } from './components/FeaturesSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#BF9D30]/5 via-transparent to-transparent pointer-events-none"></div>
      <Navbar />
      <HeroSection />
      <AIFeaturesSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}