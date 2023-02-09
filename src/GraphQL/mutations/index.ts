import { gql } from "@apollo/client";

export const CREATE_CONTACT = gql`
  mutation CreateContact(
    $firstName: String!,
    $lastName: String!,
    $nickname: String,
    $phoneNumbers: [Int!]!,
    $address: String!,
    $photo: String!,
    ) {
    createContact(
        firstName: $firstName
        lastName: $lastName
        nickname: $nickname
        phoneNumbers: $phoneNumbers
        photo: $photo
        address: $address
    ) {
        firstName,
        lastName,
        nickname,
        phoneNumbers,
        photo,
        address
    }
  }
`;
