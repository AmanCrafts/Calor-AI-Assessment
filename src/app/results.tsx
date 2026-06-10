import { AppHeader } from '@/src/components/app-header';
import { GlassPanel } from '@/src/components/glass-panel';
import { ProfileSection } from '@/src/components/profile-section';
import { ScreenBackground } from '@/src/components/screen-background';
import { screenEnter } from '@/src/constants/animations';
import { colors, layout } from '@/src/constants/theme';
import { useTasteProfile } from '@/src/context/taste-profile-context';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

export default function ResultsScreen() {
  const router = useRouter();
  const { choices, resetProfile } = useTasteProfile();
  const liked = choices.filter(({ decision }) => decision === 'like' || decision === 'super-like');
  const disliked = choices.filter(({ decision }) => decision === 'dislike');
  const unsure = choices.filter(({ decision }) => decision === 'unsure');

  const tagCounts = liked.flatMap(({ food }) => food.tags).reduce<Record<string, number>>((counts, tag) => {
    counts[tag] = (counts[tag] ?? 0) + 1;
    return counts;
  }, {});
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([tag]) => tag);

  const traits = topTags.length
    ? topTags.map((tag) => `${tag.charAt(0).toUpperCase()}${tag.slice(1)} enthusiast`)
    : ['Complete the swipe deck to reveal your taste traits'];

  const restart = () => {
    resetProfile();
    router.push('/swipe');
  };

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={screenEnter}>
          <AppHeader
            showBack
            subtitle="Tailored to your unique needs. We’ll use this for recommendations and meal plans."
            title="Your Taste Profile"
          />

          <View style={styles.body}>
            <GlassPanel style={styles.traitsCard}>
              {traits.map((trait, index) => (
                <View key={trait} style={styles.trait}>
                  <Text style={styles.traitEmoji}>{['✨', '🍴', '💚'][index] ?? '✨'}</Text>
                  <Text style={styles.traitText}>{trait}</Text>
                </View>
              ))}
            </GlassPanel>

            <View>
              <Text style={styles.sectionLabel}>Taste Breakdown</Text>
              <View style={styles.stats}>
                <Stat count={liked.length} label="Loved" color={colors.green} />
                <Stat count={disliked.length} label="Passed" color={colors.danger} />
                <Stat count={unsure.length} label="Unsure" color={colors.blue} />
              </View>
            </View>

            <ProfileSection
              color={colors.green}
              emptyText="No loved foods yet."
              icon="heart"
              items={liked.map(({ food }) => food.name)}
              subtitle="We’ll recommend more like these"
              title="Foods You Love"
            />
            <ProfileSection
              color={colors.danger}
              emptyText="No disliked foods yet."
              icon="close"
              items={disliked.map(({ food }) => food.name)}
              subtitle="We’ll keep these out of your plan"
              title="Foods You Passed"
            />

            <Pressable onPress={restart} style={({ pressed }) => [styles.restart, pressed && styles.pressed]}>
              <Text style={styles.restartText}>{choices.length ? 'Retake Taste Profile' : 'Start Taste Profile'}</Text>
            </Pressable>
          </View>
        </Animated.View>
      </ScrollView>
    </ScreenBackground>
  );
}

function Stat({ count, label, color }: { count: number; label: string; color: string }) {
  return (
    <GlassPanel style={styles.stat}>
      <Text style={[styles.statCount, { color }]}>{count}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </GlassPanel>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: layout.navHeight + 34 },
  body: {
    width: '100%',
    maxWidth: layout.maxWidth,
    alignSelf: 'center',
    paddingHorizontal: 22,
    paddingTop: 24,
    gap: 20,
  },
  traitsCard: { minHeight: 150, borderRadius: 20, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center' },
  trait: { flex: 1, alignItems: 'center', gap: 10, paddingHorizontal: 4 },
  traitEmoji: { fontSize: 42 },
  traitText: { color: colors.textSoft, fontSize: 13, lineHeight: 17, fontWeight: '600', textAlign: 'center', textTransform: 'capitalize' },
  sectionLabel: { color: 'rgba(235, 235, 245, 0.65)', fontSize: 17, fontWeight: '600', paddingHorizontal: 12, paddingBottom: 10 },
  stats: { flexDirection: 'row', gap: 9 },
  stat: { flex: 1, minHeight: 86, borderRadius: 17, alignItems: 'center', justifyContent: 'center', gap: 3 },
  statCount: { fontSize: 28, fontWeight: '800', fontVariant: ['tabular-nums'] },
  statLabel: { color: colors.textMuted, fontSize: 12 },
  restart: { height: 52, borderRadius: 999, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.green },
  restartText: { color: '#000000', fontSize: 16, fontWeight: '700' },
  pressed: { opacity: 0.82, transform: [{ scale: 0.98 }] },
});
