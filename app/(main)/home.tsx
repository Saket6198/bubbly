import { useAuth } from "@/contexts/authContexts";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Home = () => {
  const { signOut, user } = useAuth();

  return (
    <SafeAreaProvider className="flex flex-1">
      <View className="flex flex-row gap-4">
        <Text>Home</Text>
        <Text className="text-red-300">{user?.name}</Text>
        <TouchableOpacity onPress={signOut}>
          <Text>Sign out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
};

export default Home;
