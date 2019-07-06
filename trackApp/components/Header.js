import React from "react";
import { View, Text } from "react-native";
export default function Header() {
  return (
    <View
      style={{
        flex: 2,
        backgroundColor: "#db3132",
        justifyContent: "center"
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 50,
          textAlign: "center",
          fontWeight: "bold",
          fontFamily: "Times new roman",
          textShadowOffset: { width: -2, height: 2 },
          textShadowRadius: 1,
          textShadowColor: "#000"
        }}
      >
        Track App
      </Text>
    </View>
  );
}
