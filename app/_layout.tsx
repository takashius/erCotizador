import FontAwesome from "@expo/vector-icons/FontAwesome";
import { TaskProvider } from "../components/helpers/TaskContext";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { NativeBaseProvider } from "native-base";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import common_en from "../translation/en.json";
import common_es from "../translation/es.json";
import { read, write } from "../components";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "/(drawer)/home",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const [locationUser, setLocationUser] = useState<string>('');

  useEffect(() => {
    getLocationEnv().then((response: string) => {
      setLocationUser(response);
    });
  }, [i18next.changeLanguage]);

  const getLocationEnv = async () => {
    let locationUser = await read("locationUser");
    if (!locationUser) {
      await write("locationUser", 'es');
      locationUser = 'es';
    }
    return locationUser;
  }

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (locationUser) {
      i18next.init({
        lng: locationUser,
        resources: {
          en: { translation: common_en },
          es: { translation: common_es },
        },
        compatibilityJSON: "v3",
        interpolation: {
          escapeValue: false,
        },
      });
    }
  }, [locationUser]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TaskProvider>
        <NativeBaseProvider>
          <I18nextProvider i18n={i18next}>
            <QueryClientProvider client={queryClient}>
              <AutocompleteDropdownContextProvider>
                <Stack>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
              </AutocompleteDropdownContextProvider>
            </QueryClientProvider>
          </I18nextProvider>
        </NativeBaseProvider>
      </TaskProvider>
    </GestureHandlerRootView>
  );
}
