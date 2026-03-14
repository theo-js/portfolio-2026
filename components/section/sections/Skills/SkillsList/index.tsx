'use client';

import { useRef, type FC } from 'react';
import type { SkillHandle } from './Skill';
import { Skill } from './Skill';
import { Reveal } from '@/components/ui/reveal';
import type { SkillData } from '../constants';
import { jsStyles } from '../constants';
import { InView } from '@theo-js/react-gsap-reveal';

interface SkillsListProps {
  skills: SkillData[];
  categoryIndex: number;
}

export const SkillsList: FC<SkillsListProps> = ({ skills, categoryIndex }) => {
  const skillHandlesRef = useRef<SkillHandle[]>([]);
  const handleEnter = () => {
    skillHandlesRef.current.forEach((handle) => handle?.animate());
  };

  return (
    <InView className="grid!" style={jsStyles.cardSubgridStyles} onEnter={handleEnter}>
      <Reveal
        as="ul"
        style={jsStyles.cardSubgridStyles}
        className="grid!"
        childAs="li"
        animation="fadeIn"
        options={{ delay: 0.2 + categoryIndex * 0.2, stagger: 0.1 }}
      >
        {skills.map((skill, skillIndex) => (
          <Skill
            key={skill.nameTKey}
            ref={(handle) => {
              skillHandlesRef.current[skillIndex] = handle!;
            }}
            {...skill}
            progressDelay={0.8 + categoryIndex * 0.2 + skillIndex * 0.1}
            shimmerDelay={1.2 + categoryIndex * 0.4 + skillIndex * 0.1}
          />
        ))}
      </Reveal>
    </InView>
  );
};
