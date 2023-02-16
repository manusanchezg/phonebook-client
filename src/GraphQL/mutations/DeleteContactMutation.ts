import { gql } from "@apollo/client";

export const DELETE_CONTACT = gql`
  mutation DeleteContact($deleteContactId: ID!) {
    deleteContact(id: $deleteContactId) {
      first_name
      last_name
      nickname
    }
  }
`;
