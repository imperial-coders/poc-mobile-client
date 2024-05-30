import { ReactNode, useContext } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  RefreshControl,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import styled from "styled-components/native";
import { HeaderHeightContext } from "@react-navigation/elements";
import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";

import { useTheme } from "styled-components/native";
import { spacing20, spacing32 } from "../spacing";
import { useKeyboardHeight } from "../keyboard-height";

export function useNavHeaderHeight() {
  const height = useContext(HeaderHeightContext);

  if (height === undefined) {
    return 0;
  }

  return height;
}

export function useBottomNavHeight() {
  const height = useContext(BottomTabBarHeightContext);

  if (height === undefined) {
    return 0;
  }

  return height;
}

export const Screen = ({
  children,
  excludeHeaderHeight = false,
  onRefresh,
  isRefreshing = false,
  ...props
}: {
  children: ReactNode;
  excludeHeaderHeight?: boolean;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}) => {
  const { colors } = useTheme();
  return (
    <ScrollView
      keyboardShouldPersistTaps={"handled"}
      style={{
        backgroundColor: colors.base,
      }}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        ) : undefined
      }
    >
      <ScreenWithoutScrollView
        excludeHeaderHeight={excludeHeaderHeight}
        {...props}
      >
        {children}
      </ScreenWithoutScrollView>
    </ScrollView>
  );
};

export const ScreenWithoutScrollView = ({
  children,
  excludeHeaderHeight = false,
  ...props
}: {
  children: ReactNode;
  excludeHeaderHeight?: boolean;
}) => {
  const { top, bottom } = useSafeAreaInsets();
  const headerHeight = useNavHeaderHeight();
  const bottomBarHeight = useBottomNavHeight();

  const effectiveHeaderHeight = excludeHeaderHeight ? 0 : headerHeight;
  const effectiveFooterHeight = bottomBarHeight ?? 0;

  const { keyboardHeight } = useKeyboardHeight();

  const minHeight =
    Dimensions.get("window").height -
    effectiveHeaderHeight -
    effectiveFooterHeight -
    keyboardHeight;

  return (
    <>
      <ScreenContainer
        minHeight={minHeight}
        paddingTop={effectiveHeaderHeight > 0 ? 0 : top}
        paddingBottom={
          effectiveFooterHeight > 0 ? 0 : keyboardHeight > 0 ? 0 : bottom
        }
      >
        <ContentView {...props}>{children}</ContentView>
      </ScreenContainer>
      {keyboardHeight > 0 && (
        <View
          style={{
            height: keyboardHeight - effectiveFooterHeight,
            width: Dimensions.get("screen").width,
          }}
        />
      )}
    </>
  );
};

export const FullScreen = ({ children, ...props }: { children: ReactNode }) => {
  const width = Dimensions.get("screen").width;
  const height = Dimensions.get("window").height;
  const { colors } = useTheme();

  return (
    <View
      style={{
        width,
        height,
        overflow: "hidden",
        backgroundColor: colors.base,
      }}
      {...props}
    >
      {children}
    </View>
  );
};

export const FullScreenWithSafeAreaPadding = ({
  children,
  ...props
}: {
  children: ReactNode;
}) => {
  return (
    <FullScreen>
      <SafeAreaView {...props}>{children}</SafeAreaView>
    </FullScreen>
  );
};

export const ContentView = styled(KeyboardAvoidingView)`
  padding: ${spacing32} ${spacing20};
  flex: 1;
`;

export const LoadingScreenContainer = styled(Screen)`
  align-items: center;
  flex-direction: column;
  margin-top: 20%;
`;

export const ScreenContainer = styled(View)<{
  minHeight: number;
  paddingBottom?: number;
  paddingTop?: number;
}>`
  min-height: ${(props) => props.minHeight}px;
  background-color: ${(props) => props.theme.colors.background};
  padding-bottom: ${(props) => props.paddingBottom ?? 0}px;
  padding-top: ${(props) => props.paddingTop ?? 0}px;
  flex: 1;
`;
