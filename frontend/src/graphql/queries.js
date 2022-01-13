import { gql } from "@apollo/client";

export const RECORD_QUERY = gql`
  query GetRecord($strategyID: ID!) {
    GetRecord(strategyID: $strategyID) {
      startTime
      endTime
      start
      end
      high
      low
      id
    }
  }
`;

export const STRATEGY_QUERY = gql`
  query GetStrategy($id: ID!) {
    GetStrategy(id: $id) {
      name
      id
    }
  }
`;

export const Candlestick_QUERY = gql`
  query Candlestick($asset: String!, $startTime: Int!, $endTime: Int!, $scale: String!, $cookie: String!) {
    Candlestick(asset: $asset, startTime: $startTime, endTime: $endTime, scale: $scale, cookie: $cookie) {
      startTime
      scale
      open
      high
      low
      close
    }
  }
`

