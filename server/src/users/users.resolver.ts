import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { User } from "./models/user.model";
import { UsersService } from "./users.service";
import * as protos from "../protos/user";
import * as grpc from "@grpc/grpc-js";

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => User)
  async getUser(@Args("id", { type: () => ID }) id: string): Promise<User> {
    const user = await this.usersService.userLoader().load(id);

    return {
      ...user,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
    };
  }
}
