import React, { ReactNode } from "react";
import styled from "styled-components/native";
import { PressableProps } from "react-native";
import { Text } from "../typography/text";
import { BaseButton } from ".";

const StyledButton = styled(BaseButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primary};
`;

const StyledText = styled(Text)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.base};
`;

export const PrimaryButton = ({
  onPress,
  disabled = false,
  children,
  ...props
}: {
  onPress: () => void;
  disabled?: boolean;
  children: ReactNode;
} & Partial<PressableProps>) => {
  return (
    <StyledButton onPress={onPress} disabled={disabled} {...props}>
      <StyledText>{children}</StyledText>
    </StyledButton>
  );
};
