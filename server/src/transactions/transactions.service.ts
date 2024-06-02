import DataLoader from "dataloader";
import { Transaction } from "./transaction.types";
import { get } from "src/utils/fetch";
import { Injectable } from "@nestjs/common";

const TRANSACTIONS_URL = "http://localhost:3002";

@Injectable()
export class TransactionsService {
  private _transactionLoader?: DataLoader<string, Transaction | null>;

  transactionLoader() {
    if (!this._transactionLoader) {
      this._transactionLoader = new DataLoader(
        async (ids: readonly string[]) => {
          const url = new URL(`${TRANSACTIONS_URL}/transactions`);
          url.searchParams.append("ids", ids.join(","));
          return await get({ url: url.toString() });
        },
      );
    }

    return this._transactionLoader;
  }

  // TODO => in real life we would also be able to paginate through this
  async searchTransactions({
    limit = 20,
    offset = 0,
    fromDate,
    userId,
  }: {
    limit?: number;
    offset?: number;
    userId?: string;
    fromDate?: Date;
  }) {
    const url = new URL(`${TRANSACTIONS_URL}/transactions/search`);
    const params = new URLSearchParams({
      ...(userId && { userId }),
      ...(fromDate && { fromDate: fromDate.toISOString() }),
      ...(limit && { take: limit.toString() }),
      ...(offset && { skip: offset.toString() }),
    });
    url.search = params.toString();
    const { results, total } = await get({ url: url.toString() });

    return {
      results: results as Transaction[],
      total,
    };
  }
}
