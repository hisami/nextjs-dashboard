import { GraphQLClient } from "graphql-request";
import { getSdk } from "../graphql/generated";

const client = new GraphQLClient("http://localhost:8080/graphql");
export const sdk = getSdk(client);
