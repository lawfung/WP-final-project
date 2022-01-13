import { gql } from "@apollo/client";

export const STRATEGY_SUBSCRIPTION = gql`
  subscription {
    updateStrategy {
      type
      info {
        id
        name
      }
    }
  }
`;
