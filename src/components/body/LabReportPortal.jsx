import React, {useState} from "react";
import TestCollapseView from "./list view/CollapseView";
import {useQuery} from "@apollo/client";
import queries from "../../graphql/queries";
import Spinner from "./Spinner";
import store from "../../data-store/reducer/root-reducer";
import {useSelector} from "react-redux";
import {patientActions} from "../../data-store/actions/patient-actions";
import { useEffect } from "react";

const addLabReportListToStore = (data) => {
    store.dispatch(patientActions.addLabReportList(data.getLabReportList.payload))
};

const TestLabReportPortal = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const labReportList = useSelector(state => state.patientDS.labReportList);

    const {loading} = useQuery(queries.getLabReportList, {
        onCompleted: addLabReportListToStore,
        variables: {
            pId: "62c1dbdc8de3254ab1e020c2",
        }
    });

    useEffect(()=>{
        console.log(selectedItem)
    },[selectedItem])

    return (
      loading ? <Spinner isOverLay={true}/> :
        <div className="lab-report-portal">
            <div className="pt-container d-flex lab-container" id={isCollapsed ? "pt-container-overlay" : "empty"}>
                <TestCollapseView
                    title={"Lab Report List"}
                    items={labReportList}
                    index={selectedItem}
                    setIndex={setSelectedItem}
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                />
                <div className="pt flex-grow-1 presc-container">
                    {selectedItem && typeof(selectedItem.imgUrl)!=='undefined' &&
                        <img
                            src={selectedItem.imgUrl}
                           //  style={{width:"100%",objectFit:"contain"}}
                            loading='lazy'
                            alt="prescription"
                        />}
                </div>
            </div>
        </div>
    );
};

export default TestLabReportPortal;