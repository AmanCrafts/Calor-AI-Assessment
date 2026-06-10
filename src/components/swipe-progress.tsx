import { colors } from '@/src/constants/theme';
import { StyleSheet, Text, View } from 'react-native';

type SwipeProgressProps = {
  current: number;
  total: number;
};

export function SwipeProgress({ current, total }: SwipeProgressProps) {
  const percentage = total === 0 ? 0 : Math.min(current / total, 1);

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage * 100}%` }]} />
      </View>
      <Text style={styles.label}>
        {Math.min(current + 1, total)} of {total}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', gap: 9 },
  track: {
    height: 6,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: 'rgba(120, 120, 128, 0.36)',
  },
  fill: { height: '100%', borderRadius: 999, backgroundColor: colors.green },
  label: { color: colors.textMuted, fontSize: 12, textAlign: 'right', fontVariant: ['tabular-nums'] },
});
