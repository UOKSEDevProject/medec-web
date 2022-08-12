import './assets/css/main.scss';
import Client from './Client';
import client from './connection/connection';
import {ApolloProvider} from "@apollo/client";
import {Provider} from "react-redux";
import store from "./data-store/reducer/root-reducer";

function App() {
    return (
        <div>
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <Client/>
                </Provider>
            </ApolloProvider>
        </div>
    );
}

export default App;
