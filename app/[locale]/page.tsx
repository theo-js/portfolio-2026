import { PageBackground } from '@/components/layout/PageBackground';
import { TopBar } from '@/components/layout/TopBar';
import { AboutSection } from '@/components/sections/About';
import { ContactSection } from '@/components/sections/Contact';
import { HomeSection } from '@/components/sections/Home';
import { ProjectsSection } from '@/components/sections/Projects';
import { SkillsSection } from '@/components/sections/Skills';

export default async function Home() {
  return (
    <div className="relative">
      <PageBackground className="z-0" />

      <div className="relative z-1">
        <TopBar />

        <>
          <HomeSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </>
      </div>
    </div>
  );
}
