import { gql } from "@apollo/client";

export const LOAD_CONTACTS = gql`
  query Contacts {
    contacts {
      id
      firstName
      lastName
      nickname
      phoneNumbers
      photo
    }
  }
`;
