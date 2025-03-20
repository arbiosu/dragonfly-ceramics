import Hero from "@/components/hero";
import LandingPage from "@/components/landing-page";
import { FAQHorizontalScroll} from "@/components/faqs";

export default function Home() {
  const faqs = [
    {
      id: 1,
      question: "What if my purchase is damaged or delayed?",
      answer: "All products are packaged with love and care and I ship them out ASAP with a tracking number. However, if your piece comes damaged, please email me photos within 3 days of arrival. I will try my best to replace the item with something similar or a full or partial refund can be given."
    },
    {
      id: 2,
      question: "Where do you ship?",
      answer: "As of now, I only ship in the United States but hope to eventually expand internationally!"
    },
    {
      id: 3,
      question: "How do I take care of my Pottery?",
      answer: "All of my pieces are dishwasher and microwave safe! However, I always recommend handwashing. Pieces that are not dishwasher and microwave safe will be labeled in the description of the piece."
    },
    {
      id: 4,
      question: "Do you accept returns?",
      answer: "Please make your purchases carefully as all sales are final. I only accept returns if the wrong item was shipped to you."
    },
    {
      id: 5,
      question: "When do you restock?",
      answer: "I have no particular schedule for restocks. As long as you are following my socials and/or signed up for my newsletter, you will be alerted when a drop happens!"
    },
    {
      id: 6,
      question: "How do I purchase a custom or wholesale order?",
      answer: "Please fill out the form under the “contact” page and allow up to 72 hours for me to respond!"
    }
  ];

  return (
    <main className="">
      <LandingPage />
      <Hero />
      <div className="py-8 md:py-12 bg-gradient-to-b from-df-bg via-dfNew2 to-dfNew2">
        <FAQHorizontalScroll faqs={faqs} />
      </div>
      <div className="py-8 bg-gradient-to-t from-df-bg via-dfNew2 to-dfNew2"></div>
    </main>
  );
}
