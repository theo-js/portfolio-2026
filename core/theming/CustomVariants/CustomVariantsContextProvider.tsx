'use client';

import { createContext, useContext, type FC, type PropsWithChildren } from 'react';
import { useGlassmorphim } from './useGlassmorphism';
import { useColorTheme } from './useColorTheme';

type CustomVariantsContextType = ReturnType<typeof useGlassmorphim> &
  ReturnType<typeof useColorTheme>;

const customVariantsContext = createContext<CustomVariantsContextType | undefined>(undefined);

export const useCustomVariantsContext = () => {
  const context = useContext(customVariantsContext);
  if (!context) {
    throw new Error('useCustomVariantsContext must be used within a CustomVariantsProvider');
  }
  return context;
};

export const CustomVariantsProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <customVariantsContext.Provider
      value={{
        ...useGlassmorphim(),
        ...useColorTheme(),
      }}
    >
      {children}
    </customVariantsContext.Provider>
  );
};
