import { BlurView } from 'expo-blur';
import {
  GlassStyle,
  GlassView,
  isLiquidGlassAvailable,
} from 'expo-glass-effect';
import { PropsWithChildren } from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

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
  intensity = 75,
  variant = 'card',
  interactive = false,
  tintColor = 'rgba(255, 255, 255, 0.08)',
  glassStyle = 'regular',
}: GlassPanelProps) {
  const isPill = variant === 'pill';

  const containerStyle = [
    styles.surface,
    isPill ? styles.pillShape : styles.cardShape,
    style,
  ];

  if (isLiquidGlassAvailable()) {
    return (
      <GlassView
        colorScheme="dark"
        glassEffectStyle={glassStyle}
        isInteractive={interactive}
        tintColor={tintColor}
        style={containerStyle}
      >
        {children}
      </GlassView>
    );
  }

  if (Platform.OS === 'ios') {
    return (
      <BlurView
        intensity={intensity}
        tint="dark"
        style={[containerStyle, styles.iosGlass]}
      >
        {children}
      </BlurView>
    );
  }

  return (
    <View style={[containerStyle, styles.solidFallback]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowOpacity: 0.26,
    shadowRadius: 28,

    elevation: 10,
  },

  cardShape: {
    borderRadius: 30,
    borderCurve: 'continuous',
  },

  pillShape: {
    borderRadius: 1000,
  },

  iosGlass: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.28)',
    backgroundColor: 'rgba(10, 14, 13, 0.34)',
  },

  solidFallback: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    backgroundColor: 'rgba(18, 23, 22, 0.9)',
  },
});