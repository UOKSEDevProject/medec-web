import {gql} from "@apollo/client";

const getDoctors = gql`
  query GetDoctors($searchValue: String, $category: String) {
      getDoctors(searchValue: $searchValue, category: $category) {
        _id
        disName
        imageSrc
        mediCenter
        status
        specialization
      }
  }
`;

const getAvailableDoctors = gql`
    query GetAvailableDoctors($searchValue: String, $category: String) {
      getAvailableDoctors(searchValue: $searchValue, category: $category) {
        _id
        disName
        imageSrc
        mediCenter
        specialization
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

const getDoctorProfile = gql`
    query Query($getDoctorProfileId: String!) {
      getDoctorProfile(id: $getDoctorProfileId) {
        _id
        channelCenters {
          _id
          hospitalName
          sessionsList {
            appointments
            date
            id
            maximumAppointments
            time
          }
        }
        prfImgUrl
        disName
        spec
      }
    }
`

const getDoctorProfileForChannelCenter = gql`
    query GetDoctorProfileForChannelCenter($getDoctorProfileForChannelCenterId: String!, $chId: String!) {
      getDoctorProfileForChannelCenter(id: $getDoctorProfileForChannelCenterId, chId: $chId) {
        _id
        disName
        prfImgUrl
        sessionsList {
          appointments
          date
          id
          maximumAppointments
          time
        }
        spec
      }
    }
`

const searchForDoctorByMedicalCouncilNumber = gql`
   query Query($getDoctorByIdId: String!) {
      getDoctorById(id: $getDoctorByIdId) {
        payload {
          _id
          disName
        }
        statusCode
        statusDetails
      }
    }
`

const getLabReportList = gql`
    query GetLabReportList($pId: String!) {
      getLabReportList(pId: $pId) {
        payload {
          month
          reports {
            day
            description
            id
            imgUrl
          }
        }
        statusCode
        statusDetails
      }
    }
`

const queries = {
    getDoctors: getDoctors,
    getAvailableDoctors: getAvailableDoctors,
    searchDoctors: searchDoctors,
    getDoctorProfile: getDoctorProfile,
    getDoctorProfileForChannelCenter: getDoctorProfileForChannelCenter,
    getAppointmentList: getAppointmentList,
    searchForDoctorByMedicalCouncilNumber: searchForDoctorByMedicalCouncilNumber,
    getLabReportList: getLabReportList
}

export default queries;