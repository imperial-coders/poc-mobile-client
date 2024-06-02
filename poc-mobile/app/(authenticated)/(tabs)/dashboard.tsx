import { Screen } from "@/components/@common/layout";
import { Text } from "@/components/@common/typography/text";
import { gql } from "@/types/gql";
import { formatCentsToDollars, formatCurrency } from "@/utils/format-currency";
import { useQuery } from "@apollo/client";
import styled from "styled-components/native";

const ScreenTitle = styled(Text)`
  font-size: 24px;
  font-weight: bold;
`;

export default function TabTwoScreen() {
  const { data, loading, error } = useQuery(QUERY, {
    variables: {
      // TODO => in real life this would not be hard coded
      userId: "clwb7mw8300003z6kadi875xg",
    },
  });

  return (
    <Screen>
      <ScreenTitle>Dashboard Summary</ScreenTitle>

      {loading && <Text>Loading...</Text>}

      {data && data?.getUser?.financialSummary && (
        <Text>{`total spent in last 30 days: ${formatCurrency({
          amount: formatCentsToDollars(
            data.getUser.financialSummary.amountInCentsSpentLastThirtyDays,
          ),
        })}`}</Text>
      )}
    </Screen>
  );
}

const QUERY = gql(`
  query GetUserFinancialSummaryData($userId: ID!) {
    getUser(id: $userId) {
      id
      financialSummary {
        id
        amountInCentsSpentLastThirtyDays
      }
    }
  }
`);
