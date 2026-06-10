import { colors } from '@/src/constants/theme';
import { GlassPanel } from '@/src/components/glass-panel';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

type IconName = ComponentProps<typeof Ionicons>['name'];

type IconButtonProps = {
  icon: IconName;
  onPress: () => void;
  accessibilityLabel: string;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export function IconButton({
  icon,
  onPress,
  accessibilityLabel,
  color = colors.textSoft,
  size = 20,
  style,
  disabled,
}: IconButtonProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.pressable, style, pressed && styles.pressed, disabled && styles.disabled]}>
      <GlassPanel interactive intensity={82} tintColor="rgba(255, 255, 255, 0.04)" variant="pill" style={styles.button}>
        <Ionicons color={color} name={icon} size={size} />
      </GlassPanel>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: 44,
    height: 44,
    borderRadius: 999,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.82 },
  disabled: { opacity: 0.35 },
});
