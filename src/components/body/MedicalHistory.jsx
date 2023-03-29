import React, {useEffect, useState} from "react";
import TestCollapseView from "./list view/CollapseView";
import store from "../../data-store/reducer/root-reducer";
import {patientActions} from "../../data-store/actions/patient-actions";
import {useQuery} from "@apollo/client";
import queries from "../../graphql/queries";
import {useSelector} from "react-redux";
import Spinner from "./Spinner";
import {useParams} from "react-router-dom";

const addMedicalHistoryToStore = (data) => {
    store.dispatch(patientActions.addMedicalHistory(data.getMedicalReportList.payload))
};

const MedicalHistory = () => {
    const userId = useParams();
    const {loading} = useQuery(queries.getMedicalReportList, {
        onCompleted: addMedicalHistoryToStore,
        variables: {
            pId: userId.userId,
        },
        fetchPolicy: 'network-only'
    });
    const medicalHistoryList = useSelector(state => state.patientDS.medicalHistoryList);
    const [isShowCollapesView, setIsShowCollapesView] = useState(true);
    const [selectedItem, setSelectedItem] = useState(undefined);

    useEffect(() => {
        return(()=>{
            setSelectedItem(undefined);
        })
    },[])

    useEffect(() => {
        //select first report
        if (medicalHistoryList && medicalHistoryList.length>0) {
            for(let i=0; i<medicalHistoryList.length; i++){
                let item = medicalHistoryList[i];
                if(item.reports && item.reports.length>0){
                    for(let j=0; j<item.reports.length; j++){
                        if(item.reports[j]){
                            setSelectedItem(item.reports[j]);
                            i=medicalHistoryList.length;
                            break;
                        }
                    }
                }
            }
        }
    }, [medicalHistoryList])

    return (
        loading ? <Spinner isOverLay={true}/> :
            <div className="lab-report-portal">
                <div className="pt-container d-flex lab-container" id={isShowCollapesView ? "pt-container-overlay" : "empty"}>
                    <TestCollapseView
                        title={"Medical History"}
                        items={medicalHistoryList}
                        index={selectedItem}
                        setIndex={setSelectedItem}
                        isCollapsed={isShowCollapesView}
                        setIsCollapsed={setIsShowCollapesView}
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

export default MedicalHistory;
