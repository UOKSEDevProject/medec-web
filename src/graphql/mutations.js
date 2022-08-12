import {gql} from "@apollo/client";

const addDoctor = gql`
    mutation Mutation($doctor: DoctorArgs!) {
        addDoctor(doctor: $doctor) {
            _id
            name
            cntNo
            address
            spec
            prfImgUrl
            email
            sex
        }
    }
`;

const mutations = {
    addDoctor: addDoctor
}

export default mutations;