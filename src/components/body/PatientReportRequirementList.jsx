import React, {useState} from 'react';
import {Button, Image} from 'react-bootstrap';
import {qrCodeDetails} from '../../temp/data-store';
import tickImg from '../../assets/images/tick.png';
import unTickImg from '../../assets/images/untick.png';

function PatientReportRequirementList() {

    const [reports,setReports] = useState(qrCodeDetails.reportList);

    const setRequirement = (index,report) =>{

      setReports(reports=>[...reports]);
        reports[index]= {
            name: report.name,
            isRequired: !report.isRequired
        };
    }
    const completeTask = () => {

    }

    return (
        <div className='pt-report-req'>
            <div className='pt-report-req-body'>
                <div  className='pt-report-req-details'>
                    <div  className='pt-report-req-details-info'>
                        <div className='pt-report-req-details-info-num'># {qrCodeDetails.number}</div>
                       <div className='pt-report-req-details-info-name'>{qrCodeDetails.name}</div>
                        <div className='pt-report-req-details-info-row3'>
                            <div>{qrCodeDetails.age} &nbsp;years</div>
                            <div>{qrCodeDetails.gender}</div>
                        </div>
                        <div>{qrCodeDetails.tp}</div>
                    </div>
                    <Image className='pt-report-req-pp' src={qrCodeDetails.profilePicture} roundedCircle={true}/>
                </div>
                <div  className='pt-report-req-list'>
                    <div className='pt-report-req-list-in'>
                        {
                            reports.map((report, index)=>(
                                <div key={index} className='pt-report-req-list-item'>
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