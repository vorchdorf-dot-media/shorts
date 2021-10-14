export const GET_SHORT = `
  query short($id: ID!) {
    short(id: $id) {
      id
      target
      proxy
    }
  }
`;

export const GET_SHORTS = `
  query shorts($user: ID!, $size: Int, $cursor: String) {
    shorts(user: $user, _size: $size, _cursor: $cursor) {
      before
      after
      data {
        id
        target
        proxy
        meta {
          createdAt
          visits
        }
      }
    }
  }
`;

export const CREATE_SHORT = `
  mutation createShort($data: ShortInput!) {
    createShort(data: $data) {
      id
      target
      proxy
      meta {
        createdAt
        visits
      }
    }
  }
`;

export const VISIT_SHORT = `
  mutation visitShort($id: ID!) {
    visitShort(id: $id) {
      id
      meta {
        visits
      }
    }
  }
`;
