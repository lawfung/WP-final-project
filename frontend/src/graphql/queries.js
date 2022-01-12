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

