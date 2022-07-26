import React from "react";
import backButonIcon from "../../../assets/images/icon/back-arrow-icon.png";

const CollapseView = (props) => {
  const {
    title,
    listData,
    isShowCollapesView,
    setIsShowCollapesView,
    collapseHeight,
    setSelectedItem,
    selectedItem,
  } = props;

  let list = [];

  listData.map((item, key) => {
    list.push(
      <div key={key}>
        <div className='report-list-collapse-body-subtitle'>{item.title}</div>
        {item.details.length !== 0 ? (
          item.details.map((item, key) => {
            let isSelectedItem = selectedItem.id === item.id;
            return (
              <div
                className={
                  isSelectedItem
                    ? "report-list-collapse-body-row report-list-row-selected"
                    : "report-list-collapse-body-row"
                }
                key={key}
                onClick={() => {
                  setSelectedItem(item);
                }}
              >
                <div className='report-list-collapse-body-culumn1'>
                  {item && item.day && item.day.split(" ")[0]}{" "}
                  <sup>{item && item.day && item.day.split(" ")[1]}</sup>
                </div>

                <div className='report-list-collapse-body-culumn2'>
                  {item.description}
                </div>
              </div>
            );
          })
        ) : (
          <div className='report-list-empty-report-text'>
            No Reports Available
          </div>
        )}
      </div>
    );
  });

  return (
    <div
      className='report-list-collapse'
      style={{
        height: collapseHeight + 40,
      }}
    >
      <div className='report-list-collapse-header'>
        <img
          src={backButonIcon}
          className='report-list-backbutton-image'
          style={{
            transform: !isShowCollapesView && "rotate(180deg)",
          }}
          onClick={() => {
            setIsShowCollapesView((state) => {
              return !state;
            });
          }}
        />

        {isShowCollapesView && (
          <div className='report-list-collapse-title'>{title}</div>
        )}
      </div>
      <div className='report-list-collapse-body'>
        {isShowCollapesView &&
          list.map((item, key) => {
            return <div key={key}>{item}</div>;
          })}
      </div>
    </div>
  );
};

export default CollapseView;
