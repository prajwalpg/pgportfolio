import Navbar from "@/components/portfolio/Navbar";
import ScrollProgress from "@/components/portfolio/ScrollProgress";
import SystemInitializer from "@/components/portfolio/SystemInitializer";
import CustomAICursor from "@/components/portfolio/CustomAICursor";
import AISystemStatusPill from "@/components/portfolio/AISystemStatusPill";
import KnowledgeGraphOverlay from "@/components/portfolio/KnowledgeGraphOverlay";
import { InferenceModeProvider } from "@/components/portfolio/InferenceModeContext";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import AIPlayground from "@/components/portfolio/AIPlayground";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Experience from "@/components/portfolio/Experience";
import Education from "@/components/portfolio/Education";
import Achievements from "@/components/portfolio/Achievements";
import Certifications from "@/components/portfolio/Certifications";
import Resume from "@/components/portfolio/Resume";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

export default function Home() {
  return (
    <InferenceModeProvider>
      <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#08080f] text-white">
        <SystemInitializer />
        <CustomAICursor />
        <AISystemStatusPill />
        <KnowledgeGraphOverlay />
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">
          <Hero />
          <About />
          <AIPlayground />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Achievements />
          <Certifications />
          <Resume />
          <Contact />
        </main>
        <Footer />
      </div>
    </InferenceModeProvider>
  );
}
