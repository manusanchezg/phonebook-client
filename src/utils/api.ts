import { gql, useQuery, useMutation } from "@apollo/client";
import { LOAD_CONTACTS } from "../GraphQL/queries";
import { CREATE_CONTACT } from "../GraphQL/mutations";
import { InitalValuesInterface } from "../interface";

export default class API {
  static createContact(userInfo: InitalValuesInterface) {
    const [createContact, { error }] = useMutation(CREATE_CONTACT);

    createContact({
      variables: userInfo,
    });

    if (error) console.log(error);
  }
}
