import Image from 'next/image';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AIFeaturesSection from './components/AIFeaturesSection';
import FeaturesSection from './components/FeaturesSection';
import { CTASection } from './components/CTASection'; // Keep this as named import since it works
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AIFeaturesSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}