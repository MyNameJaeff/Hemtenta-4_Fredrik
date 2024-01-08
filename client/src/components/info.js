import React from "react";

function Info(props) {
    return (
        <div className="personInfo">
            <div className="personInfo-image">
                <img src={props.img} className="personInfo-logo" alt="logo" />
            </div>
            <div className="personInfo-text">
                <p>{props.name}</p>
                <p>{props.role}</p>
                <p>{"Num: " + props.number}</p>
                <p>{"Mail: " + props.mail}</p>
            </div>
        </div>
    );
}

export default Info;
