import { GlassPanel } from '@/src/components/glass-panel';
import { colors } from '@/src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type ProfileSectionProps = {
  title: string;
  subtitle: string;
  items: string[];
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
  emptyText: string;
};

export function ProfileSection({ title, subtitle, items, icon, color = colors.green, emptyText }: ProfileSectionProps) {
  return (
    <GlassPanel style={styles.panel}>
      <View style={styles.heading}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {items.length ? (
        items.map((item, index) => (
          <View key={item} style={[styles.row, index > 0 && styles.separator]}>
            <View style={[styles.icon, { backgroundColor: color }]}>
              <Ionicons color={colors.text} name={icon} size={13} />
            </View>
            <Text style={styles.item}>{item}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.empty}>{emptyText}</Text>
      )}
    </GlassPanel>
  );
}

const styles = StyleSheet.create({
  panel: { borderRadius: 20, paddingBottom: 8 },
  heading: { padding: 16, gap: 4 },
  title: { color: 'rgba(235, 235, 245, 0.72)', fontSize: 17, fontWeight: '600' },
  subtitle: { color: colors.textMuted, fontSize: 14 },
  row: { height: 52, flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, gap: 14 },
  separator: { borderTopColor: colors.separator, borderTopWidth: 1 },
  icon: { width: 22, height: 22, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  item: { color: colors.text, fontSize: 17 },
  empty: { color: colors.textMuted, paddingHorizontal: 16, paddingBottom: 18, fontStyle: 'italic' },
});
