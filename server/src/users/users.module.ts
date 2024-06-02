import { Module } from "@nestjs/common";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";
import { TransactionsService } from "src/transactions/transactions.service";

@Module({
  providers: [UsersResolver, UsersService, TransactionsService],
})
export class UsersModule {}
