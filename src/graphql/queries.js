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

const getAppointmentList = gql`
    query Query($getAppointmentsId: String!) {
      getAppointments(id: $getAppointmentsId) {
        channelCenter
        dctName
        date
        time
        aptNo
        refNo
        currAptNo
      }
    }
`;

const getDoctorProfile = gql `
    query Query($getDoctorSessionListId: String!) {
      getDoctorSessionList(id: $getDoctorSessionListId) {
        _id
        disName
        spec
        prfImgUrl
        channelCenters {
          _id
          hospitalName
          sessionsList {
            time
            date
            appointments
            maximumAppointments
          }
        }
      }
    }
`

const queries = {
    getChannelCenters: getChannelCenters,
    getDoctors: getDoctors,
    searchDoctors: searchDoctors,
    getAppointmentList: getAppointmentList,
    getDoctorProfile: getDoctorProfile
}

export default queries;