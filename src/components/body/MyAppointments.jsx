import React from "react";
import { useState } from "react";

const myAppointmentList = [
  {
    channelingCenter: "Navinna Hospital",
    doctor: "Dr Pethum Kuruppu",
    date: "2021/10/03",
    time: "8.00 PM",
    no: "23",
    referenceNumber: "0122321331B",
  },
  {
    channelingCenter: "Navinna Hospital",
    doctor: "Dr Pethum Kuruppu",
    date: "2021/10/03",
    time: "8.00 PM",
    no: "23",
    referenceNumber: "0122321331B",
  },
];

export const MyAppointments = () => {
  const [AppointmentList, setAppoinmetList] = useState(myAppointmentList);

  const renderTabRow = () => {
    let row = [];
    AppointmentList.map((item, key) => {
      row.push(
        <tr key={key}>
          <td>{item.channelingCenter}</td>
          <td>{item.doctor}</td>
          <td>{item.date}</td>
          <td>{item.time}</td>
          <td>{item.no}</td>
          <td>{item.referenceNumber}</td>
          <td>{item.channelingCenter}</td>
        </tr>
      );
    });

    return row;
  };
  return (
    <div className='myappointment-page'>
      <div className='table-responsive-md'>
        <table className='table table-bordered'>
          <thead>
            <tr className='myappointment-page-table-head'>
              <th scope='col'>Channeling Center</th>
              <th scope='col'>Doctor</th>
              <th scope='col'>Date</th>
              <th scope='col'>Time</th>
              <th scope='col'>No</th>
              <th scope='col'>Reference Number</th>
              <th scope='col'>Current Appointment Number</th>
            </tr>
          </thead>
          <tbody>{renderTabRow()}</tbody>
        </table>
      </div>
    </div>
  );
};
