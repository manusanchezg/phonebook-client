import { gql } from "@apollo/client";

export const LOAD_CONTACTS = gql`
  query Contacts($offset: Int, $limit: Int, $search: String) {
    contacts(offset: $offset, limit: $limit, search: $search) {
      id
      first_name
      last_name
      nickname
      phone_numbers
      photo
    }
  }
`;