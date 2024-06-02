import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "UserFinancialSummary" })
export class UserFinancialSummary {
  @Field((returns) => ID)
  id: string;

  @Field((returns) => Int)
  amountInCentsSpentLastThirtyDays: number;
}
