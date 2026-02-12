import { TopBar } from '@/components/layout/TopBar';
import { HomeSection } from '@/components/sections/Home';

export default async function Home() {
  return (
    <div>
      <TopBar />

      <>
        <HomeSection />
      </>
    </div>
  );
}
