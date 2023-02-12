import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Swal from "sweetalert2";
import AWS from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";

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

  static handleSubmitUser(
    requiredContactValues: any,
    callback: Function,
    file?: File
  ) {
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
  }

  private async uploadFile(file: File) {
    AWS.config.update({
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_KEY_SECRET
    })

    const myBucket = new AWS.S3({
      params: {Bucket: process.env.S3_BUCKET},
      region: process.env.S3_REGION
    })
    const params: PutObjectRequest = {
      ACL: 'public-read',
      Body: file,
      Bucket: process.env.S3_BUCKET!,
      Key: file.name
    }

    myBucket.putObject(params)
    .on('httpUploadProgress', (evt) => {
      console.log(evt.loaded, evt.total)
    })
    .on("complete", (evt) => {
      evt.httpResponse.body
    })
    .send(err => console.log(err))
  }
}
