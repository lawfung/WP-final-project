import { gql } from "@apollo/client";

export const RECORD_QUERY = gql`
  query GetRecord($strategyID: ID!) {
    GetRecord(strategyID: $strategy) {
      startTime
      endTime
      start
      end
      high
      low
    }
  }
`;

export const STRATEGY_QUERY = gql`
  query GetStrategy($id: String!) {
    GetStrategy(id: $id) {
      name
    }
  }
`;

