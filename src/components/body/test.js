import React, {useEffect, useState} from 'react';
import {Button, Image} from 'react-bootstrap';
import tickImg from '../../assets/images/tick.png';
import unTickImg from '../../assets/images/untick.png';
import {useQuery} from "@apollo/client";
import queries from "../../graphql/queries";
import {useParams} from "react-router-dom";
import Spinner from "./Spinner";
import store from "../../data-store/reducer/root-reducer";
import {laboratoryActions} from "../../data-store/actions/laboratory-actions";
import {useSelector} from "react-redux";

const addCustomerDetailsToStore = (customer) => {
    console.log(customer)
    store.dispatch(laboratoryActions.addCustomerDetails(customer))
}

function PatientReportRequirementList() {
    const {userId} = useParams();
    const {loading} = useQuery(queries.getPatientReportRequirementList, {
        onCompleted: addCustomerDetailsToStore,
        variables: {
            pId: userId,
        }
    });
    const customer = useSelector(state => state.laboratoryDs.customerDetails);
    const [userDetails, setUserDetails] = useState('');
    const [reports,setReports] = useState(undefined);
    useEffect(() => {
        if (customer) {
            setUserDetails(customer);
        }
    }, [customer]);

    const setRequirement = (index,report) =>{
        setReports(reports=>[...reports]);
        reports[index]= {
            name: report.name,
            isRequired: !report.isRequired
        };
    }
    const completeTask = () => {
//have to save reports array with qr code details in backend
    }

    return (
        <div className='pt-report-req'>
            {loading && <Spinner isOverLay={true}/>}
            <div className='pt-report-req-body'>
                <div  className='pt-report-req-details'>
                    <div  className='pt-report-req-details-info'>
                        {/*<div className='pt-report-req-details-info-num'># {qrCodeDetails.number}</div>*/}
                        <div className='pt-report-req-details-info-name'>{userDetails.patient.disName}</div>
                        <div className='pt-report-req-details-info-row3'>
                            <div>{userDetails.patient?.age} &nbsp;years</div>
                            <div>{userDetails.patient.sex}</div>
                        </div>
                        <div>{userDetails.patient.cntNo}</div>
                    </div>
                    <Image className='pt-report-req-pp' src={userDetails.patient.prfImgUrl} roundedCircle={true}/>
                </div>
                <div  className='pt-report-req-list'>
                    <div className='pt-report-req-list-in'>
                        {
                            reports.map((report, index)=>(
                                <div key={report.id} className='pt-report-req-list-item'>
                                    <div>{report.name}</div>
                                    <div><Image src={report?.isRequired?tickImg:unTickImg} height={30} onClick={()=>setRequirement(index,report)}/></div>
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