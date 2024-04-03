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
import AnnouncementDetails from '../Announcement/AnnouncementDetails';
import { GearFill } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { showSidebar, hideSidebar } from '../../redux/sidebarSlice';
import Sidebar from '../Sidebar/Sidebar';
import NO_SIDEBAR_PATHS from '../../constants/noSidebarPaths';
import SearchGenres from '../DataSearch/SearchGenres';
import SearchAuthors from '../DataSearch/SearchAuthors';
import SearchBooks from '../DataSearch/SearchBooks';
import SearchBookInstances from '../DataSearch/SearchBookInstances';
import DeleteAuthor from '../DataDelete/DeleteAuthor';
import DeleteGenre from '../DataDelete/DeleteGenre';
import DeleteBook from '../DataDelete/DeleteBook';
import DeleteBookInstance from '../DataDelete/DeleteBookInstance';
import UpdateGenre from '../DataUpdate/UpdateGenre';
import UpdateAuthor from '../DataUpdate/UpdateAuthor';
import UpdateBook from '../DataUpdate/UpdateBook';
import UpdateBookInstance from '../DataUpdate/UpdateBookInstance';
import TopAuthors from '../DataDisplay/TopAuthors';
import TopGenres from '../DataDisplay/TopGenres';
import TopBooks from '../DataDisplay/TopBooks';
import AllReservations from '../DataDisplay/AllReservations';
import ReservationDetail from '../DataDetails/ReservationDetail';
import SearchReservations from '../DataSearch/SearchReservations';
import SearchBookInstancesUsingUser from '../DataSearch/SearchBookInstancesUsingUser';
import SearchAnnouncements from '../DataSearch/SearchAnnouncements';
import UserProfile from '../Users/UserProfile/UserProfile';
import AllMyUnexecutedReservations from '../DataDisplay/AllMyUnexecutedReservations';
import AllBudgets from '../DataDisplay/AllBudgets';
import BudgetDetail from '../DataDetails/BudgetDetails';
import BudgetsByDate from '../DataDetails/BudgetsByDate';
import BudgetsByMoney from '../DataDetails/BudgetsByMoney';
import SearchBudgets from '../DataSearch/SearchBudgets';
import AddBudget from '../Toolbox/Admin/AddingBudget';
import UpdateBudget from '../DataUpdate/UpdateBudget';
import AddAnnouncement from '../Toolbox/Admin/AddingAnnouncement';
import UpdateAnnouncement from '../Announcement/UpdateAnnouncement';
import AnnouncementsByDate from '../DataDetails/AnnouncementsByDate';

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
    const isSidebarVisible = useSelector((state) => state.sidebar.isVisible);
    const user = useSelector((state) => state.user);

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

            {/* Gear icon for sidebar */}
            {user && user.Status === 1 && !NO_SIDEBAR_PATHS.includes(location.pathname) && !isSidebarVisible && (
                <GearFill
                    className="dark-purple-gear icon-tilt"
                    size={50}
                    style={{
                        position: 'fixed',
                        bottom: '25px',
                        left: '25px',
                        cursor: 'pointer',
                        zIndex: 1000
                    }}
                    onClick={() => dispatch(showSidebar())}
                />
            )}

            {/* Sidebar component */}
            <Sidebar show={isSidebarVisible} handleClose={() => dispatch(hideSidebar())} />

            {/* Routes for the application */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/my-profile" element={<MyProfile />} />
                <Route path="/change-password/:id" element={<ChangePassword />} />
                <Route path="/user-profile/:id" element={<UserProfile />} />

                <Route path="/all-announcements" element={<AllAnnouncements />} />
                <Route path="/announcement-detail/:id" element={<AnnouncementDetails />} />

                <Route path="/add-book" element={<AddBook />} />
                <Route path="/add-genre" element={<AddGenre />} />
                <Route path="/add-book-instance" element={<AddBookInstance />} />
                <Route path="/add-author" element={<AddAuthor />} />
                <Route path="/add-budget" element={<AddBudget />} />
                <Route path="/add-announcement" element={<AddAnnouncement />} />
                <Route path="/issue-book" element={<IssueBook />} />
                <Route path="/reserve-book-librarian" element={<ReserveBook />} />
                <Route path="/receive-book" element={<ReceiveBook />} />

                <Route path="/all-genres" element={<AllGenres />} />
                <Route path="/all-authors" element={<AllAuthors />} />
                <Route path="/all-books" element={<AllBooks />} />
                <Route path="/all-book-instances" element={<AllBookInstances />} />
                <Route path="/all-reservations" element={<AllReservations />} />
                <Route path="/my-reservations" element={<AllMyUnexecutedReservations />} />
                <Route path="/all-budgets" element={<AllBudgets />} />

                <Route path="/genre-detail/:id" element={<GenreDetail />} />
                <Route path="/author-detail/:id" element={<AuthorDetail />} />
                <Route path="/book-detail/:id" element={<BookDetail />} />
                <Route path="/book-instance-detail/:id" element={<BookInstanceDetail />} />
                <Route path="/reservation-detail/:id" element={<ReservationDetail />} />
                <Route path="/budget-detail/:id" element={<BudgetDetail />} />
                <Route path="/budget-by-date" element={<BudgetsByDate />} />
                <Route path="/budget-by-money" element={<BudgetsByMoney />} />
                <Route path="/announcement-by-date" element={<AnnouncementsByDate />} />

                <Route path="/search-genre" element={<SearchGenres />} />
                <Route path="/search-author" element={<SearchAuthors />} />
                <Route path="/search-book" element={<SearchBooks />} />
                <Route path="/search-book-instance" element={<SearchBookInstances />} />
                <Route path="/search-book-instance-by-user" element={<SearchBookInstancesUsingUser />} />
                <Route path="/search-reservation" element={<SearchReservations />} />
                <Route path="/search-announcements" element={<SearchAnnouncements />} />
                <Route path="/search-budgets" element={<SearchBudgets />} />

                <Route path="/delete-author/:id" element={<DeleteAuthor />} />
                <Route path="/delete-genre/:id" element={<DeleteGenre />}  />
                <Route path="/delete-book/:id" element={<DeleteBook />}  />
                <Route path="/delete-book-instance/:id" element={<DeleteBookInstance />}  />

                <Route path="/update-genre/:id" element={<UpdateGenre />} />
                <Route path="/update-author/:id" element={<UpdateAuthor />} />
                <Route path="/update-book/:id" element={<UpdateBook />} />
                <Route path="/update-book-instance/:id" element={<UpdateBookInstance />} />
                <Route path="/update-budget/:id" element={<UpdateBudget />} />
                <Route path="/update-announcement/:id" element={<UpdateAnnouncement />} />

                <Route path="/top-authors" element={<TopAuthors />} />
                <Route path="/top-genres" element={<TopGenres />} />
                <Route path="/top-books" element={<TopBooks />} />

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