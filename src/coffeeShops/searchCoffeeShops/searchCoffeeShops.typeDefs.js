import { gql } from "graphql-tag";

export default gql`
  type Query {
    searchCoffeeShops(keyword: String!): [CoffeeShop]
  }
`;
