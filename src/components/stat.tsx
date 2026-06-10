import { GlassPanel } from '@/src/components/glass-panel';
import { colors } from '@/src/constants/theme';
import { StyleSheet, Text } from 'react-native';

type StatProps = {
  count: number;
  label: string;
  color: string;
};

export function Stat({ count, label, color }: StatProps) {
  return (
    <GlassPanel style={styles.stat}>
      <Text style={[styles.statCount, { color }]}>{count}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </GlassPanel>
  );
}

const styles = StyleSheet.create({
  stat: { flex: 1, minHeight: 86, borderRadius: 17, alignItems: 'center', justifyContent: 'center', gap: 3 },
  statCount: { fontSize: 28, fontWeight: '800', fontVariant: ['tabular-nums'] },
  statLabel: { color: colors.textMuted, fontSize: 12 },
});
