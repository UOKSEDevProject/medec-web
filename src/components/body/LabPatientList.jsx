import React, {useState, useEffect} from 'react';
import Drawer from "./Drawer";
import {Button, Image} from "react-bootstrap";
import tickImg from "../../assets/images/tick.png";
import uploadImg from "../../assets/images/upload.png";
import unTickImg from "../../assets/images/untick.png"
import Spinner from "./Spinner";
import {useQuery} from "@apollo/client";
import queries from "../../graphql/queries";
import store from "../../data-store/reducer/root-reducer";
import {laboratoryActions} from "../../data-store/actions/laboratory-actions";
import {useSelector} from "react-redux";

function addCustomerListToStore(customerList) {
    store.dispatch(laboratoryActions.addCustomerList(customerList.getLabPatientList.payload))
}

function LabPatientList(props) {
    const [index, setIndex] = useState(undefined);
    const [toggle, setToggle] = useState(false);
    const [reports,setReports] = useState();
    const {loading} = useQuery(queries.GetLabPatientList, {
        onCompleted: addCustomerListToStore,
        variables: {lId: sessionStorage.getItem("usrId")}
    });
    const customerList = useSelector(state => state.laboratoryDs.customerList);
    const [customersLst, setCustomersLst] = useState(undefined);

    useEffect(() => {
        if(customerList){
            setReports(customersLst && customersLst[index]?.reportList);
        }
    }, [index,customerList]);

    useEffect(() => {
        if (customerList) {
            setCustomersLst(customerList);
            setIndex(0);
        }
    }, [customerList]);


const setHide = (length) => {
    return index === length-1;

}
    const upload = (index,report) =>{
        setReports(reports=>[...reports]);
        reports[index]= {
            name: report.name,
            isRequired: report.isRequired,
            isUpload:true,
        };
        // have to add functions for upload
    }

    const toNext = () => {
       index+1 < setCustomersLst.length && setIndex((index) => (index = index + 1));
    };

    return (
        <div className="d-flex">
            {loading && <Spinner isOverLay={true}/>}
            <Drawer title="Customers" items={customersLst} index={index} setIndex={setIndex} toggle={toggle}
                    setToggle={setToggle}/>
            <div className=' p-5 flex-grow-1 pt-report-req-body'>
                <div  className='pt-report-req-details'>
                    <div  className='pt-report-req-details-info'>
                        <div className='pt-report-req-details-info-num'># {index+1}</div>
                        <div className='pt-report-req-details-info-name'>{customersLst && customersLst[index]?.name}</div>
                        <div className='pt-report-req-details-info-row3'>
                            <div>{customersLst && customersLst[index]?.age} &nbsp;years</div>
                            <div>{customersLst && customersLst[index]?.gender}</div>
                        </div>
                        <div>{customersLst && customersLst[index]?.tp}</div>
                    </div>
                    <Image className='pt-report-req-pp' src={customersLst && customersLst[index]?.profilePicture} roundedCircle={true}/>
                </div>
                <div  className='pt-report-req-list'>
                    <div className='pt-report-req-list-in'>
                        {
                            reports?.map((report, index)=>(
                                <div key={index} className='pt-report-req-list-item'>
                                    <div>{report.name}</div>
                                    <div className={'list-item-images'}>
                                        <div><Image src={report.isUpload?tickImg:uploadImg}
                                                    height={30} onClick={()=>!report.isUpload && upload(index,report) }/></div>
                                    </div>
                                   </div>
                            ))
                        }
                    </div>

                </div>
                <div className='pt-report-req-finish'>
                    <Button className='default-btn' variant='secondary' onClick={toNext} hidden={index !== setCustomersLst.length-1}>Next</Button>
                </div>
            </div>
        </div>
    );
}

export default LabPatientList;