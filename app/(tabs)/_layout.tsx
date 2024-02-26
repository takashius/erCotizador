import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { t } from "i18next";
import { ReactNode } from "react";
import { Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{}}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: t("modules.cotiza"),
          title: t("modules.cotiza"),
          tabBarActiveTintColor: "#1d68b5",
          tabBarInactiveTintColor: "#2196F3",
          tabBarIcon: ({ color, size }): ReactNode => (
            <Icon
              as={<MaterialIcons name="receipt" />}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="customer"
        options={{
          headerShown: false,
          tabBarLabel: t("modules.customer"),
          title: t("modules.customer"),
          tabBarActiveTintColor: "#1d68b5",
          tabBarInactiveTintColor: "#2196F3",
          tabBarIcon: ({ color, size }): ReactNode => (
            <Icon
              as={<MaterialIcons name="person" />}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          headerShown: false,
          tabBarLabel: t("modules.product"),
          title: t("modules.product"),
          tabBarActiveTintColor: "#1d68b5",
          tabBarInactiveTintColor: "#2196F3",
          tabBarIcon: ({ color, size }): ReactNode => (
            <Icon
              as={<MaterialIcons name="local-offer" />}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          tabBarLabel: t("modules.settings"),
          title: t("modules.settings"),
          tabBarActiveTintColor: "#1d68b5",
          tabBarInactiveTintColor: "#2196F3",
          tabBarIcon: ({ color, size }): ReactNode => (
            <Icon
              as={<MaterialIcons name="app-settings-alt" />}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}