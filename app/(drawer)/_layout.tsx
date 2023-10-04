import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer
      screenOptions={{
        drawerType: "slide",
        drawerStyle: {
          flex: 1,
          width: "60%",
          borderRightWidth: 0,
          backgroundColor: "transparent",
        },
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          drawerLabel: "Home",
          title: "Home",
        }}
      />
    </Drawer>
  );
}
