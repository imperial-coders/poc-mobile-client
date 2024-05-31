import { DangerButton } from "@/components/@common/buttons/danger";
import { Screen } from "@/components/@common/layout";
import { Text } from "@/components/@common/typography/text";
import { useSession } from "@/providers/auth/context";
import { gql } from "@/types/gql";
import { useQuery } from "@apollo/client";
import styled from "styled-components/native";

const StyledScreen = styled(Screen)`
  gap: 16px;
`;

export default function HomeScreen() {
  const { signOut } = useSession();

  const { data, loading, error } = useQuery(USER_QUERY, {
    variables: {
      // TODO => in real life this would not be hard coded
      userId: "clwb7mw8300003z6kadi875xg",
    },
  });

  const user = data?.getUser;

  if (user) {
    return (
      <StyledScreen>
        <Text>{`${user.firstName} ${user.lastName}`}</Text>
        <Text>{user.email}</Text>
        {user.phoneNumber && <Text>{user.phoneNumber}</Text>}
        <DangerButton onPress={() => signOut()}>Sign out</DangerButton>
      </StyledScreen>
    );
  }

  if (loading) {
    return (
      <StyledScreen>
        <Text>Home</Text>
        <DangerButton onPress={() => signOut()}>Sign out</DangerButton>
      </StyledScreen>
    );
  }

  if (error) {
    return (
      <StyledScreen>
        <Text>Something broke</Text>
        <DangerButton onPress={() => signOut()}>Sign out</DangerButton>
      </StyledScreen>
    );
  }

  return null;
}

const USER_QUERY = gql(`
  query GetMeForHomeScreen($userId: ID!) {
    getUser(id: $userId) {
      id
      firstName
      lastName
      email
      phoneNumber
    }
  }
`);
