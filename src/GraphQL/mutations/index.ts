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

export const DELETE_CONTACT = gql`
mutation DeleteContact($deleteContactId: ID!) {
  deleteContact(id: $deleteContactId) {
    first_name
    last_name
    nickname
  }
}
`;
