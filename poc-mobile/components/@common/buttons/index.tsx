import { Pressable } from "react-native";
import styled from "styled-components/native";
import { spacing12, spacing8 } from "../spacing";

export const BaseButton = styled(Pressable)`
  width: 100%;
  padding: ${spacing8} ${spacing12};
`;
