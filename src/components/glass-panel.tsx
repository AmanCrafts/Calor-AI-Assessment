import { BlurView } from 'expo-blur';
import { GlassStyle, GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type GlassPanelProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  intensity?: number;
  variant?: 'card' | 'pill';
  interactive?: boolean;
  tintColor?: string;
  glassStyle?: GlassStyle;
}>;

export function GlassPanel({
  children,
  style,
  intensity = 80,
  variant = 'card',
  interactive = false,
  tintColor,
  glassStyle = 'regular',
}: GlassPanelProps) {
  const radiusStyle = variant === 'pill' ? styles.pill : styles.card;
  const panelStyle = [styles.panel, radiusStyle, style];

  if (isLiquidGlassAvailable()) {
    return (
      <GlassView
        colorScheme="dark"
        glassEffectStyle={glassStyle}
        isInteractive={interactive}
        style={panelStyle}
        tintColor={tintColor}>
        {children}
      </GlassView>
    );
  }

  if (process.env.EXPO_OS === 'ios') {
    return (
      <BlurView intensity={intensity} tint="systemMaterialDark" style={[panelStyle, styles.blurFallback]}>
        {children}
      </BlurView>
    );
  }

  return (
    <View style={[panelStyle, styles.androidFallback]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    overflow: 'hidden',
    boxShadow: '0 16px 36px rgba(0, 0, 0, 0.28)',
  },
  card: { borderRadius: 34, borderCurve: 'continuous' },
  pill: { borderRadius: 999 },
  blurFallback: {
    borderColor: 'rgba(255, 255, 255, 0.24)',
    borderWidth: 1,
    backgroundColor: 'rgba(5, 8, 7, 0.38)',
  },
  androidFallback: {
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    backgroundColor: 'rgba(25, 29, 28, 0.92)',
  },
});
