import { Field, ID, ObjectType } from "@nestjs/graphql";

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

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
