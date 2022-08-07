/*
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AddManualAppointment from "../components/body/AddManualAppointment";
import DctList from "../components/body/DctList";
import DoctorProfile from "../components/body/DoctorProfile";
import DoctorRegistration from "../components/body/DoctorRegistration";
import Home from "../components/body/Home";
import Login from "../components/body/Login";
import ManualAppointmentDoctorProfile from "../components/body/ManualAppointmentDoctorProfile";
import MedicalCNumberSearch from "../components/body/MedicalCNumberSearch";
import PatientList from "../components/body/PatientList";
import PatientReportRequirementList from "../components/body/PatientReportRequirementList";
import Register from "../components/body/Register";
import paths from "./routerConst";

const Router = () => {
  const CHAN_CENTER = "CHAN_CENTER";
  const USER = "USER";
  const LABORATORY = "LABORATORY";
  const DOCTOR = "DOCTOR";

  let role = DOCTOR; //using redux or local storage or props

  if (role == DOCTOR) {
    <Routes></Routes>;
  } else if (role == USER) {
    <Routes></Routes>;
  } else if (role == LABORATORY) {
    <Routes></Routes>;
  } else if (role == CHAN_CENTER) {
    <Routes></Routes>;
  } else {
    <Routes></Routes>;
  }
  return (
    //todo add loading page
    <Suspense fallback={<>Loading</>}>
      <Routes>
        <Route path={paths.LOGIN_PATH} element={<Login />}></Route>
        <Route path={paths.REGISTRATION_PATH} element={<Register />}></Route>

        {/!* protected *!/}

        <Route exact path={paths.HOME_PATH} element={<Home />}></Route>
        <Route path={paths.DR_LIST} element={<DctList />}></Route>
        <Route path={paths.PROFILE} element={<DoctorProfile />}></Route>
        <Route
          path={paths.MC_NUM_SEARCH}
          element={<MedicalCNumberSearch />}
        ></Route>
        <Route
          path={paths.DR_REGISTRATION}
          element={<DoctorRegistration />}
        ></Route>
        <Route path={paths.PT_LIST} element={<PatientList />}></Route>
        <Route
          path={paths.PT_REPORT_LIST}
          element={<PatientReportRequirementList />}
        ></Route>
        <Route
          path={paths.CC_MANUAL_APPOINTMENT}
          element={<ManualAppointmentDoctorProfile />}
        ></Route>
        <Route
          path={paths.CC_MANUAL_APPOINTMENT_PT_DETAILS}
          element={<AddManualAppointment />}
        ></Route>
      </Routes>
    </Suspense>
  );
};
export default Router;
*/
