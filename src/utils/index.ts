import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { ErrorsInterface, InitalValuesInterface } from "../interface";
import { offsetLimitPagination } from "@apollo/client/utilities";
import Swal from "sweetalert2";

export default class Utils {
  static getApolloClient(): ApolloClient<{}> {
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => {
          alert(`Graphql error ${message}`);
        });
      }
    });
    const link = from([
      errorLink,
      new HttpLink({ uri: "http://localhost:3333/graphql" }),
    ]);
    const cache = new InMemoryCache({
      typePolicies: {
        useQuery: {
          fields: {
            contacts: {
              keyArgs: false,
              merge: true,
            },
          },
        },
      },
    });

    const client = new ApolloClient({
      link,
      cache,
    });
    return client;
  }

  static handleSubmitUser(requiredContactValues: any, callback : Function) {
    let submit = true;
    for (const value in requiredContactValues) {
      if (requiredContactValues[value]) {
        submit = false;
      }
    }
    if (submit) {
      callback();
    } else {
      Swal.fire({
        icon: "error",
        title: "You have to fill all the required fields",
      });
    }
  };
}


