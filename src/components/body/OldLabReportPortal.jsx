import React, {useEffect, useState} from "react";
import CollapseView from "./list view/CollapseView";
import {Button} from "react-bootstrap";
import {exportPdf} from "../../utils/export";
import LABREPORT from "../../assets/images/lab-report.png"
import {useQuery} from "@apollo/client";
import queries from "../../graphql/queries";
import Spinner from "./Spinner";
import store from "../../data-store/reducer/root-reducer";
import {useSelector} from "react-redux";
import {patientActions} from "../../data-store/actions/patient-actions";

let screenHeight = window.screen.height;
let screenWidth = window.screen.width;
//todo change height the colaps and image
let collapseHeight = screenHeight / 0.7;
let collapseWidth = screenWidth / 3;
let prescriptionImageHeight = collapseHeight;

const addLabReportListToStore = (data) => {
    store.dispatch(patientActions.addLabReportList(data.getLabReportList.payload))
};

const LabReportPortal = () => {
    const {loading} = useQuery(queries.getLabReportList, {
        onCompleted: addLabReportListToStore,
        variables: {
            pId: "62c1dbdc8de3254ab1e020c2",
        }
    });
    const labReportList = useSelector(state => state.patientDS.labReportList);
    const [isShowCollapesView, setIsShowCollapesView] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        if (labReportList) {
            setSelectedItem(labReportList[0]?.reports[0]);
        }
    }, [labReportList])

    const drawerWidthHandler = () => {
        let isMobile = true;
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
        <div className='row reportLst'>
            {/* --------------------------list view------------------------- */}
            <div
                className='report-list-collapse-container'
                style={{
                    backgroundColor: !isShowCollapesView && "rgba(0,0,0,0)",
                    width: drawerWidthHandler(),
                }}
            >
                <CollapseView
                    title={"Lab Report List"}
                    listData={labReportList}
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
                    height: '90vh',
                }}
            >
                <img
                    className='lab-report'
                    src={selectedItem?.imgUrl}
                    loading='lazy'
                    height={'100%'}
                    width={"auto"}
                    alt={"prescription"}
                />
            </div>
            <Button onClick={() => exportPdf(LABREPORT)}>Download PDF</Button>
        </div>;
};

export default LabReportPortal;
