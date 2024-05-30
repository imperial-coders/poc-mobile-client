import styled from "styled-components/native";
import { Text as ReactNativeText } from "react-native";

export const Text = styled(ReactNativeText).attrs({
  maxFontSizeMultiplier: 1.3,
  minimumFontScale: 0.8,
})`
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.text};
`;

export type TextProps = Omit<
  ReactNativeText,
  "maxFontSizeMultiplier" | "minimumFontScale" | "theme"
>;
