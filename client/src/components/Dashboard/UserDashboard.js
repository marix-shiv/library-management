/**
 * UserDashboard.js
 * 
 * This is a React component that provides the main dashboard for regular users. It includes a list of books issued by the user.
 * 
 * The component does not receive any props or manage any state. It simply returns a JSX element that includes the IssuedByUser component.
 * 
 * The IssuedByUser component is passed a prop of byMe with a value of true, indicating that it should display the books issued by the current user.
 * 
 * @module components/UserDashboard
 */

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
