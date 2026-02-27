import { getTranslations } from 'next-intl/server';
import type { FC } from 'react';

export const PageFooter: FC = async () => {
  const t = await getTranslations();
  const currentDate = new Date();
  const formattedDate =
    currentDate.getFullYear().toString() == (process.env.NEXT_PUBLIC_PROJECT_CREATION_YEAR ?? '')
      ? process.env.NEXT_PUBLIC_PROJECT_CREATION_YEAR
      : `${process.env.NEXT_PUBLIC_PROJECT_CREATION_YEAR} - ${currentDate.getFullYear()}`;

  return (
    <footer className="my-20 text-center">
      <small className="glass:text-white/80 text-sm text-gray-600 dark:text-white/60">
        {t('footer.small', { date: formattedDate ?? '' })}
      </small>
    </footer>
  );
};
