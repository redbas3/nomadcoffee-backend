import { gql } from "graphql-tag";

export default gql`
  type seeCategoryResult {
    ok: Boolean!
    error: String
    coffeeShops: [CoffeeShop]
  }
  type Query {
    seeCategory(name: String!, page: Int!): seeCategoryResult
  }
`;
