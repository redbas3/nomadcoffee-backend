import { gql } from "graphql-tag";

export default gql`
  scalar Upload
  type createCoffeeShopResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String
      longitude: String
      categories: String
      photo: Upload
    ): createCoffeeShopResult
  }
`;
