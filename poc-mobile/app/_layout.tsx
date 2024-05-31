import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { ThemeProvider } from "styled-components/native";
import { theme } from "../providers/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableLayoutAnimations } from "react-native-reanimated";
import { SessionProvider } from "@/providers/auth/context";
import { ApolloProvider } from "@/providers/apollo";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // fix for bad reanimated code causing android issues
  enableLayoutAnimations(false);

  return (
    <SessionProvider>
      <ApolloProvider>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <Slot />
          </SafeAreaProvider>
        </ThemeProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
