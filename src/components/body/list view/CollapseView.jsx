import React from "react";
import backButonIcon from "../../../assets/images/icon/back-arrow-icon.png";

const CollapseView = (props) => {
  const {
    title,
    listData,
    isShowCollapesView,
    setIsShowCollapesView,
    screenHeight,
  } = props;

  let list = [];

  listData.map((item, key) => {
    list.push(
      <div key={key}>
        <div
          style={{
            backgroundColor: "#234351",
            color: "#fff",
            paddingLeft: "10px",
          }}
        >
          {item.title}
        </div>
        {item.details.map((item, key) => {
          return (
            <div
              key={key}
              style={{
                display: "flex",
                borderBlockColor: "#000",
                borderBlockStyle: "solid",
                borderBlockWidth: "1px",
                padding: "5px",
                paddingLeft: "20px",
              }}
            >
              <div>
                {item && item.day && item.day.split(" ")[0]}{" "}
                <sup>{item && item.day && item.day.split(" ")[1]}</sup>
              </div>

              <div style={{ marginLeft: "20px" }}>{item.description}</div>
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <div
      style={{
        backgroundColor: "#F6F6f4",
        height: screenHeight + 40,
        overflow: "scroll",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: "row",
          paddingTop: "10px",
          marginBottom: "5px",
        }}
      >
        <img
          src={backButonIcon}
          style={{
            height: "35px",
            width: "35px",
            padding: "5px",
            margin: "auto",
            transform: !isShowCollapesView && "rotate(180deg)",
          }}
          onClick={() => {
            setIsShowCollapesView((state) => {
              return !state;
            });
          }}
        />

        {isShowCollapesView && (
          <div
            style={{
              textAlign: "center",
              margin: "auto",
            }}
          >
            {title}
          </div>
        )}
      </div>
      <div
        style={{
          padding: 0,
        }}
      >
        {isShowCollapesView &&
          list.map((item, key) => {
            return <div key={key}>{item}</div>;
          })}
      </div>
    </div>
  );
};

export default CollapseView;
