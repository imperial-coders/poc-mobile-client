import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { DateScalar } from "./common/scalars/date.scalar";
import { upperDirectiveTransformer } from "./common/directives/upper-case.directive";
import { DirectiveLocation, GraphQLDirective } from "graphql";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
      // typePaths: ["./**/*.graphql"],
      definitions: {
        path: join(process.cwd(), "src/graphql.ts"),
        outputAs: "interface",
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      transformSchema: (schema) => upperDirectiveTransformer(schema, "upper"),
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: "upper",
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
  ],
  providers: [DateScalar],
})
export class AppModule {}
