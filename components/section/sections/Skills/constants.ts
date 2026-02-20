import type { CSSProperties } from 'react';

export const skillCategories: {
  titleTKey: string;
  skills: { nameTKey: string; descriptionTKey: string; level: number; color: string }[];
}[] = [
  {
    titleTKey: 'cards.1.title',
    skills: [
      {
        nameTKey: 'cards.1.skills.1.name',
        descriptionTKey: 'cards.1.skills.1.description',
        level: 95,
        color: 'from-cyan-400 to-blue-500',
      },
      {
        nameTKey: 'cards.1.skills.2.name',
        descriptionTKey: 'cards.1.skills.2.description',
        level: 90,
        color: 'from-blue-400 to-indigo-500',
      },
      {
        nameTKey: 'cards.1.skills.3.name',
        descriptionTKey: 'cards.1.skills.3.description',
        level: 95,
        color: 'from-cyan-300 to-teal-500',
      },
      {
        nameTKey: 'cards.1.skills.4.name',
        descriptionTKey: 'cards.1.skills.4.description',
        level: 85,
        color: 'from-gray-700 to-gray-900',
      },
    ],
  },
  {
    titleTKey: 'cards.2.title',
    skills: [
      {
        nameTKey: 'cards.2.skills.1.name',
        descriptionTKey: 'cards.2.skills.1.description',
        level: 95,
        color: 'from-purple-400 to-pink-500',
      },
      {
        nameTKey: 'cards.2.skills.2.name',
        descriptionTKey: 'cards.2.skills.2.description',
        level: 90,
        color: 'from-pink-400 to-rose-500',
      },
      {
        nameTKey: 'cards.2.skills.3.name',
        descriptionTKey: 'cards.2.skills.3.description',
        level: 85,
        color: 'from-rose-400 to-red-500',
      },
      {
        nameTKey: 'cards.2.skills.4.name',
        descriptionTKey: 'cards.2.skills.4.description',
        level: 90,
        color: 'from-fuchsia-400 to-purple-500',
      },
    ],
  },
  {
    titleTKey: 'cards.3.title',
    skills: [
      {
        nameTKey: 'cards.3.skills.1.name',
        descriptionTKey: 'cards.3.skills.1.description',
        level: 90,
        color: 'from-orange-400 to-red-500',
      },
      {
        nameTKey: 'cards.3.skills.2.name',
        descriptionTKey: 'cards.3.skills.2.description',
        level: 95,
        color: 'from-green-400 to-emerald-500',
      },
      {
        nameTKey: 'cards.3.skills.3.name',
        descriptionTKey: 'cards.3.skills.3.description',
        level: 85,
        color: 'from-yellow-400 to-orange-500',
      },
      {
        nameTKey: 'cards.3.skills.4.name',
        descriptionTKey: 'cards.3.skills.4.description',
        level: 85,
        color: 'from-teal-400 to-cyan-500',
      },
    ],
  },
];

const cardMaxRows = Math.max(...skillCategories.map((category) => category.skills.length)) + 1; // +1 for the category title

const cardsListGridStyles: CSSProperties = {
  gridTemplateRows: `repeat(${cardMaxRows}, auto)`,
};
const cardSubgridStyles: CSSProperties = {
  display: 'grid',
  gridTemplateRows: `subgrid`,
  gridRow: `span ${cardMaxRows}`,
  alignItems: 'flex-end',
};
export const jsStyles = {
  cardsListGridStyles,
  cardSubgridStyles,
};
