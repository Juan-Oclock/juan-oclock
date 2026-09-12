import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import PortfolioMotion from '@/components/PortfolioMotion';

export default function Home() {
  return (
    <PortfolioMotion>
      <div id="top" />
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main"><Hero /><About /><Projects /><Contact /></main>
      <Footer />
    </PortfolioMotion>
  );
}
