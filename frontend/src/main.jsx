import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import {ApolloProvider} from "@apollo/client"
import client from "./utils/apollo"

import "./index.css"
import React from "react"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)
