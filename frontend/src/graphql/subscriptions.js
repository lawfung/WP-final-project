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

export const RECORD_SUBSCRIPTION = gql`
  subscription {
    updateRecord {
      type
      info {
        id
        strategyID
        startTime
        endTime
        start
        end
        high
        low
      }
    }
  }
`;
