import * as React from "react";
import styled from "styled-components/native";
import { Dimensions, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Hero } from "../../../components/@common/hero";
import { FullScreen } from "../../../components/@common/layout";
import { StatusBar } from "expo-status-bar";

import { Text } from "../../../components/@common/typography/text";
import { spacing16 } from "../../../components/@common/spacing";
import { PrimaryButton } from "@/components/@common/buttons/primary";

const HeroContent = styled(View)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${spacing16};
`;

export default function WelcomeScreen() {
  const router = useRouter();

  const { bottom } = useSafeAreaInsets();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <StatusBar hidden={true} />

      <FullScreen>
        <Hero source={require("../../../assets/images/white-walls.jpg")}>
          <HeroContent
            style={{
              paddingTop: Dimensions.get("window").height * 0.16,
              paddingBottom: 16 + bottom,
            }}
          >
            <BigTitle>POC</BigTitle>
            <PrimaryButton
              onPress={() => {
                // no op
                console.log("pressed!");
              }}
            >
              Login
            </PrimaryButton>
          </HeroContent>
        </Hero>
      </FullScreen>
    </>
  );
}

const BigTitle = styled(Text)`
  color: #fff;
  text-align: center;
  font-size: ${Dimensions.get("screen").height < 800 ? 20 : 25}px;
  font-weight: 700;
  padding: 0 ${spacing16};
  line-height: ${Dimensions.get("screen").height < 800 ? 25 : 35}px;
`;
