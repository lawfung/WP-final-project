import { gql } from "@apollo/client";

export const RECORD_QUERY = gql`
  query GetRecord($strategyID: ID!, $username: String!) {
    GetRecord(strategyID: $strategyID, username: $username) {
      startTime
      endTime
      start
      end
      high
      low
      id
      username
    }
  }
`;

export const STRATEGY_QUERY = gql`
  query GetStrategy($id: ID!, $username: String!) {
    GetStrategy(id: $id, username: $username) {
      name
      id
      username
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

export const Username_QUERY = gql`
  query ($cookie: String!) {
    GetUsername(cookie: $cookie)
  }
`
