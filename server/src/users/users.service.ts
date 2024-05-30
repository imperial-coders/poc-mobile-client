import * as grpc from "@grpc/grpc-js";
import * as protos from "../protos/user";
import { Injectable } from "@nestjs/common";
import * as DataLoader from "dataloader";

@Injectable()
export class UsersService {
  private _userLoader?: DataLoader<string, protos.User | null>;
  private _client?: protos.UserServiceClient;

  constructor() {
    this._client = new protos.UserServiceClient(
      // TODO => setup NEST env
      "dns:///localhost:5000",
      grpc.ChannelCredentials.createInsecure(),
    );
  }

  userLoader() {
    if (!this._userLoader) {
      this._userLoader = new DataLoader((ids: readonly string[]) => {
        const req = protos.GetUsersRequest.fromJSON({ ids });
        return new Promise((resolve, reject) => {
          this._client?.getUsers(req, (err, data) => {
            if (err) {
              return reject(err);
            }
            resolve(data.results.map((user) => user ?? null));
          });
        });
      });
    }

    return this._userLoader;
  }
}
