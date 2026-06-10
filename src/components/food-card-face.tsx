import { GlassPanel } from '@/src/components/glass-panel';
import { categoryEmoji } from '@/src/constants/foods';
import { colors } from '@/src/constants/theme';
import { Food } from '@/src/types/food';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type FoodCardFaceProps = {
  food: Food;
  children?: React.ReactNode;
};

export function FoodCardFace({ food, children }: FoodCardFaceProps) {
  return (
    <GlassPanel intensity={42} style={styles.card}>
      <Image cachePolicy="memory-disk" contentFit="cover" source={{ uri: food.image }} style={styles.image} />
      <View style={styles.scrim} />
      {children}
      <View style={styles.copy}>
        <Text style={styles.emoji}>{categoryEmoji[food.category]}</Text>
        <Text style={styles.title}>{food.name}</Text>
        <Text style={styles.subtitle}>Would you enjoy eating this?</Text>
        <View style={styles.tags}>
          {food.tags.slice(0, 3).map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </GlassPanel>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, borderRadius: 40 },
  image: { ...StyleSheet.absoluteFillObject },
  scrim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.36)' },
  copy: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', padding: 28, paddingBottom: 42, gap: 10 },
  emoji: { fontSize: 52 },
  title: { color: colors.text, fontSize: 30, fontWeight: '700', textAlign: 'center' },
  subtitle: { color: colors.textSoft, fontSize: 17, textAlign: 'center' },
  tags: { flexDirection: 'row', gap: 7, paddingTop: 4 },
  tag: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: 'rgba(0, 0, 0, 0.42)' },
  tagText: { color: colors.textSoft, fontSize: 11, textTransform: 'capitalize' },
});
