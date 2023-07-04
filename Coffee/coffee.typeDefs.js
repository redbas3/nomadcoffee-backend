import { gql } from "apollo-server";

export default gql`
  type Coffee {
    id: Int!
    coffeename: String!
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    coffees: [Coffee]
  }
`;
