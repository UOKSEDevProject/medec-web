import {memo} from "react";

const Spinner = (props) => {
    const {isOverLay, message} = props;

    return(
        <div className={`spinner-container ${isOverLay ? 'overlay' : ''}`}>
            <div className="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div>{message}</div>
        </div>
    );
};

export default memo(Spinner);