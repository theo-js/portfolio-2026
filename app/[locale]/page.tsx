import { PageFooter } from '@/components/layout/Footer';
import { PageBackground } from '@/components/layout/PageBackground';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { TopBar } from '@/components/layout/TopBar';
import { AboutSection } from '@/components/section/sections/About';
import { ContactSection } from '@/components/section/sections/Contact';
import { HomeSection } from '@/components/section/sections/Home';
import { ProjectsSection } from '@/components/section/sections/Projects';
import { SkillsSection } from '@/components/section/sections/Skills';
import { Toaster } from '@/components/ui/sonner';
import { toasterBaseProps } from '@/core/theming/sonner';

export default async function Home() {
  return (
    <div className="relative">
      <PageBackground className="z-0" />
      <ScrollIndicator />
      <Toaster {...toasterBaseProps} />

      <div className="relative z-1">
        <TopBar />

        <article>
          <HomeSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </article>

        <PageFooter />
      </div>
    </div>
  );
}
