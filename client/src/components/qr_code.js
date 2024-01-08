import React from "react";
import qrCode from '../qr_code.png';

function QrCode(props) {
    return (
        <div className="qrcode-div">
            <img src={qrCode} alt="QR Code" className="qrImg" />
            <h3>Scan the QR Code to book a time with {props.name}</h3>
        </div>
    );
}

export default QrCode;