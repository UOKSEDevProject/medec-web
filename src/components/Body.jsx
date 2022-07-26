import DctList from "./body/DctList";
import { Container } from "react-bootstrap";
import Search from "./body/Search";
import DoctorProfile from "./body/DoctorProfile";
import PatientProfile from "./body/PatientProfile";
import Home from "./body/Home";
import DoctorRegistration from "./body/DoctorRegistration";
import MedicalCNumberSearch from "./body/MedicalCNumberSearch";
import PatientReportRequirementList from "./body/PatientReportRequirementList";
import ManualAppointmentDoctorProfile from "./body/ManualAppointmentDoctorProfile";
import AddManualAppointment from "./body/AddManualAppointment";
import PatientList from "./body/PatientList";
import Login from "./body/Login";
import Register from "./body/Register";
import LabPatientList from "./body/LabPatientList";
import AddPrescriptions from "./body/AddPrescriptions";
import MedicalHistory from "./body/MedicalHistory";
import LabReportPortal from "./body/LabReportPortal";
import { MyAppointments } from "./body/MyAppointments";

const Body = () => {
  return (
    <div>
      <div className='body-container'>
        <Container fluid={true}>
          {/* <Search />
          <DctList />
          <DoctorProfile />
          <PatientProfile />
          <DoctorRegistration />
          <PatientList />
          <MedicalCNumberSearch />
          <PatientReportRequirementList />
          <ManualAppointmentDoctorProfile />
          <DoctorRegistration />
          <AddManualAppointment />
          <Login />
          <Register />
          <LabPatientList />
          <AddPrescriptions /> */}
          <MedicalHistory />
          <LabReportPortal />
          {/* <MyAppointments /> */}
        </Container>
      </div>
      {/* <div className='home-page-container'>
              <Container fluid={true}>
                  <Home/>
              </Container>
          </div>*/}
    </div>
  );
};

export default Body;
