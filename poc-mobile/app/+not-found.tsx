import { Text } from "@/components/@common/typography/text";
import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";

const Container = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 20px;
`;

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Container>
        <Text>This screen doesn't exist.</Text>
        <Link href="/">
          <Text>Go to home screen!</Text>
        </Link>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
