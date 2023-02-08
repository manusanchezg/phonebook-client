import React, { Suspense, lazy } from "react";
import { ApolloProvider } from "@apollo/client";
import Utils from "./utils";
import HomePage from "./components/home/HomePage";
import "./style/index.css"
import 'bootstrap/dist/css/bootstrap.min.css';


const client = Utils.getApolloClient();

function App() {
  return (
    <ApolloProvider client={client}>
      <Suspense>
        <HomePage />
      </Suspense>
    </ApolloProvider>
  );
}

export default App;
