import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View, ActivityIndicator } from 'react-native';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    const handleInitialization = async () => {
      try {
        if (error) {
          console.error('Font loading error:', error);
          // Handle font loading error - you might want to continue anyway
          await SplashScreen.hideAsync();
          return;
        }

        if (loaded) {
          // If everything is loaded, hide the splash screen
          await SplashScreen.hideAsync();
          // Optionally, redirect to home if that's your default route
          router.replace('/home');
        }
      } catch (e) {
        console.error('Error during initialization:', e);
        await SplashScreen.hideAsync();
      }
    };

    handleInitialization();
  }, [loaded, error, router]);

  // Show a loading state while fonts are loading
  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }} 
      />
    </Stack>
  );
}