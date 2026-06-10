export type FoodCategory = 'protein' | 'carb' | 'vegetable' | 'other';

export type Food = {
  id: number;
  name: string;
  image: string;
  category: FoodCategory;
  tags: string[];
};

export type SwipeDecision = 'like' | 'dislike' | 'unsure' | 'super-like';

export type FoodChoice = {
  food: Food;
  decision: SwipeDecision;
};
