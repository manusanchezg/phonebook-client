import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Swal from "sweetalert2";
import ReactS3Client from "react-aws-s3-typescript";
import { s3Config } from "./s3Config";

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

  static async handleSubmitUser(
    requiredContactValues: any,
    callback: Function,
    file: File,
  ) {
    let submit = true;
    for (const value in requiredContactValues) {
      if (requiredContactValues[value]) {
        submit = false;
      }
    }
    if (submit) {
      // await this.uploadFile(file)
      callback();
    } else {
      Swal.fire({
        icon: "error",
        title: "You have to fill all the required fields",
      });
    }
  }

  static async uploadFile(file: File) {
    const s3 = new ReactS3Client(s3Config);

    try {
      const response = await s3.uploadFile(file, file.name);
      console.log(response);
      return response.location
    } catch (exception) {
      console.log(exception);
    }

    //   AWS.config.update({
    //     accessKeyId: process.env.S3_ACCESS_KEY,
    //     secretAccessKey: process.env.S3_KEY_SECRET
    //   })

    //   const myBucket = new AWS.S3({
    //     params: {Bucket: process.env.S3_BUCKET},
    //     region: process.env.S3_REGION
    //   })
    //   const params: PutObjectRequest = {
    //     ACL: 'public-read',
    //     Body: file,
    //     Bucket: process.env.S3_BUCKET!,
    //     Key: file.name
    //   }

    //   myBucket.putObject(params)
    //   .on('httpUploadProgress', (evt) => {
    //     console.log(evt.loaded, evt.total)
    //   })
    //   .on("complete", (evt) => {
    //     evt.httpResponse.body
    //   })
    //   .send(err => console.log(err))
  }
}
