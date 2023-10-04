import * as React from "react";
import { ImageBackground, StyleSheet } from "react-native";
const bg = require("../assets/images/bg.jpg");
import { Box, Center, Avatar, Text, Icon } from "native-base";
import { Image, Dimensions, View } from "react-native";
const { width } = Dimensions.get("screen");
import { MaterialIcons } from "@expo/vector-icons";
import {
  DrawerItemList,
  DrawerItem,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
const ratio = (width * 0.4) / 270;

const CustomDrawer = (props: any) => {
  return (
    <Box flex={1}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.image}>
        <DrawerContentScrollView {...props}>
          <Center>
            <Image
              source={require("../assets/images/logoBlanco.png")}
              style={styles.logo}
            />
          </Center>
          <Box marginTop={2} flexDir={"row"}>
            <Avatar
              bg="blue.300"
              source={{
                uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            >
              AJ
            </Avatar>
            <Box>
              <Text color={"white"} marginLeft={2}>
                Pedro Perez
              </Text>
              <Text color={"white"} marginLeft={2} italic maxWidth={190}>
                Takashi.onimaru@gmail.com
              </Text>
            </Box>
          </Box>
          <Box marginTop={5}>
            <DrawerItemList {...props} />
          </Box>
        </DrawerContentScrollView>
        <View
          style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}
        >
          <DrawerItem
            icon={({ focused, color, size }) => (
              <Icon
                as={<MaterialIcons name="arrow-back" />}
                size={6}
                color={"white"}
              />
            )}
            activeTintColor="white"
            inactiveTintColor="white"
            label={"Logout"}
            onPress={() => {}}
          />
        </View>
      </ImageBackground>
    </Box>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  logo: {
    width: width * 0.4,
    height: 100 * ratio,
    resizeMode: "contain",
    marginBottom: 15,
  },
});

export default CustomDrawer;
