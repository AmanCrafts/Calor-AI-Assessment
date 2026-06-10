import { BottomNavigation } from '@/src/components/bottom-navigation';
import { TasteProfileProvider } from '@/src/context/taste-profile-context';
import { Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const pathname = usePathname();
  const showBottomNavigation = ['/', '/faq', '/results', '/search'].includes(pathname);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <TasteProfileProvider>
          <StatusBar style="light" />
          <Stack screenOptions={{ headerShown: false, animation: 'none', contentStyle: { backgroundColor: '#090909' } }}>
            <Stack.Screen
              name="swipe"
              options={{
                animation: 'slide_from_right',
                animationDuration: 320,
                animationMatchesGesture: true,
                gestureEnabled: true,
                fullScreenGestureEnabled: true,
              }}
            />
          </Stack>
          {showBottomNavigation ? <BottomNavigation /> : null}
        </TasteProfileProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
