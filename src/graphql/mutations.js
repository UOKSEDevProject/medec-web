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

export const mutations = {
    addDoctor: addDoctor
}