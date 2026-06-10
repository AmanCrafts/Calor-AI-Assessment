import { AppHeader } from '@/src/components/app-header';
import { GlassPanel } from '@/src/components/glass-panel';
import { ScreenBackground } from '@/src/components/screen-background';
import { screenEnter } from '@/src/constants/animations';
import { colors, layout } from '@/src/constants/theme';
import { useTasteProfile } from '@/src/context/taste-profile-context';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
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
            <Pressable onPress={start} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
              <Text style={styles.buttonText}>{choices.length ? 'Start Again' : 'Start Swiping'}</Text>
            </Pressable>
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
  button: {
    minWidth: 173,
    height: 49,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    backgroundColor: colors.green,
  },
  buttonPressed: { transform: [{ scale: 0.97 }], opacity: 0.86 },
  buttonText: { color: '#000000', fontSize: 16, lineHeight: 21, fontWeight: '700', letterSpacing: -0.31 },
  time: { width: '100%', color: colors.textSoft, fontSize: 15, lineHeight: 19, textAlign: 'center', letterSpacing: -0.56 },
});
