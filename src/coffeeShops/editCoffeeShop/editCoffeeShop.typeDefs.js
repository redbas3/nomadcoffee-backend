import { gql } from "graphql-tag";

export default gql`
  scalar Upload
  type editCoffeeShopResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editCoffeeShop(
      id: Int!
      name: String
      latitude: String
      longitude: String
      categories: String
      photo: Upload
    ): editCoffeeShopResult
  }
`;
