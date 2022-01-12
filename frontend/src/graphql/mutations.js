import { gql } from "@apollo/client";

export const CREATE_STRATEGY_MUTATION = gql`
  mutation CreateStrategy($name: String!) {
    CreateStrategy(name: $name) {
      # TODO
      abc
    }
  }
`;

export const DELETE_STRATEGY_MUTATION = gql`
  mutation DeleteStrategy($id: ID!) {
    DeleteStrategy(id: $id)
  }
`;

export const RENAME_STRATEGY_MUTATION = gql`
  mutation RenameStrategy($id: ID!, $name: String!) {
    RenameStrategy(id: $id, name: $name)
  }
`;

export const CREATE_RECORD_MUTATION = gql`
  mutation CreateRecord($strategyID: ID!, $startTime: Int!, $endTime: Int!, $start: Float!, $end: Float!, $high: Float!, $low: Float!) {
    CreateRecord(strategyID: $strategyID, startTime: $startTime, endTime: $endTime, start: $start, end: $end, high: $high, low: $low) {
      # TODO
      abc
    }
  }
`;

export const DELETE_RECORD_MUTATION = gql`
  mutation DeleteRecord($id: ID!) {
    DeleteRecord(id: $id)
  }
`;

export const DELETE_RECORD_BY_STRATEGY_ID_MUTATION = gql`
  mutation DeleteRecordByStrategyID($strategyID: ID!) {
    DeleteRecordByStrategyID(strategyID: $strategyID)
  }
`;

export const CACHE = gql`
  mutation Cache($asset: String!, $startTime: Int!, $endTime: Int!, $scale: String!, $cookie: String!) {
    Cache(asset: $asset, startTime: $startTime, endTime: $endTime, scale: $scale, cookie: $cookie)
}
`
