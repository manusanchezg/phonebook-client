import { gql } from "@apollo/client";

export const GET_CONTACT_INFO = gql`
  query Contact($contactId: ID!) {
    Contact(id: $contactId) {
      id
      first_name
      last_name
      nickname
      phone_numbers
      address
      photo
  }
}
`