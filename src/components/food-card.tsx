import { GlassPanel } from '@/src/components/glass-panel';
import { categoryEmoji } from '@/src/constants/foods';
import { colors } from '@/src/constants/theme';
import { Food, SwipeDecision } from '@/src/types/food';
import { Image } from 'expo-image';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export type FoodCardHandle = {
  swipe: (decision: SwipeDecision) => void;
};

type FoodCardProps = {
  food: Food;
  nextFood?: Food;
  onDecision: (decision: SwipeDecision) => void;
};

type SpecialAction = 'super-like' | 'unsure' | null;

const SWIPE_THRESHOLD = 110;
const SWIPE_DISTANCE = 620;
const spring = { damping: 18, stiffness: 220, mass: 0.8 };

export const FoodCard = forwardRef<FoodCardHandle, FoodCardProps>(function FoodCard(
  { food, nextFood, onDecision },
  ref,
) {
  const [specialAction, setSpecialAction] = useState<SpecialAction>(null);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isAnimating = useSharedValue(false);
  const specialOpacity = useSharedValue(0);
  const specialScale = useSharedValue(0.65);
  const burstOpacity = useSharedValue(0);
  const burstScale = useSharedValue(0.55);

  const finishSwipe = (decision: SwipeDecision) => {
    onDecision(decision);
  };

  const sweepHorizontally = (decision: SwipeDecision) => {
    if (isAnimating.value) {
      return;
    }
    isAnimating.value = true;
    const destination = decision === 'dislike' ? -SWIPE_DISTANCE : SWIPE_DISTANCE;
    translateX.value = withTiming(destination, { duration: 245, easing: Easing.out(Easing.cubic) }, () =>
      runOnJS(finishSwipe)(decision),
    );
  };

  const runSpecialAction = (decision: 'super-like' | 'unsure') => {
    if (isAnimating.value) {
      return;
    }
    isAnimating.value = true;
    setSpecialAction(decision);
    specialOpacity.value = withSequence(
      withTiming(1, { duration: 90 }),
      withDelay(330, withTiming(0, { duration: 100 })),
    );
    specialScale.value = withSequence(withSpring(1.18, spring), withSpring(1, spring));
    burstOpacity.value = withSequence(
      withDelay(80, withTiming(0.9, { duration: 80 })),
      withTiming(0, { duration: 250 }),
    );
    burstScale.value = withSequence(
      withDelay(70, withSpring(1.12, spring)),
      withTiming(1.7, { duration: 240, easing: Easing.out(Easing.cubic) }),
    );
    if (decision === 'super-like') {
      translateX.value = withDelay(
        430,
        withTiming(SWIPE_DISTANCE, { duration: 260, easing: Easing.out(Easing.cubic) }, () =>
          runOnJS(finishSwipe)(decision),
        ),
      );
      translateY.value = withDelay(430, withTiming(-50, { duration: 260 }));
    } else {
      translateY.value = withDelay(
        430,
        withTiming(SWIPE_DISTANCE, { duration: 270, easing: Easing.out(Easing.cubic) }, () =>
          runOnJS(finishSwipe)(decision),
        ),
      );
    }
  };

  const animateDecision = (decision: SwipeDecision) => {
    if (decision === 'super-like' || decision === 'unsure') {
      runSpecialAction(decision);
      return;
    }
    sweepHorizontally(decision);
  };

  useImperativeHandle(ref, () => ({ swipe: animateDecision }));

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      if (isAnimating.value) {
        return;
      }
      translateX.value = event.translationX;
      translateY.value = event.translationY * 0.18;
    })
    .onEnd((event) => {
      if (isAnimating.value) {
        return;
      }
      if (event.translationX > SWIPE_THRESHOLD || event.velocityX > 750) {
        isAnimating.value = true;
        translateX.value = withTiming(SWIPE_DISTANCE, { duration: 230 }, () => runOnJS(finishSwipe)('like'));
      } else if (event.translationX < -SWIPE_THRESHOLD || event.velocityX < -750) {
        isAnimating.value = true;
        translateX.value = withTiming(-SWIPE_DISTANCE, { duration: 230 }, () => runOnJS(finishSwipe)('dislike'));
      } else {
        translateX.value = withSpring(0, spring);
        translateY.value = withSpring(0, spring);
      }
    });

  const topCardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${interpolate(translateX.value, [-300, 0, 300], [-11, 0, 11])}deg` },
    ],
  }));

  const nextCardStyle = useAnimatedStyle(() => {
    const movement = Math.min(Math.abs(translateX.value) + Math.abs(translateY.value), SWIPE_THRESHOLD);
    const progress = movement / SWIPE_THRESHOLD;
    return {
      opacity: interpolate(progress, [0, 0.05, 1], [0.72, 0.86, 1]),
      transform: [
        { translateY: interpolate(progress, [0, 1], [18, 0]) },
        { scale: interpolate(progress, [0, 1], [0.94, 1]) },
      ],
    };
  });

  const likeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [20, 130], [0, 1], 'clamp'),
  }));
  const dislikeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-130, -20], [1, 0], 'clamp'),
  }));
  const specialStyle = useAnimatedStyle(() => ({
    opacity: specialOpacity.value,
    transform: [{ scale: specialScale.value }],
  }));
  const burstStyle = useAnimatedStyle(() => ({
    opacity: burstOpacity.value,
    transform: [{ scale: burstScale.value }],
  }));

  return (
    <View style={styles.deck}>
      {nextFood ? (
        <Animated.View pointerEvents="none" style={[styles.cardWrap, styles.nextCard, nextCardStyle]}>
          <FoodCardFace food={nextFood} />
        </Animated.View>
      ) : null}

      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.cardWrap, topCardStyle]}>
          <FoodCardFace food={food}>
            <Animated.View style={[styles.badge, styles.likeBadge, likeStyle]}>
              <Text style={styles.badgeText}>YES</Text>
            </Animated.View>
            <Animated.View style={[styles.badge, styles.dislikeBadge, dislikeStyle]}>
              <Text style={styles.badgeText}>NO</Text>
            </Animated.View>

            <Animated.View
              pointerEvents="none"
              style={[styles.specialBurst, specialAction === 'unsure' && styles.unsureBurst, burstStyle]}
            />
            <Animated.View
              pointerEvents="none"
              style={[
                styles.specialPill,
                specialAction === 'unsure' ? styles.unsurePill : styles.superLikePill,
                specialAction === 'unsure' ? styles.specialBottom : styles.specialTop,
                specialStyle,
              ]}>
              <Text style={styles.specialText}>
                {specialAction === 'unsure' ? 'Unsure' : 'Super Like ✨'}
              </Text>
            </Animated.View>
          </FoodCardFace>
        </Animated.View>
      </GestureDetector>
    </View>
  );
});

function FoodCardFace({ food, children }: { food: Food; children?: React.ReactNode }) {
  return (
    <GlassPanel intensity={42} style={styles.card}>
      <Image cachePolicy="memory-disk" contentFit="cover" source={{ uri: food.image }} style={styles.image} />
      <View style={styles.scrim} />
      {children}
      <View style={styles.copy}>
        <Text style={styles.emoji}>{categoryEmoji[food.category]}</Text>
        <Text style={styles.title}>{food.name}</Text>
        <Text style={styles.subtitle}>Would you enjoy eating this?</Text>
        <View style={styles.tags}>
          {food.tags.slice(0, 3).map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </GlassPanel>
  );
}

const styles = StyleSheet.create({
  deck: { width: '100%', maxWidth: 402, flex: 1 },
  cardWrap: { ...StyleSheet.absoluteFillObject },
  nextCard: { zIndex: 0 },
  card: { flex: 1, borderRadius: 40 },
  image: { ...StyleSheet.absoluteFillObject },
  scrim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.36)' },
  copy: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', padding: 28, paddingBottom: 42, gap: 10 },
  emoji: { fontSize: 52 },
  title: { color: colors.text, fontSize: 30, fontWeight: '700', textAlign: 'center' },
  subtitle: { color: colors.textSoft, fontSize: 17, textAlign: 'center' },
  tags: { flexDirection: 'row', gap: 7, paddingTop: 4 },
  tag: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: 'rgba(0, 0, 0, 0.42)' },
  tagText: { color: colors.textSoft, fontSize: 11, textTransform: 'capitalize' },
  badge: {
    position: 'absolute',
    top: 38,
    zIndex: 3,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.48)',
  },
  likeBadge: { right: 25, transform: [{ rotate: '10deg' }], backgroundColor: 'rgba(75, 216, 131, 0.92)' },
  dislikeBadge: { left: 25, transform: [{ rotate: '-10deg' }], backgroundColor: 'rgba(255, 95, 102, 0.92)' },
  badgeText: { color: '#000000', fontSize: 22, fontWeight: '800', letterSpacing: 0.4 },
  specialBurst: {
    position: 'absolute',
    zIndex: 3,
    width: 110,
    height: 110,
    left: '50%',
    top: '50%',
    marginLeft: -55,
    marginTop: -55,
    borderRadius: 999,
    borderWidth: 4,
    borderColor: 'rgba(46, 181, 255, 0.8)',
  },
  unsureBurst: { borderColor: 'rgba(215, 215, 218, 0.78)' },
  specialPill: {
    position: 'absolute',
    zIndex: 4,
    alignSelf: 'center',
    borderRadius: 999,
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  specialTop: { top: 24 },
  specialBottom: { bottom: 25 },
  superLikePill: { backgroundColor: colors.blue },
  unsurePill: { backgroundColor: '#D7D7DA' },
  specialText: { color: '#080808', fontSize: 18, fontWeight: '700' },
});
