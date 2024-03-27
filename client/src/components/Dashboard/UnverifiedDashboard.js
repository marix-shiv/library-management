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