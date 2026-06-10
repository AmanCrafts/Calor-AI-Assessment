import { colors } from '@/src/constants/theme';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({ title, onPress, style }: PrimaryButtonProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.button, style, pressed && styles.pressed]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 173,
    height: 52,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    backgroundColor: colors.green,
  },
  pressed: { transform: [{ scale: 0.97 }], opacity: 0.86 },
  text: { color: '#000000', fontSize: 16, lineHeight: 21, fontWeight: '700', letterSpacing: -0.31 },
});
