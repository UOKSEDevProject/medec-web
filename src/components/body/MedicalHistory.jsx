import React, {useEffect, useState} from "react";
import CollapseView from "./list view/CollapseView";
import store from "../../data-store/reducer/root-reducer";
import {patientActions} from "../../data-store/actions/patient-actions";
import {useQuery} from "@apollo/client";
import queries from "../../graphql/queries";
import {useSelector} from "react-redux";
import Spinner from "./Spinner";
import {useParams} from "react-router-dom";

let screenHeight = window.screen.height;
let screenWidth = window.screen.width;
//todo change height the colaps and image
let collapseHeight = screenHeight / 0.7;
let collapseWidth = screenWidth / 3;
let prescriptionImageHeight = collapseHeight;

const addMedicalHistoryToStore = (data) => {
    store.dispatch(patientActions.addMedicalHistory(data.getMedicalReportList.payload))
};

const MedicalHistory = () => {
    const userId = useParams();
    const {loading} = useQuery(queries.getMedicalReportList, {
        onCompleted: addMedicalHistoryToStore,
        variables: {
            pId: userId.userId,
        }
    });
    const medicalHistoryList = useSelector(state => state.patientDS.medicalHistoryList);
    const [medHis, setMedHis] = useState(undefined);
    const [isShowCollapesView, setIsShowCollapesView] = useState(true);
    const [selectedItem, setSelectedItem] = useState(undefined);

    useEffect(() => {
        if (medicalHistoryList) {
            setMedHis()
            setSelectedItem(0);
            // setSelectedItem(medicalHistoryList[0]?.reports[0]);
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
                    // title={"Medical History"}
                    // listData={medHis && medHis}
                    // setIsShowCollapesView={setIsShowCollapesView}
                    // isShowCollapesView={isShowCollapesView}
                    // collapseHeight={collapseHeight}
                    // setSelectedItem={setSelectedItem}
                    // selectedItem={selectedItem && selectedItem}

                    title={"Medical History"}
                    items={medicalHistoryList}
                    index={selectedItem && selectedItem}
                    setIndex={setSelectedItem}
                    isCollapsed={isShowCollapesView}
                    setIsCollapsed={setIsShowCollapesView}
                />
            </div>

            {/*---------------------------------------------------------------*/}

            <div
                style={{
                    margin: "20px 0",
                    height: prescriptionImageHeight,
                }}
            >
                {/*<center>*/}
                {/*    <img*/}
                {/*        src={medicalHistoryList[selectedItem]?.imgURL}*/}
                {/*        loading='lazy'*/}
                {/*        height={prescriptionImageHeight}*/}
                {/*        width={"auto"}*/}
                {/*        alt={"prescription"}*/}
                {/*    />*/}
                {/*</center>*/}
            </div>
        </div>;
};

export default MedicalHistory;
