import ConversationItem from "@/components/ConversationItem";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors } from "@/constants/theme";
import { useAuth } from "@/contexts/authContexts";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import { GearIcon, PlusIcon } from "phosphor-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Home = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const conversationList = [
    {
      name: "Alice",
      type: "direct",
      lastMessage: {
        // senderName: "Alice",
        // content: "Hey! How's it going?",
        // timestamp: "2025-06-22T18:45:00Z",
      },
    },
    {
      name: "Bob",
      type: "direct",
      lastMessage: {
        senderName: "Bob",
        content: "Are we meeting tomorrow?",
        createdAt: "2025-06-22T17:30:00Z",
      },
    },
    {
      name: "Saket",
      type: "direct",
      lastMessage: {
        senderName: "Saket",
        attachment: { image: "uri" },
        createdAt: "2025-06-22T17:30:00Z",
      },
    },

    {
      name: "Project Team",
      type: "group",
      lastMessage: {
        senderName: "Charlie",
        attachment: { image: "uri" },
        // content: "The deadline has been moved to Friday",
        createdAt: "2025-06-22T16:15:00Z",
      },
    },
    {
      name: "Carol",
      type: "direct",
      lastMessage: {
        senderName: "Carol",
        content: "Thanks for the help!",
        createdAt: "2025-06-22T15:20:00Z",
      },
    },
    {
      name: "Family Group",
      type: "group",
      lastMessage: {
        senderName: "David",
        content: "Dinner at 7pm tonight?",
        createdAt: "2025-06-22T14:10:00Z",
      },
    },
    {
      name: "Study Buddies",
      type: "group",
      lastMessage: {
        senderName: "Eve",
        content: "Exam prep session tomorrow",
        createdAt: "2025-06-22T13:05:00Z",
      },
    },
  ];

  let directConversations = conversationList
    .filter((item) => item.type === "direct")
    .sort((a: any, b: any) => {
      const aDate = a?.lastMessage?.createdAt || a.createdAt;
      const bDate = b?.lastMessage?.createdAt || b.createdAt;
      return new Date(bDate).getTime() - new Date(aDate).getTime();
    });

  // let directConversations = [];

  let groupConversations = conversationList
    .filter((item) => item.type === "group")
    .sort((a: any, b: any) => {
      const aDate = a?.lastMessage?.createdAt || a.createdAt;
      const bDate = b?.lastMessage?.createdAt || b.createdAt;
      return new Date(bDate).getTime() - new Date(aDate).getTime();
    });
  // let groupConversations = [];
  return (
    <SafeAreaProvider className="flex flex-1">
      <ScreenWrapper
        style={{ flex: 1 }}
        showPattern={true}
        preventPatternOverlay={true}
        bgOpacity={0.5}
      >
        <View className="flex flex-row justify-between items-center w-full px-3 pt-3">
          <Text
            style={{ fontSize: widthPercentageToDP("5%") }}
            className="text-gray-400 font-semibold"
          >
            Welcome Back, {user?.name}
          </Text>
          <TouchableOpacity
            className="p-1"
            accessibilityLabel="settings"
            onPress={() => router.push("/(main)/settingsModal")}
          >
            <GearIcon size={24} color={"white"} />
          </TouchableOpacity>
        </View>
        <View
          style={{ backgroundColor: "#ffffff" }}
          className="flex flex-1 mt-10 rounded-t-[60px] p-5"
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex flex-row gap-4 justify-center items-center">
              <TouchableOpacity
                className="rounded-full py-3 px-5 bg-gray-400"
                onPress={() => setSelectedTab(0)}
                style={{
                  backgroundColor: selectedTab === 0 ? "#FFD700" : "#D3D3D3",
                }}
              >
                <Text>Direct Messages</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="rounded-full py-3 px-5 bg-gray-400"
                onPress={() => setSelectedTab(1)}
                style={{
                  backgroundColor: selectedTab === 1 ? "#FFD700" : "#D3D3D3",
                }}
              >
                <Text>Groups</Text>
              </TouchableOpacity>
            </View>
            <View className="mt-10">
              {loading ? (
                <Text>Loading...</Text>
              ) : (
                <>
                  {selectedTab === 0 &&
                    directConversations.map((item, index) => (
                      <ConversationItem
                        key={index}
                        item={item}
                        router={router}
                        showDivider={directConversations.length !== index + 1}
                      />
                    ))}
                  {selectedTab === 1 &&
                    groupConversations.map((item, index) => (
                      <ConversationItem
                        key={index}
                        item={item}
                        router={router}
                        showDivider={groupConversations.length !== index + 1}
                      />
                    ))}
                </>
              )}
            </View>
            {!loading &&
              selectedTab === 0 &&
              directConversations.length == 0 && (
                <Text className="text-center">
                  You don't have any messages yet. Hit the "+" button at the
                  bottom and start a new conversation!
                </Text>
              )}
            {!loading &&
              selectedTab === 1 &&
              groupConversations.length == 0 && (
                <Text className="text-center">
                  You haven't joined any groups yet!
                </Text>
              )}
          </ScrollView>
        </View>
        <TouchableOpacity
          className="bg-yellow-300 items-center justify-center"
          style={{
            height: verticalScale(50),
            width: verticalScale(50),
            borderRadius: 100,
            position: "absolute",
            bottom: verticalScale(30),
            right: verticalScale(30),
          }}
          onPress={() => {
            router.push({
              pathname: "/(main)/newConversationModal",
              params: { isGroup: selectedTab },
            });
          }}
        >
          <PlusIcon size={32} weight={"bold"} color={colors.black} />
        </TouchableOpacity>
      </ScreenWrapper>
    </SafeAreaProvider>
  );
};

export default Home;
