import { ImageBackground, ImageBackgroundProps } from "react-native";
import styled from "styled-components/native";

export const Hero = styled(ImageBackground).attrs({
  resizeMode: "cover",
})<ImageBackgroundProps>`
  width: 100%;
  height: 100%;
`;
