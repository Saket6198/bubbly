import { formatLastMessageTime } from "@/utils/formatDates";
import { ImageIcon } from "phosphor-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Avatar from "./Avatar";

const ConversationItem = ({ key, item, router, showDivider }: any) => {
  const lastMessageTime = formatLastMessageTime(item?.lastMessage);

  return (
    <View>
      <TouchableOpacity className="flex flex-row gap-4 my-3 items-center">
        <Avatar uri={null} isGroup={item?.type === "group"} size={50} />
        <View className="flex-1">
          <View className="flex flex-row justify-between items-center">
            <Text className="font-semibold text-base">{item?.name}</Text>
            <Text className="text-gray-500 text-sm">{lastMessageTime}</Text>
          </View>
          {item?.lastMessage?.content && (
            <Text className="text-gray-600 text-sm mt-1" numberOfLines={1}>
              {item?.type === "group" && (
                <>
                  {item?.lastMessage?.senderName}:{" "}
                  {item?.lastMessage?.content}{" "}
                </>
              )}
              {item?.type === "direct" && <>{item?.lastMessage?.content}</>}
            </Text>
          )}
          {item?.lastMessage?.attachment && (
            <Text className="text-gray-600 text-sm mt-1" numberOfLines={1}>
              {item?.type === "group" && (
                <>
                  <View className="flex flex-row items-center">
                    <Text style={{ fontSize: 12 }}>
                      {item?.lastMessage?.senderName}:{" "}
                    </Text>
                    <ImageIcon size={16} />
                    <Text className="ml-1">Image</Text>
                  </View>{" "}
                </>
              )}
              {item?.type === "direct" && (
                <View className="flex flex-row items-center">
                  <ImageIcon size={16} />
                  <Text className="ml-1">Image</Text>
                </View>
              )}
            </Text>
          )}
          {!item?.lastMessage?.createdAt && (
            <View className="flex flex-row items-center">
              <Text className="text-gray-600 text-sm mt-1">Say Yo! 👋🏼</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      {showDivider && <View className="h-px bg-gray-200 mx-4" />}
    </View>
  );
};

export default ConversationItem;
