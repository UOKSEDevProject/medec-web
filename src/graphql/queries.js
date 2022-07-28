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

const searchDoctors = gql`
    query Query($searchValue: String!) {
        searchDoctors(searchValue: $searchValue) {
            _id
            fullName
            disName
            nameWithInitials
            cntNo
            address
            spec
            prfImgUrl
            email
            sex
        }
    }
`;

const queries = {
    getChannelCenters: getChannelCenters,
    getDoctors: getDoctors,
    searchDoctors: searchDoctors
}

export default queries;