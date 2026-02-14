import { SectionId } from '@/components/section/SectionId.enum';
import { type RefObject, useEffect, useRef, useState } from 'react';

type UseGetCurrentSectionParams = {
  sectionIds: SectionId[];
  linksContainerRef: RefObject<HTMLDivElement | null>;
};
export type UseGetCurrentSectionReturnValue = {
  id: SectionId;
  linkElement: {
    offsetLeft: number;
    offsetTop: number;
    clientWidth: number;
    clientHeight: number;
  };
};

export function useGetCurrentSection({
  sectionIds,
  linksContainerRef,
}: UseGetCurrentSectionParams) {
  const [currentSection, setCurrentSection] = useState<UseGetCurrentSectionReturnValue | null>(
    null,
  );
  const currentSectionIdRef = useRef<SectionId | null>(null); // keep track of last section

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.5, 1], // trigger callback at 0%, 50%, and 100% visibility
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const { mostVisibleSection } = findMostVisibleSection(entries);
      if (!mostVisibleSection) return;

      const id = mostVisibleSection.target.id as SectionId;
      // Only update if the section is intersecting and it's different from the current one
      if (!mostVisibleSection.isIntersecting || currentSectionIdRef.current === id) return;
      currentSectionIdRef.current = id;

      const linkElement = linksContainerRef.current?.querySelector(`a[href="#${id}"]`);

      setCurrentSection({
        id,
        linkElement: {
          offsetLeft: (linkElement as HTMLElement)?.offsetLeft ?? 0,
          offsetTop: (linkElement as HTMLElement)?.offsetTop ?? 0,
          clientWidth: (linkElement as HTMLElement)?.clientWidth ?? 0,
          clientHeight: (linkElement as HTMLElement)?.clientHeight ?? 0,
        },
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sectionIds.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sectionIds]);

  function findMostVisibleSection(entries: IntersectionObserverEntry[]) {
    const intersectingEntries = entries.filter((entry) => entry.isIntersecting);
    // Find the entry with the largest intersection ratio (most visible)
    const mostVisibleSection = intersectingEntries.reduce(
      (prev, curr) =>
        curr.intersectionRatio > (prev?.intersectionRatio ?? -Infinity) ? curr : prev,
      null as IntersectionObserverEntry | null,
    );
    return { mostVisibleSection };
  }

  return { currentSection };
}
