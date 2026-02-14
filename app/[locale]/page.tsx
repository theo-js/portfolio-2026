import { PageBackground } from '@/components/layout/PageBackground';
import { TopBar } from '@/components/layout/TopBar';
import { AboutSection } from '@/components/section/sections/About';
import { ContactSection } from '@/components/section/sections/Contact';
import { HomeSection } from '@/components/section/sections/Home';
import { ProjectsSection } from '@/components/section/sections/Projects';
import { SkillsSection } from '@/components/section/sections/Skills';

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
