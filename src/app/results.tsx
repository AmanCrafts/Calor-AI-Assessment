import { AppHeader } from '@/src/components/app-header';
import { GlassPanel } from '@/src/components/glass-panel';
import { PrimaryButton } from '@/src/components/primary-button';
import { ProfileSection } from '@/src/components/profile-section';
import { ScreenBackground } from '@/src/components/screen-background';
import { Stat } from '@/src/components/stat';
import { screenEnter } from '@/src/constants/animations';
import { colors, layout } from '@/src/constants/theme';
import { useTasteProfile } from '@/src/context/taste-profile-context';
import { useTasteAnalysis } from '@/src/hooks/use-taste-analysis';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

export default function ResultsScreen() {
  const router = useRouter();
  const { choices, resetProfile } = useTasteProfile();
  const { liked, disliked, unsure, traits } = useTasteAnalysis();

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

            <PrimaryButton 
              onPress={restart} 
              style={{ width: '100%' }}
              title={choices.length ? 'Retake Taste Profile' : 'Start Taste Profile'} 
            />
          </View>
        </Animated.View>
      </ScrollView>
    </ScreenBackground>
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
});
