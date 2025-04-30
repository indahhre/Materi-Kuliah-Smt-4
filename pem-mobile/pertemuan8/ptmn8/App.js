import React, { useState } from "react";
import { SafeAreaView, Text, View, Switch } from "react-native-web";
import tw from "twrnc";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <SafeAreaView style={tw`flex-1 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <View style={tw`flex-1 items-center justify-center`}>
        <Text
          style={tw`text-3xl font-bold ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Hai Indang!
        </Text>
        <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
      </View>
    </SafeAreaView>
  );
}