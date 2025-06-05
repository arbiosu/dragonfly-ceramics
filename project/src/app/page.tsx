import { HeroSection } from '@/components/hero';
import LandingPage from '@/components/landing-page';
import SubscribePage from '@/components/subscribe-page';
import FAQPage from '@/components/faq-page';

export default function Home() {
  return (
    <main>
      <LandingPage />
      <HeroSection />
      <SubscribePage />
      <FAQPage />
    </main>
  );
}
