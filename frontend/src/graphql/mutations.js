import { gql } from "@apollo/client";

export const DELETE_STRATEGY_MUTATION = gql`
  mutation DeleteStrategy($id: ID!, $username: String!) {
    DeleteStrategy(id: $id, username: $username)
  }
`;

export const RENAME_STRATEGY_MUTATION = gql`
  mutation RenameStrategy($id: ID!, $name: String!, $username: String!) {
    RenameStrategy(id: $id, name: $name, username: $username)
  }
`;

export const CREATE_RECORD_MUTATION = gql`
  mutation ($strategyName: String!, $startTime: Int!, $endTime: Int!, $start: Float!, $end: Float!, $high: Float!, $low: Float!, $cookie: String!, $username: String!) {
    CreateRecord(strategyName: $strategyName, startTime: $startTime, endTime: $endTime, start: $start, end: $end, high: $high, low: $low, cookie: $cookie, username: $username)
  }
`;

export const DELETE_RECORD_MUTATION = gql`
  mutation DeleteRecord($id: ID!, $username: String!) {
    DeleteRecord(id: $id, username: $username)
  }
`;

export const DELETE_RECORD_BY_STRATEGY_ID_MUTATION = gql`
  mutation DeleteRecordByStrategyID($strategyID: ID!, $username: String!) {
    DeleteRecordByStrategyID(strategyID: $strategyID, username: $username)
  }
`;

export const CACHE = gql`
  mutation Cache($asset: String!, $startTime: Int!, $endTime: Int!, $scale: String!, $cookie: String!) {
    Cache(asset: $asset, startTime: $startTime, endTime: $endTime, scale: $scale, cookie: $cookie)
}
`;

export const REGISTER_USER = gql`
mutation Register($user: String!, $hashPasswd: String!) {
  Register(user: $user, hashPasswd: $hashPasswd)
}
`;

export const LOGIN = gql`
  mutation ($user: String!, $hashPasswd: String!) {
    Login(user: $user, hashPasswd: $hashPasswd)
  }
`

export const LOGOUT = gql`
  mutation ($user: String!, $cookie: String!) {
    Logout(user: $user, cookie: $cookie)
  }
`
