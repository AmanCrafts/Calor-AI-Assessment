import { GlassPanel } from '@/src/components/glass-panel';
import { colors, layout } from '@/src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { GlassContainer } from 'expo-glass-effect';
import { Href, usePathname, useRouter } from 'expo-router';
import { useEffect } from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  clamp,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NAV_ITEMS: { label: string; icon: keyof typeof Ionicons.glyphMap; href: Href }[] = [
  { label: 'Start', icon: 'home-outline', href: '/' },
  { label: 'FAQ', icon: 'help-circle-outline', href: '/faq' },
  { label: 'Taste Profile', icon: 'restaurant-outline', href: '/results' },
];

const springConfig = {
  damping: 21,
  stiffness: 195,
  mass: 0.8,
};

const GLASS_TINT = 'rgba(220, 220, 220, 0.1)';

export function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const selectedTab = NAV_ITEMS.findIndex((item) => pathname === item.href);
  const currentTab = selectedTab === -1 ? 0 : selectedTab;

  const itemWidth = useSharedValue(0);
  const indicatorLeft = useSharedValue(0);
  const gestureStartLeft = useSharedValue(0);
  const indicatorScale = useSharedValue(1);
  const lastPreviewedIndex = useSharedValue(currentTab);
  const searchButtonScale = useSharedValue(pathname === '/search' ? 1.05 : 1);

  useEffect(() => {
    if (selectedTab !== -1) {
      indicatorLeft.value = withSpring(selectedTab * itemWidth.value, springConfig);
      lastPreviewedIndex.value = selectedTab;
    }

    searchButtonScale.value = withSpring(
      pathname === '/search' ? 1.05 : 1,
      springConfig,
    );
  }, [
    selectedTab,
    pathname,
    indicatorLeft,
    itemWidth,
    lastPreviewedIndex,
    searchButtonScale,
  ]);

  const handleTabsLayout = (event: LayoutChangeEvent) => {
    const nextWidth = event.nativeEvent.layout.width / NAV_ITEMS.length;

    itemWidth.value = nextWidth;
    indicatorLeft.value = selectedTab >= 0 ? selectedTab * nextWidth : 0;
  };

  const goToRoute = (href: Href, shouldHaptic = true) => {
    if (shouldHaptic) {
      void Haptics.selectionAsync();
    }

    router.replace(href);
  };

  const notifyTabPreview = () => {
    void Haptics.selectionAsync();
  };

  const commitTabChange = (index: number) => {
    goToRoute(NAV_ITEMS[index].href, false);
  };

  const indicatorStyle = useAnimatedStyle(() => ({
    width: itemWidth.value,
    transform: [
      { translateX: indicatorLeft.value },
      { scale: indicatorScale.value },
    ],
  }));

  const floatingSearchStyle = useAnimatedStyle(() => ({
    transform: [{ scale: searchButtonScale.value }],
  }));

  const tabPanGesture = Gesture.Pan()
    .minDistance(1)
    .onBegin(() => {
      gestureStartLeft.value = indicatorLeft.value;
      indicatorScale.value = withSpring(1.07, springConfig);
    })
    .onUpdate((event) => {
      const rightLimit = itemWidth.value * (NAV_ITEMS.length - 1);

      indicatorLeft.value = clamp(
        gestureStartLeft.value + event.translationX,
        0,
        rightLimit,
      );

      const hoveredIndex = itemWidth.value
        ? Math.round(indicatorLeft.value / itemWidth.value)
        : 0;

      if (hoveredIndex !== lastPreviewedIndex.value) {
        lastPreviewedIndex.value = hoveredIndex;
        runOnJS(notifyTabPreview)();
      }
    })
    .onEnd((event) => {
      const finalIndex = itemWidth.value
        ? clamp(
            Math.round(
              (indicatorLeft.value + event.velocityX * 0.075) /
                itemWidth.value,
            ),
            0,
            NAV_ITEMS.length - 1,
          )
        : 0;

      indicatorLeft.value = withSpring(finalIndex * itemWidth.value, springConfig);
      indicatorScale.value = withSpring(1, springConfig);

      runOnJS(commitTabChange)(finalIndex);
    })
    .onFinalize(() => {
      indicatorScale.value = withSpring(1, springConfig);
    });

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.floatingWrapper,
        { paddingBottom: Math.max(insets.bottom, 14) },
      ]}
    >
      <GlassContainer spacing={16} style={styles.dock}>
        <GestureDetector gesture={tabPanGesture}>
          <View style={styles.tabRail}>
            <GlassPanel
              intensity={84}
              tintColor={GLASS_TINT}
              variant="pill"
              style={[StyleSheet.absoluteFill, styles.railGlass]}
            />

            <Animated.View
              pointerEvents="none"
              style={[styles.activeIndicator, indicatorStyle]}
            >
              <GlassPanel
                glassStyle="clear"
                intensity={98}
                variant="pill"
                style={styles.indicatorGlass}
              />
            </Animated.View>

            <View onLayout={handleTabsLayout} style={styles.tabList}>
              {NAV_ITEMS.map((item, index) => {
                const isActive = selectedTab === index;

                return (
                  <Pressable
                    key={item.label}
                    accessibilityRole="tab"
                    accessibilityState={{ selected: isActive }}
                    onPress={() => goToRoute(item.href)}
                    style={({ pressed }) => [
                      styles.navItem,
                      pressed && styles.navItemPressed,
                    ]}
                  >
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={isActive ? colors.green : colors.textSoft}
                    />

                    <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </GestureDetector>

        <Pressable
          accessibilityLabel="Search"
          onPress={() => goToRoute('/search')}
          onPressIn={() => {
            searchButtonScale.value = withSpring(0.92, springConfig);
          }}
          onPressOut={() => {
            searchButtonScale.value = withSpring(
              pathname === '/search' ? 1.05 : 1,
              springConfig,
            );
          }}
        >
          <Animated.View style={floatingSearchStyle}>
            <GlassPanel
              interactive
              intensity={84}
              tintColor={GLASS_TINT}
              variant="pill"
              style={[
                styles.searchButton,
                pathname === '/search' && styles.searchButtonActive,
              ]}
            >
              <Ionicons
                name="search"
                size={23}
                color={pathname === '/search' ? colors.green : colors.textSoft}
              />
            </GlassPanel>
          </Animated.View>
        </Pressable>
      </GlassContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingWrapper: {
    position: 'absolute',
    left: layout.horizontalPadding,
    right: layout.horizontalPadding,
    bottom: 0,
    alignItems: 'center',
    zIndex: 100,
  },

  dock: {
    width: '100%',
    maxWidth: 410,
    height: 94,
    paddingHorizontal: 22,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },

  tabRail: {
    flex: 1,
    height: 60,
    padding: 4,
    borderRadius: 999,
  },

  railGlass: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.13)',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },

  tabList: {
    flex: 1,
    flexDirection: 'row',
  },

  activeIndicator: {
    position: 'absolute',
    left: 4,
    top: 4,
    height: 52,
    paddingHorizontal: 1,
  },

  indicatorGlass: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.075)',
    backgroundColor: 'rgba(15, 17, 17, 0.72)',
  },

  navItem: {
    flex: 1,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },

  navItemPressed: {
    opacity: 0.72,
    transform: [{ scale: 0.95 }],
  },

  navLabel: {
    color: colors.textSoft,
    fontSize: 10,
    fontWeight: '600',
  },

  navLabelActive: {
    color: colors.green,
  },

  searchButton: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.13)',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },

  searchButtonActive: {
    backgroundColor: 'rgba(15, 17, 17, 0.5)',
  },
});
