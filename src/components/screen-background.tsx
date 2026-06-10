import { colors } from '@/src/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

export function ScreenBackground({ children }: PropsWithChildren) {
  return (
    <LinearGradient colors={[colors.backgroundTop, colors.backgroundBottom]} style={styles.container}>
      <View pointerEvents="none" style={styles.orbs}>
        <View style={[styles.orb, styles.greenOrb]} />
        <View style={[styles.orb, styles.blueOrb]} />
      </View>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, overflow: 'hidden' },
  orbs: {
    position: 'absolute',
    width: 757,
    height: 774,
    left: '50%',
    top: 28,
    transform: [{ translateX: -322 }],
  },
  orb: {
    position: 'absolute',
    borderRadius: 999,
  },
  blueOrb: {
    width: 190,
    height: 190,
    left: 0,
    top: 0,
    backgroundColor: 'rgba(46, 181, 255, 0.10)',
    boxShadow: '0 0 60px 30px rgba(46, 181, 255, 0.10)',
  },
  greenOrb: {
    width: 450,
    height: 500,
    left: 281,
    top: 254,
    backgroundColor: 'rgba(75, 216, 131, 0.10)',
    boxShadow: '0 0 58px 29px rgba(75, 216, 131, 0.10)',
  },
});
