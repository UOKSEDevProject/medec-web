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
            nameWithInitials
            disName
            _id
            fullName
            cntNo
            address
            spec
            prfImgUrl
            email
            sex
  }
}
`;

export const queries = {
    getChannelCenters: getChannelCenters,
    getDoctors: getDoctors
}