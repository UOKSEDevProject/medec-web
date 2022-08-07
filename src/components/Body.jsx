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
import Spinner from "./body/Spinner";
import {Redirect, Route, Switch} from "react-router-dom";

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
                <Switch>
                    <Route path='/login'>
                        <Container fluid={true}>
                            <Login/>
                        </Container>
                    </Route>

                    <Route path='/register'>
                        <Container fluid={true}>
                            <Register/>
                        </Container>
                    </Route>

                    <Route path='/able-dct'>
                        <Container fluid={false}>
                            <Search onInputChange={onSearchInputChange} onSelectOption={onSelectOption} onSearchClick={onSelectOption}/>
                            <DctList/>
                        </Container>
                    </Route>

                    <Route path='/home'>
                        <Container fluid={true} className='home-page-container'>
                            <Home/>
                        </Container>
                    </Route>

                    <Route path='/dct-prf'>
                        <Container fluid={true}>
                            <DoctorProfile/>
                        </Container>
                    </Route>

                    <Route path='/pnt-prf'>
                        <Container fluid={true}>
                            <PatientProfile/>
                        </Container>
                    </Route>

                    <Route path='/dct-reg'>
                        <Container fluid={true}>
                            <DoctorRegistration />
                        </Container>
                    </Route>

                    <Route path='/pnt-lst'>
                        <Container fluid={true}>
                            <PatientList />
                        </Container>
                    </Route>

                    <Route path='/med-no-sch'>
                        <Container fluid={true}>
                            <MedicalCNumberSearch/>
                        </Container>
                    </Route>

                    <Route path='/pnt-rpt-req'>
                        <Container fluid={true}>
                            <PatientReportRequirementList/>
                        </Container>
                    </Route>

                    <Route path='/mnl-app-dct-prf'>
                        <Container fluid={true}>
                            <ManualAppointmentDoctorProfile/>
                        </Container>
                    </Route>

                    <Route path='/add-mnl-app'>
                        <Container fluid={true}>
                            <AddManualAppointment/>
                        </Container>
                    </Route>

                    <Route path='/lb-pnt-lst'>
                        <Container fluid={true}>
                            <LabPatientList />
                        </Container>
                    </Route>

                    <Route path='/add-pre'>
                        <Container fluid={true}>
                            <AddPrescriptions/>
                        </Container>
                    </Route>

                    <Route path='/med-his'>
                        <Container fluid={true}>
                            <MedicalHistory/>
                        </Container>
                    </Route>

                    <Route path='/lb-rpt-ptl'>
                        <Container fluid={true}>
                            <LabReportPortal/>
                        </Container>
                    </Route>

                    <Route path='/my-app'>
                        <Container fluid={true}>
                            <MyAppointments/>
                        </Container>
                    </Route>

                    <Route path='/'>
                        <Container fluid={true}>
                            <Redirect to='/home'/>
                        </Container>
                    </Route>
                </Switch>
                {/*<DoctorProfile/>
                    <PatientProfile/>
                     <DoctorRegistration />
                     <PatientList />
                    <MedicalCNumberSearch/>
                    <PatientReportRequirementList/>
                    <ManualAppointmentDoctorProfile/>
                    <AddManualAppointment/>

                    <Register/>
                     <LabPatientList />
                    <AddPrescriptions/>
                    <MedicalHistory/>
                    <LabReportPortal/>
                    <MyAppointments/>*/}
            </div>
        </div>
);
};

export default Body;
