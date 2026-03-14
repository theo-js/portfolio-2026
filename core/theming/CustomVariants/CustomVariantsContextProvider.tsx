'use client';

import { createContext, useContext, useState, type FC, type PropsWithChildren } from 'react';
import { useGlassmorphim } from './glassmorphism/useGlassmorphism';
import { useColorTheme } from './color-theme/useColorTheme';

interface CustomVariantsContextType
  extends ReturnType<typeof useGlassmorphim>, ReturnType<typeof useColorTheme> {
  isThemeTransitionInProgress: boolean;
  setIsThemeTransitionInProgress: (isThemeTransitionInProgress: boolean) => void;
}

const customVariantsContext = createContext<CustomVariantsContextType | undefined>(undefined);

export const useCustomVariantsContext = () => {
  const context = useContext(customVariantsContext);
  if (!context) {
    throw new Error('useCustomVariantsContext must be used within a CustomVariantsProvider');
  }
  return context;
};

export const CustomVariantsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isThemeTransitionInProgress, setIsThemeTransitionInProgress] = useState(false);
  return (
    <customVariantsContext.Provider
      value={{
        ...useGlassmorphim({ setIsThemeTransitionInProgress }),
        ...useColorTheme({ setIsThemeTransitionInProgress }),
        isThemeTransitionInProgress,
        setIsThemeTransitionInProgress,
      }}
    >
      {children}
    </customVariantsContext.Provider>
  );
};
