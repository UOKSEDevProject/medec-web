import {gql} from "@apollo/client";

const addDoctor = gql`
    mutation Mutation($doctor: DoctorArgs!) {
  addDoctor(doctor: $doctor) {
    payload {
      _id
      address
      cntNo
      disName
      email
      fullName
      nameWithInitials
      prfImgUrl
      sex
      spec
    }
    statusCode
    statusDetails
  }
}
`;

const updateDoctor = gql`
    mutation AddDoctorToChannelCenter($chId: String!, $dctId: String!) {
      addDoctorToChannelCenter(chId: $chId, dctId: $dctId) {
        payload {
          name
          logoUrl
          doctors
          cntNo
          address
          _id
        }
        statusCode
        statusDetails
      }
    }
`

const addSession = gql`
    mutation CreateSession($session: SessionArgs!) {
      createSession(session: $session) {
        payload {
          date
          _id
          apts {
            _id
            activeSt
            aptNo
            pId
            pName
          }
          chId
          curAptNo
          dctId
          maxApts
          status
          strTime
          totApts
        }
        statusCode
        statusDetails
      }
    }
`

const deleteSession = gql`
    mutation DeleteSession($sessionId: String!) {
      deleteSession(sessionId: $sessionId) {
        statusCode
        statusDetails
      }
    }
`

const updateSession = gql`
    mutation UpdateSession($sessionId: String!, $session: SessionUpdateArgs!) {
      updateSession(sessionId: $sessionId, session: $session) {
        payload {
          _id
          apts {
            aptNo
            pId
            pName
            activeSt
            _id
          }
          chId
          curAptNo
          date
          dctId
          maxApts
          strTime
          status
          totApts
        }
        statusCode
        statusDetails
      }
    }
`

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
    updateDoctor:updateDoctor,
    login: login,
    register: register,
    addSession: addSession,
    deleteSession: deleteSession,
    updateSession: updateSession
};

export default mutations;