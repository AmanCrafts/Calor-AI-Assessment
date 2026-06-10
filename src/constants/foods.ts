import foodData from '../../data/food.json';
import { Food } from '@/src/types/food';

export const foods = foodData.foods as Food[];

export const categoryEmoji: Record<Food['category'], string> = {
  protein: '🥩',
  carb: '🍝',
  vegetable: '🥗',
  other: '🍽️',
};
