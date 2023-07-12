import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeCoffeeShop(id: Int!): CoffeeShop
  }
`;
