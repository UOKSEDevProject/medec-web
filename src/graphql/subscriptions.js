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

export const subscriptions = {
    sessionListener: sessionListener
}