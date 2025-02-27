import Hero from "@/components/hero";
import LandingPage from "@/components/landing-page";
import FAQCarousel from "@/components/faqs";

export default function Home() {
  const faqs = [
    {
      id: 1,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers. For enterprise customers, we also offer invoicing options with net-30 payment terms."
    },
    {
      id: 2,
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking the 'Forgot Password' link on the login page. We'll send a password reset link to your registered email address."
    },
    {
      id: 3,
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. Go to Account Settings > Subscription and click 'Cancel Subscription'. You'll still have access until the end of your billing period."
    },
    {
      id: 4,
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee for all our subscription plans. If you're not satisfied, contact our support team within 30 days of purchase for a full refund."
    },
    {
      id: 5,
      question: "How do I contact customer support?",
      answer: "Our customer support team is available 24/7 via live chat on our website, email at support@example.com, or by phone at (555) 123-4567."
    },
    {
      id: 6,
      question: "What is your privacy policy?",
      answer: "We take your privacy seriously. We never sell your personal data to third parties. You can read our full privacy policy on our website under the Legal section."
    },
    {
      id: 7,
      question: "How do I update my billing information?",
      answer: "You can update your billing information by going to Account Settings > Billing and clicking 'Edit Payment Method'."
    }
  ];

  return (
    <main className="">
      <LandingPage />
      <Hero />
      <div className="py-4 md:py-8">
        <FAQCarousel faqs={faqs} />
      </div>
    </main>
  );
}
