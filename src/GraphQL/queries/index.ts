import { gql } from "@apollo/client";

export const LOAD_CONTACTS = gql`
  query Contacts($offset: Int, $limit: Int, $search: String) {
    contacts(offset: $offset, limit: $limit, search: $search) {
      id
      firstName
      lastName
      nickname
      phoneNumbers
      photo
    }
  }
`;

export const GET_CONTACT_INFO = gql`
  query Contact($contactId: ID!) {
    Contact(id: $contactId) {
      id
      firstName
      lastName
      nickname
      phoneNumbers
      address
      photo
  }
}
`
