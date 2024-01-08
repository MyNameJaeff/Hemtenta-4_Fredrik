import React from "react";

function Status(props) {
    if (props.status === "Available") {
        return (
            <div className="status available">
                <h3>{props.name + " is currently available"}</h3>
            </div>
        );
    } else {
        return (
            <div className="status unavailable">
                <h3>{"Meeting in progress, please do not disturb"}</h3>
            </div>
        );
    }
}

export default Status;