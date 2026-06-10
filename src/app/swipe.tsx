import { FoodCard, FoodCardHandle } from '@/src/components/food-card.tsx';
import { IconButton } from '@/src/components/icon-button';
import { ScreenBackground } from '@/src/components/screen-background';
import { SwipeActionButton } from '@/src/components/swipe-action-button';
import { SwipeProgress } from '@/src/components/swipe-progress';
import { foods } from '@/src/constants/foods';
import { colors, layout } from '@/src/constants/theme';
import { useTasteProfile } from '@/src/context/taste-profile-context';
import { SwipeDecision } from '@/src/types/food';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SwipeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const cardRef = useRef<FoodCardHandle>(null);
  const { currentFood, currentIndex, isComplete, recordChoice, undoLastChoice } = useTasteProfile();
  const nextFood = foods[currentIndex + 1];

  useEffect(() => {
    if (isComplete) {
      router.replace('/results');
    }
  }, [isComplete, router]);

  useEffect(() => {
    if (nextFood) {
      void Image.prefetch(nextFood.image, 'memory-disk');
    }
  }, [nextFood]);

  const commitDecision = (decision: SwipeDecision) => {
    recordChoice(decision);
    void Haptics.selectionAsync();
  };

  const triggerDecision = (decision: SwipeDecision) => {
    cardRef.current?.swipe(decision);
  };

  const close = () => (router.canGoBack() ? router.back() : router.replace('/'));

  if (!currentFood) {
    return <ScreenBackground />;
  }

  return (
    <ScreenBackground>
      <View style={[styles.container, { paddingTop: insets.top + 12, paddingBottom: Math.max(insets.bottom, 12) }]}>
        <View style={styles.topRow}>
          <IconButton accessibilityLabel="Close taste profile" icon="close" onPress={close} />
          <View style={styles.progress}>
            <SwipeProgress current={currentIndex} total={foods.length} />
          </View>
          <IconButton
            accessibilityLabel="Undo last choice"
            disabled={currentIndex === 0}
            icon="arrow-undo"
            onPress={undoLastChoice}
          />
        </View>

        <View style={styles.prompt}>
          <Text style={styles.promptTitle}>What tastes good to you?</Text>
          <Text style={styles.promptSubtitle}>Swipe or use the buttons below</Text>
        </View>

        <View style={styles.cardArea}>
          <FoodCard key={currentFood.id} food={currentFood} nextFood={nextFood} onDecision={commitDecision} ref={cardRef} />
        </View>

        <View style={styles.actions}>
          <SwipeActionButton icon="close" label="Swipe Left" onPress={() => triggerDecision('dislike')} />
          <SwipeActionButton compact icon="help" label="Not Sure" onPress={() => triggerDecision('unsure')} />
          <SwipeActionButton
            color={colors.blue}
            compact
            icon="star"
            label="Super Like"
            onPress={() => triggerDecision('super-like')}
          />
          <SwipeActionButton color={colors.green} icon="heart" label="Swipe Right" onPress={() => triggerDecision('like')} />
        </View>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: layout.maxWidth,
    alignSelf: 'center',
    paddingHorizontal: layout.horizontalPadding,
    gap: 15,
  },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 13 },
  progress: { flex: 1 },
  prompt: { alignItems: 'center', gap: 3 },
  promptTitle: { color: colors.text, fontSize: 22, fontWeight: '700' },
  promptSubtitle: { color: colors.textMuted, fontSize: 13 },
  cardArea: { flex: 1, minHeight: 380, alignItems: 'center', paddingTop: 8 },
  actions: { height: 105, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
});
