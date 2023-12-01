import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Icon } from "native-base";

export const useOptions = (title: string, back: boolean, navigation: any) => {
  if (back) {
    return {
      headerShown: true,
      headerBackVisible: true,
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: "#2196F3",
      },
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
