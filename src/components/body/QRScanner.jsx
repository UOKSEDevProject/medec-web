import React, {useEffect, useState} from 'react';
import { OneOffQrScanner } from 'react-webcam-qr-scanner.ts';
import {useHistory} from "react-router-dom";

function QrScanner() {
    const history = useHistory();
    const readQRCode = (userID) => {
      history.push(`/usr-req/${userID}`)
    }

    return (<div className='qr-scanner'>
            <h1>Please Scan QR Code</h1>
            <center>
                <OneOffQrScanner
                    onQrCode={readQRCode}
                    hidden={false}
                />
            </center>
        </div>);
}

export default QrScanner;