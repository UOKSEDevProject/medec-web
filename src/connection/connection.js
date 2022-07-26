import {ApolloClient, HttpLink, InMemoryCache, split} from "@apollo/client";
import {configuration} from "../config";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {createClient} from "graphql-ws";
import {getMainDefinition} from "@apollo/client/utilities";

const httpLink = new HttpLink({
    uri: `${configuration.connectionParams.url + configuration.connectionParams.path}`
});

const wsLink = new GraphQLWsLink(createClient({
    url: `${configuration.connectionParams.ws + configuration.connectionParams.subsPath}`
}));

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription');
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});

export default client;