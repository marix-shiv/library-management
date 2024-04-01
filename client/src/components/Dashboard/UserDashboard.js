import React from "react";
import IssuedByUser from "../Books/Instances/IssuedByUser/IssuedByUser";

const UserDashboard = () => {
return (
    <>
    <div className="d-flex justify-content-center align-items-center">
        <IssuedByUser byMe={true} />
    </div>
    </>
);
};

export default UserDashboard;
