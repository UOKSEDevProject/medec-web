import {ApolloClient, HttpLink, InMemoryCache, split} from "@apollo/client";
import {configuration} from "../config";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {createClient} from "graphql-ws";
import {getMainDefinition} from "@apollo/client/utilities";
import {setContext} from '@apollo/client/link/context';
import {component, platform, authConstants, platformConstants} from "../constants/constants";

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
    httpLink
);

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            auth_type: concatHeaders().authType,
            platform_type: concatHeaders().platformType,
            auth_tkn: token
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(splitLink),
    cache: new InMemoryCache()
});

const concatHeaders = () => {
    let authType = null;
    let platformType = null;

    if (configuration.component === component.user) {
        authType = authConstants.authTypePatient
    } else if (configuration.component === component.chanCenter) {
        authType = authConstants.authTypeChannelCenter
    } else if (configuration.component === component.laboratory) {
        authType = authConstants.authTypeLab
    } else if (configuration.component === component.doctor) {
        authType = authConstants.authTypeDoctor
    }

    if (configuration.platform === platform.web) {
        platformType = platformConstants.platformWeb
    } else if (configuration.platform === platform.mobile) {
        platformType = platformConstants.platformMobile
    }

    return {
        authType: authType,
        platformType: platformType
    }
}

export default client;