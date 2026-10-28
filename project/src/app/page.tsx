import Hero from '@/components/hero';
import LandingPage from '@/components/landing-page';
import SubscribePage from '@/components/subscribe-page';
import FAQPage from '@/components/faq-page';

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default function Home() {
  return (
    <main>
      <LandingPage />
      <Hero />
      <SubscribePage />
      <FAQPage />
    </main>
  );
}
