import { AppHeader } from '@/src/components/app-header';
import { GlassPanel } from '@/src/components/glass-panel';
import { ScreenBackground } from '@/src/components/screen-background';
import { screenEnter } from '@/src/constants/animations';
import { colors, layout } from '@/src/constants/theme';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Animated from 'react-native-reanimated';

const questions = [
  ['How does it work?', 'Swipe right on foods you enjoy and left on foods you would rather skip.'],
  ['Can I change an answer?', 'Use the undo button while swiping, or retake the profile from your results.'],
  ['What does Super Like do?', 'It marks a food as a strong favorite and includes it in your loved foods.'],
];

export default function FaqScreen() {
  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={screenEnter} style={styles.screenContent}>
          <AppHeader showBack subtitle="A few quick notes before you build your profile." title="Taste Profile FAQ" />
          <Animated.View style={styles.body}>
            {questions.map(([question, answer]) => (
              <GlassPanel key={question} style={styles.card}>
                <Text style={styles.question}>{question}</Text>
                <Text style={styles.answer}>{answer}</Text>
              </GlassPanel>
            ))}
          </Animated.View>
        </Animated.View>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: layout.navHeight + 32 },
  screenContent: { flex: 1 },
  body: { width: '100%', maxWidth: layout.maxWidth, alignSelf: 'center', padding: 22, gap: 13 },
  card: { borderRadius: 20, padding: 18, gap: 7 },
  question: { color: colors.text, fontSize: 18, fontWeight: '700' },
  answer: { color: colors.textMuted, fontSize: 15, lineHeight: 22 },
});
