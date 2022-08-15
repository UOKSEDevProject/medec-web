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
            disName
            specialization
            imageSrc
            mediCenter
            status
        }
    }
`;

const searchDoctors = gql`
    query GetDoctors($searchValue: String) {
        getDoctors(searchValue: $searchValue) {
            _id
            disName
            specialization
            imageSrc
            mediCenter
            status
        }
    }
`;

const queries = {
    getChannelCenters: getChannelCenters,
    getDoctors: getDoctors,
    searchDoctors: searchDoctors
}

export default queries;