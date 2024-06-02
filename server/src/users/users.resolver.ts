import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { User } from "./models/user.model";
import { UsersService } from "./users.service";
import { TransactionsService } from "src/transactions/transactions.service";

@Resolver((of) => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private transactionsService: TransactionsService,
  ) {}

  @Query((returns) => User)
  async getUser(@Args("id", { type: () => ID }) id: string): Promise<User> {
    const user = await this.usersService.userLoader().load(id);

    return {
      ...user,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
      financialSummary: undefined,
    };
  }

  @ResolveField()
  async financialSummary(@Parent() user: User) {
    const { id } = user;
    const today = new Date();
    const thirtyDaysAgo = new Date(new Date().setDate(today.getDate() - 30));
    const lastThirtyDaysTransactions =
      await this.transactionsService.searchTransactions({
        userId: id,
        fromDate: thirtyDaysAgo,
      });

    const totalSpent = lastThirtyDaysTransactions.results.reduce(
      (total, transaction) => {
        total = total + transaction.amountInCents;
        return total;
      },
      0,
    );

    return {
      id: `${user.id}_financial_summary`,
      amountInCentsSpentLastThirtyDays: totalSpent,
    };
  }
}
