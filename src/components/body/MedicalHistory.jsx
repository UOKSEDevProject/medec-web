import React, { useState } from "react";
import CollapseView from "./list view/CollapseView";
import { medicalHistoryList } from "../../temp/data-store";

let screenHeight = window.screen.height;
let screenWidth = window.screen.width;
//todo change height the colaps and image
let collapseHeight = screenHeight / 0.7;
let collapseWidth = screenWidth / 3;
let prescriptionImageHeight = collapseHeight;

const MedicalHistory = () => {
  const [isShowCollapesView, setIsShowCollapesView] = useState(true);
  const [selectedItem, setSelectedItem] = useState(
    medicalHistoryList[0].details[0]
  );

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
          title={"Medical History"}
          listData={medicalHistoryList}
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

export default MedicalHistory;
