import {
  ApolloProvider as Provider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { ReactNode, useMemo } from "react";
import { useSession } from "../auth/context";
import { Screen } from "@/components/@common/layout";
import { Text } from "@/components/@common/typography/text";

const createClient = ({ token }: { token: string }) => {
  const GRAPHQL_ENDPOINT = process.env.EXPO_PUBLIC_GRAPHQL_ENDPOINT;

  if (token) {
    const httpLink = createHttpLink({
      uri: GRAPHQL_ENDPOINT,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
    });
  }

  return new ApolloClient({
    uri: GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
  });
};

export const ApolloProvider = ({ children }: { children: ReactNode }) => {
  const { session } = useSession();

  const client = useMemo(() => {
    return createClient({
      token: session ?? "",
    });
  }, [session]);

  if (!client) {
    return (
      <Screen>
        <Text>Loading ...</Text>
      </Screen>
    );
  }

  return <Provider client={client}>{children}</Provider>;
};
