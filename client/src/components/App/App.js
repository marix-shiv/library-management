import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '../Home/Home';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/main.scss';

// App component
function App() {
    // Get the current location
    const location = useLocation();

    // Scroll to the element with the id specified in the hash (if it exists)
    // or to the top of the page otherwise whenever the location changes
    useEffect(() => {
        if (location.hash) {
            let elem = document.getElementById(location.hash.slice(1))
            if (elem) {
                elem.scrollIntoView({behavior: "smooth"})
            }
        } else {
            window.scrollTo({top: 0, left: 0, behavior: "smooth"})
        }
    }, [location,]);

    return (
        <div className="App">
            {/* Navbar component */}
            <Navbar />

            {/* Routes for the application */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>

            {/* Footer component */}
            <Footer />
        </div>
    );
}

export default App;