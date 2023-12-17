import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { HamburgerIcon, Icon, Menu } from "native-base";
import { Pressable } from "react-native";
import { type MenuItem } from "../../types/general";

export const useOptions = (
  title: string,
  navigation: any,
  back: boolean = false,
  dropdown: boolean = false,
  menuItems: Array<MenuItem> = [
    { isDisabled: false, onPress: () => {}, title: "" },
  ]
) => {
  const DisplayMenu = (display = true) => {
    if (display) {
      return (
        <Menu
          w="190"
          trigger={(triggerProps) => {
            return (
              <Pressable
                accessibilityLabel="More options menu"
                {...triggerProps}
              >
                <HamburgerIcon style={{ color: "white" }} />
              </Pressable>
            );
          }}
        >
          {menuItems.map((item) => (
            <Menu.Item onPress={item.onPress} isDisabled={item.isDisabled}>
              {item.title}
            </Menu.Item>
          ))}
        </Menu>
      );
    } else {
      return false;
    }
  };

  if (back) {
    return {
      headerShown: true,
      headerBackVisible: true,
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: "#2196F3",
      },
      headerRight: () => DisplayMenu(dropdown),
      headerTintColor: "white",
      title,
    };
  } else {
    return {
      headerShown: true,
      headerBackVisible: true,
      headerStyle: {
        backgroundColor: "#2196F3",
      },
      headerRight: () => DisplayMenu(dropdown),
      headerTintColor: "white",
      title,
      headerLeft: () => {
        return (
          <Icon
            onPress={() => {
              navigation.openDrawer();
            }}
            as={<AntDesign name="appstore-o" />}
            size={6}
            color={"white"}
          />
        );
      },
    };
  }
};
