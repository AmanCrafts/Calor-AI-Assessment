import { useTasteProfile } from '@/src/context/taste-profile-context';
import { useMemo } from 'react';

export function useTasteAnalysis() {
  const { choices } = useTasteProfile();

  const liked = useMemo(() => choices.filter(({ decision }) => decision === 'like' || decision === 'super-like'), [choices]);
  const disliked = useMemo(() => choices.filter(({ decision }) => decision === 'dislike'), [choices]);
  const unsure = useMemo(() => choices.filter(({ decision }) => decision === 'unsure'), [choices]);

  const traits = useMemo(() => {
    const tagCounts = liked.flatMap(({ food }) => food.tags).reduce<Record<string, number>>((counts, tag) => {
      counts[tag] = (counts[tag] ?? 0) + 1;
      return counts;
    }, {});
    
    const topTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([tag]) => tag);

    return topTags.length
      ? topTags.map((tag) => `${tag.charAt(0).toUpperCase()}${tag.slice(1)} enthusiast`)
      : ['Complete the swipe deck to reveal your taste traits'];
  }, [liked]);

  return { liked, disliked, unsure, traits };
}
