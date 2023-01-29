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

const login = gql`
    mutation Login($usr: String!, $pwd: String!) {
        login(usr: $usr, pwd: $pwd) {
            authSts
            authType
            tkn
            usrId
            message
         }
    }
`;

const register = gql`
    mutation Register($usr: String!, $userArgs: UserArgs, $pwd: String!) {
      register(usr: $usr, userArgs: $userArgs, pwd: $pwd) {
        authSts
        authType
        message
        tkn
        usrId
      }
    }
`

const mutations = {
    addDoctor: addDoctor,
    login: login,
    register: register,
};

export default mutations;