import {Container} from "react-bootstrap";
import queries from "../graphql/queries";
import client from "../connection/connection";
import store from "../data-store/reducer/root-reducer";
import {doctorActions} from "../data-store/actions/doctor-actions";
import Spinner from "./body/Spinner";
import {Redirect, Route, Switch} from "react-router-dom";
import {Suspense, lazy} from "react";
import DoctorTimeSchedule from "./body/DoctorTimeSchedule";

const Login = lazy(() => import('./body/Login'));
const Register = lazy(() => import('./body/Register'));
const Search = lazy(() => import('./body/Search'));
const DctList = lazy(() => import('./body/DctList'));
const Home = lazy(() => import('./body/Home'));
const DoctorProfile = lazy(() => import('./body/DoctorProfile'));
const PatientProfile = lazy(() => import('./body/PatientProfile'));
const DoctorRegistration = lazy(() => import('./body/DoctorRegistration'));
const PatientList = lazy(() => import('./body/PatientList'));
const MedicalCNumberSearch = lazy(() => import('./body/MedicalCNumberSearch'));
const PatientReportRequirementList = lazy(() => import('./body/PatientReportRequirementList'));
const MyAppointments = lazy(() => import('./body/MyAppointments'));
const LabReportPortal = lazy(() => import('./body/LabReportPortal'));
const MedicalHistory = lazy(() => import('./body/MedicalHistory'));
const AddPrescriptions = lazy(() => import('./body/AddPrescriptions'));
const LabPatientList = lazy(() => import('./body/LabPatientList'));
const AddManualAppointment = lazy(() => import('./body/AddManualAppointment'));
const ManualAppointmentDoctorProfile = lazy(() => import('./body/ManualAppointmentDoctorProfile'));
const SearchedDctCardList = lazy(() => import('./body/SearchedDctCardList'))

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
            resolve(processSearchData(res.data.getDoctors));
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
                <Suspense fallback={<Spinner/>}>
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
                                <Search onInputChange={onSearchInputChange} onSelectOption={onSelectOption}
                                        onSearchClick={onSelectOption}/>
                                <DctList/>
                            </Container>
                        </Route>

                        <Route path='/lab-req'>
                            <Container fluid={false}>
                                <PatientReportRequirementList/>
                            </Container>
                        </Route>

                        <Route path='/home'>
                            <Container fluid={true} className='home-page-container'>
                                <Home/>
                            </Container>
                        </Route>

                        <Route path='/dct-prf/:dctId'>
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
                                <DoctorRegistration/>
                            </Container>
                        </Route>

                        <Route path='/dct-time-sch/:dctId'>
                            <Container fluid={true}>
                                <DoctorTimeSchedule/>
                            </Container>
                        </Route>

                        <Route path='/pnt-lst'>
                            <Container fluid={true}>
                                <PatientList/>
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
                                <LabPatientList/>
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

                        <Route path='/mk-app'>
                            <Container fluid={false}>
                                <Search onInputChange={onSearchInputChange} onSelectOption={onSelectOption} onSearchClick={onSelectOption}/>
                                <SearchedDctCardList/>
                            </Container>
                        </Route>

                        <Route path='/'>
                            <Container fluid={true}>
                                <Redirect to='/home'/>
                            </Container>
                        </Route>
                    </Switch>
                </Suspense>
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
