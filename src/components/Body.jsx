import DctList from "./body/DctList";
import {Container} from "react-bootstrap";
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
import {MyAppointments} from "./body/MyAppointments";
import queries from "../graphql/queries";
import client from "../connection/connection";
import store from "../data-store/reducer/root-reducer";
import {doctorActions} from "../data-store/actions/doctor-actions";

const processSearchData = (data) => {
    return data.map((item) => {
        return {...item, label: `Dr. ${item.disName}`, value: item}
    });
};

const onSearchInputChange = (inputValue) => {
    return new Promise((resolve, reject) => {
        let req = {
            query: queries.searchDoctors,
            variables: {
                searchValue: inputValue
            },
            fetchPolicy: 'network-only'
        };

        client.query(req).then((res) => {
            resolve(processSearchData(res.data.searchDoctors));
        }).catch(error => {
            reject(error);
        });
    });
};

const onSelectOption = (options) => {
    store.dispatch(doctorActions.addSearchList(options));
};

const Body = () => {
    return (
        <div>
            <div className='body-container'>
                <Container>
                    <Search onInputChange={onSearchInputChange} onSelectOption={onSelectOption} onSearchClick={onSelectOption}/>
                    <DctList/>
                </Container>
                <Container fluid={true}>
                    <DoctorProfile/>
                    <PatientProfile/>
                    {/* <DoctorRegistration /> */}
                    {/* <PatientList /> */}
                    <MedicalCNumberSearch/>
                    <PatientReportRequirementList/>
                    <ManualAppointmentDoctorProfile/>
                    <AddManualAppointment/>
                    <Login/>
                    <Register/>
                    {/* <LabPatientList /> */}
                    <AddPrescriptions/>
                    <MedicalHistory/>
                    <LabReportPortal/>
                    <MyAppointments/>
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
