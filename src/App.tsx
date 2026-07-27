import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Statistics from '@/components/Statistics';
import Features from '@/components/Features';
import Disclaimer from '@/components/Disclaimer';
import Footer from '@/components/Footer';
import SymptomChecker from '@/pages/SymptomChecker';
import AskAI from '@/pages/AskAI';
import HearingTests from '@/pages/HearingTests';
import HearingProtection from '@/pages/HearingProtection';
import About from '@/pages/About';

type Route = 'home' | 'symptom-checker' | 'ask-ai' | 'tests' | 'protection' | 'about';

function parseRoute(): Route {
  const hash = window.location.hash.replace(/^#/, '');
  if (hash.startsWith('/symptom-checker')) return 'symptom-checker';
  if (hash.startsWith('/ask-ai')) return 'ask-ai';
  if (hash.startsWith('/tests')) return 'tests';
  if (hash.startsWith('/protection')) return 'protection';
  if (hash.startsWith('/about')) return 'about';
  return 'home';
}

function App() {
  const [route, setRoute] = useState<Route>(parseRoute);

  useEffect(() => {
    const onHash = () => {
      setRoute(parseRoute());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar />
      <main>
        {route === 'symptom-checker' ? (
          <SymptomChecker />
        ) : route === 'ask-ai' ? (
          <AskAI />
        ) : route === 'tests' ? (
          <HearingTests />
        ) : route === 'protection' ? (
          <HearingProtection />
        ) : route === 'about' ? (
          <About />
        ) : (
          <>
            <Hero />
            <Statistics />
            <Features />
            <Disclaimer />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
