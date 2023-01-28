import "./assets/css/main.scss";
import Client from "./Client";
import client from "./connection/connection";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import store from "./data-store/reducer/root-reducer";
import {BrowserRouter} from "react-router-dom";
//notification
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <Client />
            <ToastContainer />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    </div>
  );
}

export default App;
