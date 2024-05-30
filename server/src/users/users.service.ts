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
      "dns:///localhost:5000",
      // "grpc://localhost:5000",
      grpc.ChannelCredentials.createInsecure(),
    );
  }

  userLoader() {
    if (!this._userLoader) {
      this._userLoader = new DataLoader((ids: readonly string[]) => {
        console.log("🚀 ~ ids:", ids);
        const req = protos.GetUsersRequest.fromJSON({ ids });
        const encodedReq = protos.GetUsersRequest.encode(req);
        console.log("🚀 ~ encodedReq:", encodedReq);
        console.log("🚀 ~ req:", req);
        return new Promise((resolve, reject) => {
          console.log("🚀 ~ this._client?.getUsers:", this._client?.getUsers);
          this._client?.getUsers(req, (err, data) => {
            console.log("🚀 ~ data:", data);
            console.log("🚀 ~ err:", err);
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
