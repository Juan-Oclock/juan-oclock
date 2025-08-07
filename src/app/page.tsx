import Hero from "@/components/Hero";
import About from "@/components/About";
import FreeTime from "@/components/FreeTime";
import Contact from "@/components/Contact";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ScrollProgress />
      <Hero />
      <About />
      <FreeTime />
      <Contact />
    </div>
  );
}
