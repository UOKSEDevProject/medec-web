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
        _id
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
const getDoctorList = gql`
    query GetDoctorList ($chId: String!) {
      getDoctorList(chId: $chId) {
        statusCode
        statusDetails
        payload {
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
}
`
const getPatientReportRequirementList = gql`
    query GetPatientReportRequirementList($pId: String!) {
      getPatientReportRequirementList(pId: $pId) {
        statusCode
        statusDetails
        payload {
          patient {
            cntNo
            disName
            sex
            prfImgUrl
          }
          pendList {
            id
            name
          }
        }
      }
    }
`

const getPatientList = gql`
    query ExampleQuery($sessionId: String!) {
      getPatientList(sessionId: $sessionId) {
        payload {
          _id
          address
          birthDate
          bloodGroup
          description
          disName
          prfImgUrl
        }
        statusCode
        statusDetails
      }
    }
`

const getLabPatientList = gql`
query GetLabPatientList($lId: String!) {
  getLabPatientList(lId: $lId) {
    payload {
      _id
      birthDate
      gender
      name
      profilePicture
      tp
      reportList {
        id
        name
        status
      }
    }
    statusCode
    statusDetails
  }
}`

const queries = {
    getDoctors: getDoctors,
    getAvailableDoctors: getAvailableDoctors,
    searchDoctors: searchDoctors,
    getDoctorProfile: getDoctorProfile,
    getDoctorProfileForChannelCenter: getDoctorProfileForChannelCenter,
    getAppointmentList: getAppointmentList,
    searchForDoctorByMedicalCouncilNumber: searchForDoctorByMedicalCouncilNumber,
    getLabReportList: getLabReportList,
    getDoctorList: getDoctorList,
    getPatientReportRequirementList: getPatientReportRequirementList,
    getLabPatientList: getLabPatientList,
    getPatientList: getPatientList
}

export default queries;