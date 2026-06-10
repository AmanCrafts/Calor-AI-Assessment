import { AppHeader } from '@/src/components/app-header';
import { GlassPanel } from '@/src/components/glass-panel';
import { PrimaryButton } from '@/src/components/primary-button';
import { ScreenBackground } from '@/src/components/screen-background';
import { screenEnter } from '@/src/constants/animations';
import { colors, layout } from '@/src/constants/theme';
import { useTasteProfile } from '@/src/context/taste-profile-context';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Animated from 'react-native-reanimated';

export default function IntroScreen() {
  const router = useRouter();
  const { choices, resetProfile } = useTasteProfile();

  const start = () => {
    resetProfile();
    router.push('/swipe');
  };

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <AppHeader showBack title="Design Your Food Plan" />
        <Animated.View entering={screenEnter} style={styles.cardWrap}>
          <GlassPanel intensity={92} tintColor="rgba(5, 28, 20, 0.12)" variant="card" style={styles.card}>
            <Text style={styles.emoji}>😋</Text>
            <Text style={styles.title}>Build Your Taste Profile</Text>
            <Text style={styles.description}>Swipe right on foods you love, left on foods you don&apos;t.</Text>
            <Text style={styles.subDescription}>This helps us recommend meals you&apos;ll love eating.</Text>
            <PrimaryButton 
              onPress={start} 
              title={choices.length ? 'Start Again' : 'Start Swiping'} 
            />
            <Text style={styles.time}>Takes about 2 minutes.</Text>
          </GlassPanel>
        </Animated.View>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    minHeight: '100%',
    alignItems: 'center',
    paddingBottom: layout.navHeight + 46,
  },
  cardWrap: {
    width: '100%',
    maxWidth: layout.maxWidth,
    paddingHorizontal: layout.horizontalPadding,
    paddingTop: 31,
    flex: 1,
  },
  card: {
    minHeight: 596,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 45,
    gap: 31,
  },
  emoji: { width: '100%', color: colors.textSoft, fontSize: 80, lineHeight: 85, textAlign: 'center', letterSpacing: -0.56 },
  title: {
    width: '100%',
    color: colors.textSoft,
    fontSize: 28,
    lineHeight: 30,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: -0.56,
  },
  description: {
    width: '100%',
    color: colors.textSoft,
    fontSize: 22,
    lineHeight: 30,
    textAlign: 'center',
    letterSpacing: -0.56,
  },
  subDescription: {
    width: '100%',
    color: colors.textSoft,
    fontSize: 17,
    lineHeight: 30,
    textAlign: 'center',
    letterSpacing: -0.56,
  },
  time: { width: '100%', color: colors.textSoft, fontSize: 15, lineHeight: 19, textAlign: 'center', letterSpacing: -0.56 },
});
