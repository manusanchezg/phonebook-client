import React, { Suspense, lazy } from "react";
import { ApolloProvider } from "@apollo/client";
import Utils from "./utils";

const client = Utils.getApolloClient()

function App() {
  return (
    <ApolloProvider client={client}>
      <Suspense>
      <div className="App">Phone boook app</div>
      </Suspense>
    </ApolloProvider>
  );
}

export default App;
