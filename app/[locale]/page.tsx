import { AboutSection } from '@/components/section/sections/About';
import { ContactSection } from '@/components/section/sections/Contact';
import { HomeSection } from '@/components/section/sections/Home';
import { ProjectsSection } from '@/components/section/sections/Projects';
import { SkillsSection } from '@/components/section/sections/Skills';

export default function Home() {
  return (
    <main>
      <HomeSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
