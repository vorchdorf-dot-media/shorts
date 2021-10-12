export const GET_SHORT = `
  query short($id: ID!) {
    short(id: $id) {
      id
      target
      proxy
    }
  }
`;

export const CREATE_SHORT = `
  mutation createShort($data: ShortInput!) {
    createShort(data: $data) {
      id
      target
      proxy
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
