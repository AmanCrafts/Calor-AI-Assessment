import { IconButton } from '@/src/components/icon-button';
import { colors, layout } from '@/src/constants/theme';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  showBack?: boolean;
};

export function AppHeader({ title, subtitle, showBack = false }: AppHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/'));

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.controls}>
        {showBack ? (
          <IconButton accessibilityLabel="Go back" icon="chevron-back" onPress={goBack} />
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: layout.maxWidth,
    alignSelf: 'center',
    paddingHorizontal: 32,
    gap: 5,
  },
  controls: { minHeight: 44, justifyContent: 'center' },
  placeholder: { height: 44 },
  title: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '700',
    letterSpacing: 0.3,
    flexShrink: 0,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 20,
    maxWidth: 360,
  },
});
