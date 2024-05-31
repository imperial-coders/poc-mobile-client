import styled from "styled-components/native";
import { BaseButton } from ".";
import { Text } from "../typography/text";
import { ReactNode } from "react";
import { PressableProps } from "react-native";

const StyledButton = styled(BaseButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.danger};
`;

const StyledText = styled(Text)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.base};
`;

export const DangerButton = ({
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
