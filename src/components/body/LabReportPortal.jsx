import React, { useState } from "react";
import CollapseView from "./list view/CollapseView";
import { labReportList } from "../../temp/data-store";

let screenHeight = window.screen.height;
let screenWidth = window.screen.width;

let collapseHeight = screenHeight / 2.75;
let collapseWidth = screenWidth / 3;
let prescriptionImageHeight = collapseHeight;

const LabReportPortal = () => {
  const [isShowCollapesView, setIsShowCollapesView] = useState(true);
  const [selectedItem, setSelectedItem] = useState(labReportList[0].details[0]);

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

  return (
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
          margin: "20px 0",
          height: prescriptionImageHeight,
        }}
      >
        <center>
          <img
            src={selectedItem.imgURL}
            loading='lazy'
            height={prescriptionImageHeight}
            width={"auto"}
            alt={"prescription"}
          />
        </center>
      </div>
    </div>
  );
};

export default LabReportPortal;
