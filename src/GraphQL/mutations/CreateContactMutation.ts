import { gql } from "@apollo/client";

export const CREATE_CONTACT = gql`
  mutation CreateContact(
    $first_name: String!
    $last_name: String!
    $nickname: String
    $phone_numbers: [Float!]!
    $address: String!
    $photo: String!
  ) {
    createContact(
      first_name: $first_name
      last_name: $last_name
      nickname: $nickname
      phone_numbers: $phone_numbers
      photo: $photo
      address: $address
    ) {
      first_name
      last_name
      nickname
      phone_numbers
      photo
      address
    }
  }
`;
