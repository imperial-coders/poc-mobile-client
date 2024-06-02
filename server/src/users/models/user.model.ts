import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserFinancialSummary } from "./user-financial-summary.model";

@ObjectType({ description: "User" })
export class User {
  @Field((returns) => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field((type) => UserFinancialSummary)
  financialSummary: UserFinancialSummary;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
