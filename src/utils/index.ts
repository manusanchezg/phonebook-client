import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { ErrorsInterface, InitalValuesInterface } from "../interface";

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

    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link,
    });
    return client;
  }

  static validateContactInfo(values: InitalValuesInterface): any {
 if (
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$/.test(
        values.phoneNumber
      )
    )
        {}
  }
}


