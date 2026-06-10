import { GlassPanel } from '@/src/components/glass-panel';
import { colors } from '@/src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type SwipeActionButtonProps = {
  icon: ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress: () => void;
  color?: string;
  compact?: boolean;
  disabled?: boolean;
};

export function SwipeActionButton({
  icon,
  label,
  onPress,
  color = colors.textSoft,
  compact = false,
  disabled,
}: SwipeActionButtonProps) {
  const size = compact ? 50 : 72;

  return (
    <Pressable
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.pressable, compact && styles.compact, pressed && styles.pressed, disabled && styles.disabled]}>
      <GlassPanel style={[styles.circle, { width: size, height: size }]}>
        <Ionicons color={color} name={icon} size={compact ? 21 : 28} />
      </GlassPanel>
      <View style={styles.labelWrap}>
        <Text numberOfLines={1} style={styles.label}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: { width: 78, alignItems: 'center', gap: 10 },
  compact: { paddingTop: 22 },
  circle: { borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  labelWrap: { width: 82 },
  label: { color: colors.textDim, fontSize: 11, fontWeight: '600', textAlign: 'center' },
  pressed: { transform: [{ scale: 0.94 }], opacity: 0.8 },
  disabled: { opacity: 0.35 },
});
