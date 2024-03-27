import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '../Home/Home';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/main.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider, useDispatch } from 'react-redux';
import store from '../../redux/store';
import AddBook from '../Toolbox/Librarian/AddingBook';
import AddGenre from '../Toolbox/Librarian/AddingGenre';
import AddBookInstance from '../Toolbox/Librarian/AddingInstance';
import AddAuthor from '../Toolbox/Librarian/AddingAuthor';
import axios from 'axios';
import { setUser } from '../../redux/userSlice';
import IssueBook from '../Toolbox/Librarian/IssueBook';
import ReserveBook from '../Toolbox/Librarian/ReserveBook';
import ReceiveBook from '../Toolbox/Librarian/ReceiveBook';

// App component
function App() {
    // Get the current location
    const location = useLocation();

    return (
        <Provider store={store}>
            <AppContent location={location} />
        </Provider>
    );
}

function AppContent({ location }) {
    const dispatch = useDispatch();

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

    useEffect(() => {
        // fetch the user data
        axios.get('/users/my-data')
        .then(response => {
            dispatch(setUser(response.data.data));
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

    return (
        <div className="App">
            {/* Navbar component */}
            <Navbar />

            {/* Routes for the application */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element = {<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/add-book" element={<AddBook />} />
                <Route path="/add-genre" element={<AddGenre />} />
                <Route path="/add-book-instance" element={<AddBookInstance />} />
                <Route path="/add-author" element={<AddAuthor />} />
                <Route path="/issue-book" element={<IssueBook />} />
                <Route path="/reserve-book-librarian" element={<ReserveBook />} />
                <Route path="/receive-book" element={<ReceiveBook />} />
                
                <Route path="*" element={<NotFound />} />
            </Routes>

            {/* ToastContainer component */}
            <ToastContainer />

            {/* Footer component */}
            <Footer />
        </div>
    );
}

export default App;