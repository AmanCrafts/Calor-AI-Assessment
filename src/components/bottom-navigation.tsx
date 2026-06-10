import { GlassPanel } from '@/src/components/glass-panel';
import { colors, layout } from '@/src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { GlassContainer } from 'expo-glass-effect';
import { Href, usePathname, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  clamp,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const tabs: { label: string; icon: keyof typeof Ionicons.glyphMap; href: Href }[] = [
  { label: 'Start', icon: 'home-outline', href: '/' },
  { label: 'FAQ', icon: 'help-circle-outline', href: '/faq' },
  { label: 'Taste Profile', icon: 'restaurant-outline', href: '/results' },
];

const spring = {
  damping: 19,
  stiffness: 210,
  mass: 0.75,
};

const navigationGlassTint = 'rgba(204, 204, 204, 0.11)';

export function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const activeIndex = tabs.findIndex((tab) => pathname === tab.href);
  const tabWidth = useSharedValue(0);
  const selectionX = useSharedValue(0);
  const dragStartX = useSharedValue(0);
  const dragScale = useSharedValue(1);
  const dragIndex = useSharedValue(Math.max(activeIndex, 0));
  const searchScale = useSharedValue(pathname === '/search' ? 1.06 : 1);

  useEffect(() => {
    if (activeIndex >= 0) {
      selectionX.value = withSpring(activeIndex * tabWidth.value, spring);
      dragIndex.value = activeIndex;
    }
    searchScale.value = withSpring(pathname === '/search' ? 1.06 : 1, spring);
  }, [activeIndex, dragIndex, pathname, searchScale, selectionX, tabWidth]);

  const onTabsLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width / tabs.length;
    tabWidth.value = width;
    selectionX.value = activeIndex >= 0 ? activeIndex * width : 0;
  };

  const navigate = (href: Href, haptic = true) => {
    if (haptic) {
      void Haptics.selectionAsync();
    }
    router.replace(href);
  };

  const previewTab = () => {
    void Haptics.selectionAsync();
  };

  const dropOnTab = (index: number) => {
    navigate(tabs[index].href, false);
  };

  const selectionStyle = useAnimatedStyle(() => ({
    width: tabWidth.value,
    transform: [{ translateX: selectionX.value }, { scale: dragScale.value }],
  }));

  const searchStyle = useAnimatedStyle(() => ({
    transform: [{ scale: searchScale.value }],
  }));

  const dragGesture = Gesture.Pan()
    .minDistance(1)
    .onBegin(() => {
      dragStartX.value = selectionX.value;
      dragScale.value = withSpring(1.08, spring);
    })
    .onUpdate((event) => {
      const maxX = tabWidth.value * (tabs.length - 1);
      selectionX.value = clamp(dragStartX.value + event.translationX, 0, maxX);

      const nextIndex = tabWidth.value ? Math.round(selectionX.value / tabWidth.value) : 0;
      if (nextIndex !== dragIndex.value) {
        dragIndex.value = nextIndex;
        runOnJS(previewTab)();
      }
    })
    .onEnd((event) => {
      const maxIndex = tabs.length - 1;
      const projectedX = selectionX.value + event.velocityX * 0.08;
      const nextIndex = tabWidth.value ? clamp(Math.round(projectedX / tabWidth.value), 0, maxIndex) : 0;
      selectionX.value = withSpring(nextIndex * tabWidth.value, spring);
      dragScale.value = withSpring(1, spring);
      runOnJS(dropOnTab)(nextIndex);
    })
    .onFinalize(() => {
      dragScale.value = withSpring(1, spring);
    });

  return (
    <View pointerEvents="box-none" style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <GlassContainer spacing={18} style={styles.row}>
        <GestureDetector gesture={dragGesture}>
          <View style={styles.bar}>
            <GlassPanel
              intensity={86}
              tintColor={navigationGlassTint}
              variant="pill"
              style={[StyleSheet.absoluteFill, styles.navigationGlass]}
            />

            <Animated.View pointerEvents="none" style={[styles.selection, selectionStyle]}>
              <GlassPanel
                glassStyle="clear"
                intensity={100}
                variant="pill"
                style={styles.selectionGlass}
              />
            </Animated.View>

            <View onLayout={onTabsLayout} style={styles.tabs}>
              {tabs.map((tab, index) => {
                const active = activeIndex === index;
                return (
                  <Pressable
                    accessibilityRole="tab"
                    accessibilityState={{ selected: active }}
                    key={tab.label}
                    onPress={() => navigate(tab.href)}
                    style={({ pressed }) => [styles.tab, pressed && styles.pressed]}>
                    <Ionicons color={active ? colors.green : colors.textSoft} name={tab.icon} size={20} />
                    <Text style={[styles.label, active && styles.activeLabel]}>{tab.label}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </GestureDetector>

        <Pressable
          accessibilityLabel="Search"
          onPress={() => navigate('/search')}
          onPressIn={() => {
            searchScale.value = withSpring(0.91, spring);
          }}
          onPressOut={() => {
            searchScale.value = withSpring(pathname === '/search' ? 1.06 : 1, spring);
          }}>
          <Animated.View style={searchStyle}>
            <GlassPanel
              interactive
              intensity={86}
              tintColor={navigationGlassTint}
              variant="pill"
              style={[styles.search, pathname === '/search' && styles.activeSearch]}>
              <Ionicons color={pathname === '/search' ? colors.green : colors.textSoft} name="search" size={23} />
            </GlassPanel>
          </Animated.View>
        </Pressable>
      </GlassContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: layout.horizontalPadding,
    right: layout.horizontalPadding,
    bottom: 0,
    alignItems: 'center',
    zIndex: 100,
  },
  row: {
    width: '100%',
    maxWidth: 402,
    height: 95,
    paddingHorizontal: 25,
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  bar: {
    flex: 1,
    height: 62,
    padding: 4,
    borderRadius: 999,
  },
  navigationGlass: {
    backgroundColor: 'rgba(255, 255, 255, 0.025)',
    borderColor: 'rgba(255, 255, 255, 0.14)',
    borderWidth: 1,
  },
  tabs: {
    flex: 1,
    flexDirection: 'row',
  },
  selection: {
    position: 'absolute',
    left: 4,
    top: 4,
    height: 54,
    paddingHorizontal: 1,
  },
  selectionGlass: {
    flex: 1,
    backgroundColor: 'rgba(18, 18, 18, 0.76)',
    borderColor: 'rgba(255, 255, 255, 0.065)',
    borderWidth: 1,
  },
  tab: {
    flex: 1,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  label: { color: colors.textSoft, fontSize: 10, fontWeight: '600' },
  activeLabel: { color: colors.green },
  search: {
    width: 62,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.025)',
    borderColor: 'rgba(255, 255, 255, 0.14)',
    borderWidth: 1,
  },
  activeSearch: {
    backgroundColor: 'rgba(18, 18, 18, 0.45)',
  },
  pressed: { opacity: 0.7, transform: [{ scale: 0.94 }] },
});
