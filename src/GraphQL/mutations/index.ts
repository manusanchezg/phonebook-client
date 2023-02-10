import { gql } from "@apollo/client";

export const CREATE_CONTACT = gql`
  mutation CreateContact(
    $firstName: String!
    $lastName: String!
    $nickname: String
    $phoneNumbers: [Float!]!
    $address: String!
    $photo: String!
  ) {
    createContact(
      firstName: $firstName
      lastName: $lastName
      nickname: $nickname
      phoneNumbers: $phoneNumbers
      photo: $photo
      address: $address
    ) {
      firstName
      lastName
      nickname
      phoneNumbers
      photo
      address
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation UpdateContact(
    $updateContactId: ID!
    $firstName: String!
    $lastName: String!
    $address: String!
    $phoneNumbers: [Float!]!
    $photo: String!
    $nickname: String
  ) {
    updateContact(
      id: $updateContactId
      firstName: $firstName
      lastName: $lastName
      address: $address
      phoneNumbers: $phoneNumbers
      photo: $photo
      nickname: $nickname
    ) {
      id
      firstName
      lastName
      nickname
      phoneNumbers
      address
      photo
    }
  }
`;
