// cc- channel center
// pt- patient
// dr- doctor
// mc- medical council number

const ROUTE_PATH = "";

const paths = {
  HOME_PATH: `${ROUTE_PATH}/home`,
  LOGIN_PATH: `${ROUTE_PATH}/login`,
  REGISTRATION_PATH: `${ROUTE_PATH}/register`,

  DR_LIST: `${ROUTE_PATH}/doctor-list`,
  PROFILE: `${ROUTE_PATH}/profile`,
  DR_REGISTRATION: `${ROUTE_PATH}/doctor-reg`,
  PT_LIST: `${ROUTE_PATH}/patient-list`,
  MC_NUM_SEARCH: `${ROUTE_PATH}/mc-search`,
  PT_REPORT_LIST: `${ROUTE_PATH}/patient-reports`,

  CC_MANUAL_APPOINTMENT: `${ROUTE_PATH}/add-patient`,
  CC_MANUAL_APPOINTMENT_PT_DETAILS: `${ROUTE_PATH}/add-patient-details`,
};

export default paths;
