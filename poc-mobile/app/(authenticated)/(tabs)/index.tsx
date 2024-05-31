import { DangerButton } from "@/components/@common/buttons/danger";
import { Screen } from "@/components/@common/layout";
import { Text } from "@/components/@common/typography/text";
import { useSession } from "@/providers/auth/context";

export default function HomeScreen() {
  const { signOut } = useSession();

  return (
    <Screen>
      <Text>Home</Text>
      <DangerButton onPress={() => signOut()}>Sign out</DangerButton>
    </Screen>
  );
}
