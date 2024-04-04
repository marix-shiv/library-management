/**
 * UnverifiedDashboard.js
 * 
 * This is a React component that displays a message to the user that their account verification is in progress.
 * 
 * The component does not receive any props or manage any state. It simply returns a JSX element that includes the message and an image.
 * 
 * The message informs the user that verification may take 1-2 days as it requires manual review. The image is a processing image that rotates continuously.
 * 
 * @module components/UnverifiedDashboard
 */

import React from 'react';
import ProcessingImage from '../../assets/processing.png'

const UnverifiedDashboard = () => {
    return (
        <>
            <p className='lead fw-bold text-start mt-4 mx-4 text-center'>Your account verification is currently in progress. Thank you for your patience.</p>
            <p className='text-start slab-font mt-4 mx-4 text-center'>Please note that verification may take 1-2 days as it requires manual review.</p>
            <img src={ProcessingImage} className='image-full-rotate img-fluid my-5' style={{width:250}} alt='Processing'/>
        </>
    );
};

export default UnverifiedDashboard;