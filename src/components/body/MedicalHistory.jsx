import React, {useEffect, useState} from "react";
import CollapseView from "./list view/CollapseView";
import store from "../../data-store/reducer/root-reducer";
import {patientActions} from "../../data-store/actions/patient-actions";
import {useQuery} from "@apollo/client";
import queries from "../../graphql/queries";
import {useSelector} from "react-redux";
import Spinner from "./Spinner";

let screenHeight = window.screen.height;
let screenWidth = window.screen.width;
//todo change height the colaps and image
let collapseHeight = screenHeight / 0.7;
let collapseWidth = screenWidth / 3;
let prescriptionImageHeight = collapseHeight;

const addMedicalHistoryToStore = (data) => {
    store.dispatch(patientActions.addMedicalHistory(data.getLabReportList.payload))
};

const MedicalHistory = () => {
    const {loading} = useQuery(queries.getLabReportList, {
        onCompleted: addMedicalHistoryToStore,
        variables: {
            pId: "62c1dbdc8de3254ab1e020c2",
        }
    });
    const medicalHistoryList = useSelector(state => state.patientDS.medicalHistoryList);
    const [isShowCollapesView, setIsShowCollapesView] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        if (medicalHistoryList) {
            setSelectedItem(medicalHistoryList[0]?.reports[0]);
        }
    }, [medicalHistoryList])

    const drawerWidthHandler = () => {
        let isMobile = false;
        let width = isMobile
            ? isShowCollapesView
                ? screenWidth
                : 50
            : isShowCollapesView
                ? collapseWidth
                : 50;
        return width;
    };

    return loading ? <Spinner isOverLay={true}/> :
        <div className='row'>
            {/* --------------------------list view------------------------- */}

            <div
                className='report-list-collapse-container'
                style={{
                    backgroundColor: !isShowCollapesView && "rgba(0,0,0,0)",
                    width: drawerWidthHandler(),
                }}
            >
                <CollapseView
                    title={"Medical History"}
                    listData={medicalHistoryList}
                    setIsShowCollapesView={setIsShowCollapesView}
                    isShowCollapesView={isShowCollapesView}
                    collapseHeight={collapseHeight}
                    setSelectedItem={setSelectedItem}
                    selectedItem={selectedItem}
                />
            </div>

            {/*---------------------------------------------------------------*/}

            <div
                style={{
                    margin: "20px 0",
                    height: prescriptionImageHeight,
                }}
            >
                <center>
                    <img
                        src={selectedItem.imgURL}
                        loading='lazy'
                        height={prescriptionImageHeight}
                        width={"auto"}
                        alt={"prescription"}
                    />
                </center>
            </div>
        </div>;
};

export default MedicalHistory;
