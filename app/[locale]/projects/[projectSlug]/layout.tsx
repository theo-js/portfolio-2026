import type { PropsWithChildren } from 'react';
import { SectionId } from '@/components/section/SectionId.enum';
import { LongPostLayout } from '@/components/layout/LongPostLayout';
import type { Metadata } from 'next';
import { projects } from '@/data-access/static/project';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}): Promise<Metadata> {
  const t = await getTranslations('sections.projects');
  const { projectSlug } = await params;
  const project = projects.find(({ slug }) => slug === projectSlug);
  const title = project ? `${t(project.titleTKey)} | Théo Bayenet` : undefined;
  const description = project ? t(project.descriptionTKey) : undefined;

  return {
    title,
    description,
    openGraph: {
      images: project
        ? {
            url: project.imageUrl,
            alt: title,
          }
        : undefined,
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: project
        ? {
            url: project.imageUrl,
            alt: title,
          }
        : undefined,
    },
  };
}

export default function ProjectLayout({ children }: PropsWithChildren) {
  return (
    <LongPostLayout id={SectionId.Projects} className="max-w-full! items-start">
      {children}
    </LongPostLayout>
  );
}
