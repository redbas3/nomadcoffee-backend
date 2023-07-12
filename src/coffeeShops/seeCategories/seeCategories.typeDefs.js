import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeCategories(page: Int!): [Category]
  }
`;
