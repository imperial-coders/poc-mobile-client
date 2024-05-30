import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";

export const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  const keyboardDidShow = (frames: any) => {
    setKeyboardHeight(frames.endCoordinates.height);
  };

  const keyboardDidHide = () => {
    setKeyboardHeight(0);
  };

  useEffect(() => {
    if (Platform.OS === "ios") {
      const aWildKeyboardAppeared = Keyboard.addListener(
        "keyboardDidShow",
        keyboardDidShow,
      );
      const aWildKeyboardDidHide = Keyboard.addListener(
        "keyboardDidHide",
        keyboardDidHide,
      );

      // cleanup function
      return () => {
        aWildKeyboardAppeared.remove();
        aWildKeyboardDidHide.remove();
      };
    }
  }, []);

  return { keyboardHeight };
};
