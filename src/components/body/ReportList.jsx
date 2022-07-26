import React, { useState } from "react";
import CollapseView from "./list view/CollapseView";

let screenHeight = window.screen.height / 0.75;
let screenWidth = window.screen.width;

const listData = [
  {
    title: "November 2021",
    details: [
      { day: "23 rd", description: "Dr. John Hasitha" },
      { day: "24 th", description: "Dr. John Hasitha" },
      { day: "22 nd", description: "Dr. John Hasitha" },
    ],
  },
  {
    title: "October 2021",
    details: [
      { day: "23 rd", description: "Dr. John Hasitha" },
      { day: "24 th", description: "Dr. John Hasitha" },
      { day: "22 nd", description: "Dr. John Hasitha" },
    ],
  },
  {
    title: "September 2021",
    details: [
      { day: "23 rd", description: "Dr. John Hasitha" },
      { day: "24 th", description: "Dr. John Hasitha" },
      { day: "24 th", description: "Dr. John Hasitha" },
    ],
  },
  {
    title: "September 2021",
    details: [
      { day: "23 rd", description: "Dr. John Hasitha" },
      { day: "24 th", description: "Dr. John Hasitha" },
      { day: "24 th", description: "Dr. John Hasitha" },
    ],
  },
  {
    title: "September 2021",
    details: [
      { day: "23 rd", description: "Dr. John Hasitha" },
      { day: "24 th", description: "Dr. John Hasitha" },
      { day: "24 th", description: "Dr. John Hasitha" },
    ],
  },
];

const ReportList = () => {
  const [isShowCollapesView, setIsShowCollapesView] = useState(true);

  const drawerWidthHandler = () => {
    let isMobile = false;
    let width = isMobile
      ? isShowCollapesView
        ? screenWidth
        : 50
      : isShowCollapesView
      ? screenWidth / 3
      : 50;
    return width;
  };

  return (
    <div className='row'>
      {/* --------------------------list view------------------------- */}

      <div
        className='thilina'
        style={{
          padding: 0,
          backgroundColor: "#F6F6F6",
          position: "absolute",
          width: drawerWidthHandler(),
        }}
      >
        <CollapseView
          title={"Medical History"}
          listData={listData}
          setIsShowCollapesView={setIsShowCollapesView}
          isShowCollapesView={isShowCollapesView}
          screenHeight={screenHeight}
        />
      </div>

      {/*---------------------------------------------------------------*/}

      <div
        style={{
          margin: "20px 0",
        }}
      >
        <center>
          <img
            src='https://picsum.photos/200/300'
            loading='lazy'
            height={screenHeight}
            width={"auto"}
            alt={"prescription"}
          />
        </center>
      </div>
    </div>
  );
};

export default ReportList;
