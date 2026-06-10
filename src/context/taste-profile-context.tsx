import { foods } from '@/src/constants/foods';
import { FoodChoice, SwipeDecision } from '@/src/types/food';
import React, { createContext, PropsWithChildren, useCallback, useMemo, useState } from 'react';

type TasteProfileContextValue = {
  choices: FoodChoice[];
  currentIndex: number;
  currentFood: (typeof foods)[number] | undefined;
  isComplete: boolean;
  recordChoice: (decision: SwipeDecision) => void;
  undoLastChoice: () => void;
  resetProfile: () => void;
};

const TasteProfileContext = createContext<TasteProfileContextValue | null>(null);

export function TasteProfileProvider({ children }: PropsWithChildren) {
  const [choices, setChoices] = useState<FoodChoice[]>([]);
  const currentIndex = choices.length;

  const recordChoice = useCallback((decision: SwipeDecision) => {
    setChoices((current) => {
      const food = foods[current.length];
      return food ? [...current, { food, decision }] : current;
    });
  }, []);

  const undoLastChoice = useCallback(() => {
    setChoices((current) => current.slice(0, -1));
  }, []);

  const resetProfile = useCallback(() => setChoices([]), []);

  const value = useMemo(
    () => ({
      choices,
      currentIndex,
      currentFood: foods[currentIndex],
      isComplete: currentIndex >= foods.length,
      recordChoice,
      undoLastChoice,
      resetProfile,
    }),
    [choices, currentIndex, recordChoice, resetProfile, undoLastChoice],
  );

  return <TasteProfileContext.Provider value={value}>{children}</TasteProfileContext.Provider>;
}

export function useTasteProfile() {
  const value = React.use(TasteProfileContext);
  if (!value) {
    throw new Error('useTasteProfile must be used inside TasteProfileProvider');
  }
  return value;
}
