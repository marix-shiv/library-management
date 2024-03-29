import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
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
import AllGenres from '../DataDisplay/AllGenres';
import GenreDetail from '../DataDetails/GenreDetails';
import AllAuthors from '../DataDisplay/AllAuthors';
import AuthorDetail from '../DataDetails/AuthorDetails';
import AllBooks from '../DataDisplay/AllBooks';
import BookDetail from '../DataDetails/BookDetails';
import AllBookInstances from '../DataDisplay/AllBookInstances';
import BookInstanceDetail from '../DataDetails/BookInstanceDetails';
import MyProfile from '../Users/MyProfile/MyProfile';
import ChangePassword from '../Users/MyProfile/ChangePassword';
import AllAnnouncements from '../Announcement/AllAnnouncements';

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
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/my-profile" element={<MyProfile />} />
                <Route path="/change-password/:id" element={<ChangePassword />} />
                <Route path="/all-announcements" element={<AllAnnouncements />} />

                <Route path="/add-book" element={<AddBook />} />
                <Route path="/add-genre" element={<AddGenre />} />
                <Route path="/add-book-instance" element={<AddBookInstance />} />
                <Route path="/add-author" element={<AddAuthor />} />
                <Route path="/issue-book" element={<IssueBook />} />
                <Route path="/reserve-book-librarian" element={<ReserveBook />} />
                <Route path="/receive-book" element={<ReceiveBook />} />

                <Route path="/all-genres" element={<AllGenres />} />
                <Route path="/all-authors" element={<AllAuthors />} />
                <Route path="/all-books" element={<AllBooks />} />
                <Route path="/all-book-instances" element={<AllBookInstances />} />

                <Route path="/genre-detail/:id" element={<GenreDetail />} />
                <Route path="/author-detail/:id" element={<AuthorDetail />} />
                <Route path="/book-detail/:id" element={<BookDetail />} />
                <Route path="/book-instance-detail/:id" element={<BookInstanceDetail />} />

                <Route path="*" element={<NotFound />} />
            </Routes>

            {/* ToastContainer component */}
            <ToastContainer />

            {/* Footer component */}
            <Footer />
        </div>
    );
}

AppContent.propTypes = {
    location: PropTypes.object.isRequired,
};

export default App;