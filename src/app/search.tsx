import { AppHeader } from '@/src/components/app-header';
import { GlassPanel } from '@/src/components/glass-panel';
import { ScreenBackground } from '@/src/components/screen-background';
import { screenEnter } from '@/src/constants/animations';
import { colors, layout } from '@/src/constants/theme';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

export default function SearchScreen() {
  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={screenEnter} style={styles.screenContent}>
          <AppHeader showBack subtitle="Food search is ready for future recommendation features." title="Search" />
          <View style={styles.body}>
            <GlassPanel style={styles.card}>
              <Text style={styles.emoji}>🔎</Text>
              <Text style={styles.title}>Search coming soon</Text>
              <Text style={styles.copy}>Your taste profile will make food discovery more personal.</Text>
            </GlassPanel>
          </View>
        </Animated.View>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: { minHeight: '100%', paddingBottom: layout.navHeight + 30 },
  screenContent: { flex: 1 },
  body: { width: '100%', maxWidth: layout.maxWidth, alignSelf: 'center', padding: 22 },
  card: { borderRadius: 34, padding: 30, alignItems: 'center', gap: 14 },
  emoji: { fontSize: 48 },
  title: { color: colors.text, fontSize: 22, fontWeight: '700' },
  copy: { color: colors.textMuted, textAlign: 'center', fontSize: 15, lineHeight: 22 },
});
