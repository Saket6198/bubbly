import { useAuth } from "@/contexts/authContexts";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  const { signOut } = useAuth();
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={signOut}><Text>Sign out</Text></TouchableOpacity>
    </View>
  );
};
2;

export default Home;
