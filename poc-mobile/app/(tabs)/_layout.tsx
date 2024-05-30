import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useTheme } from "styled-components/native";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "laptop" : "laptop-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
