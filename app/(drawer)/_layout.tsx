import { Drawer } from "expo-router/drawer";
import CustomDrawer from "../../components/CustomDrawer";
import { Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

export default function Layout() {
  const { t } = useTranslation();
  return (
    <Drawer
      screenOptions={{
        drawerType: "slide",
        drawerStyle: {
          flex: 1,
          width: "70%",
          borderRightWidth: 0,
          backgroundColor: "#1d68b5",
        },
        headerStyle: {
          backgroundColor: "#2196F3",
        },
        headerTintColor: "white",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="home"
        options={{
          headerShown: false,
          drawerLabel: t("modules.cotiza"),
          title: t("modules.cotiza"),
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "white",
          drawerIcon: ({ focused, size }): ReactNode => (
            <Icon
              as={<MaterialIcons name="receipt" />}
              size={6}
              color={"white"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="customer"
        options={{
          headerShown: false,
          drawerLabel: t("modules.customer"),
          title: t("modules.customer"),
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "white",
          drawerIcon: ({ focused, size }): ReactNode => (
            <Icon
              as={<MaterialIcons name="person" />}
              size={6}
              color={"white"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="products"
        options={{
          headerShown: false,
          drawerLabel: t("modules.product"),
          title: t("modules.product"),
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "white",
          drawerIcon: ({ focused, size }): ReactNode => (
            <Icon
              as={<MaterialIcons name="local-offer" />}
              size={6}
              color={"white"}
            />
          ),
        }}
      />
    </Drawer>
  );
}
