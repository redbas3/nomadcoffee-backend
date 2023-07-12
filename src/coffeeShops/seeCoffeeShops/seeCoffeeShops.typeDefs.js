import { gql } from "graphql-tag";

export default gql`
  type seeCoffeeShops {
    ok: Boolean!
    error: String
    coffeeShops: [CoffeeShop]
    totalPages: Int!
  }
  type Query {
    seeCoffeeShops(page: Int!): seeCoffeeShops
  }
`;
