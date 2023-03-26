import {gql} from "@apollo/client";

const sessionListener = gql`
    subscription Subscription($sessionId: String!) {
        sessionListener(sessionId: $sessionId) {
            dctId
            chId
            _id
            strTime
            date
            maxApts
            totApts
            curAptNo
            apts {
                _id
                pId
                pName
                activeSt
                aptNo
            }
        }
    }
`;

const authListener = gql`
    subscription Subscription($userId: String!) {
        authListener(userId: $userId) {
            authSts
            authType
            tkn
            usrId
            message
        }
    }
`;

const subscriptions = {
    sessionListener: sessionListener,
    authListener: authListener
}

export default subscriptions;