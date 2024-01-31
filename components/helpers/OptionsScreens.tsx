import React from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Row, HamburgerIcon, Icon, Menu, Text } from "native-base";
import { Pressable } from "react-native";
import { type MenuItem } from "../../types/general";
import { router } from "expo-router";

export const useOptions = ({
  title,
  navigation,
  back = false,
  edit = false,
  dropdown = false,
  menuItems,
  editAction
}: {
  title: string,
  navigation: any,
  back?: boolean,
  edit?: boolean,
  dropdown?: boolean,
  menuItems?: Array<MenuItem>,
  editAction?: any
}
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
          {menuItems && menuItems.map((item) => (
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

  const displayRight = () => (
    <Row>
      {edit && <Icon
        onPress={() => editAction()}
        as={<AntDesign name="edit" />}
        size={6}
        color={"white"}
      />}
      {DisplayMenu(dropdown)}
    </Row>
  )

  const renderTitle = () => (
    <Text ml="1.5" color={'white'} fontWeight={"semibold"} fontSize={"md"}>{title}</Text>
  )

  if (back) {
    return {
      headerShown: true,
      headerBackVisible: false,
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: "#2196F3",
      },
      headerRight: () => displayRight(),
      headerTitle: () => renderTitle(),
      headerLeft: () => {
        return (
          <Icon
            onPress={() => {
              router.back();
            }}
            as={<MaterialCommunityIcons name="backburger" />}
            size={6}
            color={"white"}
          />
        );
      },
    };
  } else {
    return {
      headerShown: true,
      headerBackVisible: true,
      headerStyle: {
        backgroundColor: "#2196F3",
      },
      headerRight: () => displayRight(),
      headerTitle: () => renderTitle(),
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
