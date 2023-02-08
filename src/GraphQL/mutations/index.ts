import { gql } from "@apollo/client";


export const CREATE_CONTACT = gql`
  mutation CreateContact(
    $firstName: String!
    $lastName: String!
    $nickname: String
    $phoneNumbers: Number[]!
    $photo: String!
    ) {
    createContact(
        firstName: $firstName
        lastName: $lastName
        nickname: $nickname
        phoneNumbers: $phoneNumbers
        photo: $photo
    ) {
      firstName
      lastName
      nickname
      phoneNumbers
      photo
    }
  }
`;