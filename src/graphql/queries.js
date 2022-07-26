import {gql} from "@apollo/client";

const getChannelCenters = gql`
    query Query {
        getChannelCenters {
            name
            address
            cntNo
       }
   }
`;

const getDoctors = gql`
    query GetDoctors {
        getDoctors {
            _id
            name
            cntNo
            address
            prfImgUrl
            spec
            email
            sex
  }
}
`;

export const queries = {
    getChannelCenters: getChannelCenters,
    getDoctors: getDoctors
}