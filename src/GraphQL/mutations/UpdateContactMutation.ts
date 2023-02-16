import { gql } from "@apollo/client";

export const UPDATE_CONTACT = gql`
  mutation UpdateContact(
    $updateContactId: ID!
    $first_name: String!
    $last_name: String!
    $address: String!
    $phone_numbers: [Float!]!
    $photo: String!
    $nickname: String
  ) {
    updateContact(
      id: $updateContactId
      first_name: $first_name
      last_name: $last_name
      address: $address
      phone_numbers: $phone_numbers
      photo: $photo
      nickname: $nickname
    ) {
      id
      first_name
      last_name
      nickname
      phone_numbers
      address
      photo
    }
  }
`;