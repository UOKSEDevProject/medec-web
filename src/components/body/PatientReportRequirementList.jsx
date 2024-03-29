import React, {useEffect, useState} from 'react';
import {Button, Image} from 'react-bootstrap';
import tickImg from '../../assets/images/tick.png';
import unTickImg from '../../assets/images/untick.png';
import {useHistory, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import queries from "../../graphql/queries";
import store from "../../data-store/reducer/root-reducer";
import {laboratoryActions} from "../../data-store/actions/laboratory-actions";
import Spinner from "./Spinner";
import {useSelector} from "react-redux";
import {notifyMessage} from "../../utils/notification";
import mutations from "../../graphql/mutations";

const addCustomerDetailsToStore = (customer) => {
    store.dispatch(laboratoryActions.addCustomerDetails(customer.getPatientReportRequirementList.payload))
}

function PatientReportRequirementList() {
    const userId = useParams();
    const history = useHistory();
    const {loading} = useQuery(queries.getPatientReportRequirementList, {
        onCompleted: addCustomerDetailsToStore,
        variables: {pId: userId.userId}
    });
    const customer = useSelector(state => state.laboratoryDs.customerDetails);
    const [UserDetails, setUserDetails] = useState(undefined);
    const [reports,setReports] = useState([]);
    const [onSelectingReportsRequired] = useMutation(mutations.onSelectingReportsRequired);

    useEffect(() => {
        if (customer) {
            setUserDetails(customer);
            setReports(customer.pendList);
        }
    }, [customer]);

    const setRequirement = (index,report) =>{
      setReports(reports=>[...reports]);
        reports[index]= {
            name: report.name,
            id: report.id,
            isRequired: !report.isRequired
        };
    }
    const completeTask = () => {
        const desiredValue = (reports) => {
            let output = [];
            for (let item of reports) {
               item.isRequired && output.push(item.id);
            }
            return output;
        }
        const requirementList = desiredValue(reports);
        updateRequirements(requirementList)
    }

    const updateRequirements = (requirementList) => {

            onSelectingReportsRequired({
                variables: {
                    updateLabReportsInput: {
                        lId: sessionStorage.getItem("usrId"),
                        pId: userId.userId,
                        labReqConfList: requirementList
                    }
                }, fetchPolicy: "no-cache"
            }).then((res) => {
                if(res.data.updateSelectedLabReports.statusCode === 'S0000'){
                    notifyMessage("Successfully Logged", '1');
                    history.push('/home')
                }});
    }
    return (
        <div className='pt-report-req'>
            {loading && <Spinner isOverLay={true}/>}
            <div className='pt-report-req-body'>
                <div  className='pt-report-req-details'>
                    <div  className='pt-report-req-details-info'>
                        {/*<div className='pt-report-req-details-info-num'># {qrCodeDetails.number}</div>*/}
                       <div className='pt-report-req-details-info-name'>{UserDetails?.patient?.disName}</div>
                        <div className='pt-report-req-details-info-row3'>
                            <div>{UserDetails?.patient?.age} &nbsp;years</div>
                            <div>{UserDetails?.patient?.sex}</div>
                        </div>
                        <div>{UserDetails?.patient?.cntNo}</div>
                    </div>
                    <Image className='pt-report-req-pp' src={UserDetails?.patient?.prfImgUrl} roundedCircle={true}/>
                </div>
                <div  className='pt-report-req-list'>
                    <div className='pt-report-req-list-in'>
                        {
                            reports.map((report, index)=>(
                                <div key={report.id} className='pt-report-req-list-item'>
                                    <div>{report.name}</div>
                                    <div><Image src={report.isRequired?tickImg:unTickImg} height={30} onClick={()=>setRequirement(index,report)}/></div>
                                </div>
                            ))
                        }
                    </div>

                </div>
                <div className='pt-report-req-finish'>
                    <Button className='default-btn' variant='secondary' onClick={completeTask}>Finish</Button>
                </div>
            </div>
        </div>
    );
}

export default PatientReportRequirementList;