const Book = require('../models/books');
const Author = require('../models/authors');
const Genre = require('../models/genres');
const BooksGenres = require('../models/booksGenres');
const BookInstance = require('../models/bookinstance');
const Reservation = require('../models/reservations');
const LibraryPolicy = require('../models/librarypolicies');
const User = require('../models/users');
const asyncHandler = require('express-async-handler');
const {v4: uuidv4} = require('uuid');

// Middleware Functions
const {idValidator} = require('../middlewares/idValidator');
const checkEmptyRequestBody = require('../middlewares/checkEmptyRequestBody');
const validateAndSanitize = require('../middlewares/bodyValidator');
const authorize = require('../middlewares/authorize');

// Utility Functions
const hashPassword = require('../utils/passwordHasher');
const verifyPassword = require('../utils/verifyPassword');
const errorResponse = require('../utils/errorResponse');
const notFoundResponse = require('../utils/notFoundResponse');
const successResponse = require('../utils/successResponse');
const badRequestResponse = require('../utils/badRequestResponse');
const conflictRequestResponse = require('../utils/conflictRequestResponse');
const allowedFields = require('../utils/allowedFields');
const incrementDate = require('../utils/incrementDate');
const updateBookInstanceStatus = require('../utils/updateBookInstance');

// Constants
const userRoles = require('../constants/userRoles');
const { USERS_USER_ID, USERS_USERNAME, USERS_PASSWORD, USERS_SALT, USERS_ROLE, USERS_FIRST_NAME, USERS_LAST_NAME, USERS_DATE_OF_BIRTH, USERS_STATUS, BOOKS_BOOK_ID, BOOKS_AUTHOR_ID, BOOKS_TITLE, BOOKS_SUMMARY, BOOKS_ISBN, BOOKS_GENRE_ID, AUTHORS_FIRST_NAME, AUTHORS_LAST_NAME, BOOKS_GENRES_GENRE_ID, GENRES_NAME, AUTHORS_AUTHOR_ID, BOOKS_GENRES_BOOK_ID, GENRES_GENRE_ID, BOOK_INSTANCE_BOOK_ID, BOOK_INSTANCE_STATUS, BOOK_INSTANCE_AVAILABLE_BY, BOOK_INSTANCE_INSTANCE_ID, BOOK_INSTANCE_IMPRINT, LIBRARY_POLICIES_VALUE, LIBRARY_POLICIES_PROPERTY, BOOK_INSTANCE_USER_ID, RESERVATIONS_USER_ID, RESERVATIONS_BOOK_ID, RESERVATIONS_DATE_OF_RESERVATION, RESERVATIONS_RESERVATION_ID } = require('../constants/fieldNames');
const unauthorizedRequestResponse = require('../utils/unauthorizedRequestResponse');
const {PAGINATION_LIMIT} = require('../constants/paginationConstants');
const {MAX_RESERVATION_DURATION, MAX_LOAN_DURATION, MAX_RESERVATIONS_PER_USER} = require('../constants/policyConstants');


// Authentication Middlewares and Functions
const authenticate = require('../auth/authenticateUser');
const { queryValidator } = require('../validators/queryValidator');
const { statusValidator } = require('../validators/statusValidator');
const { validatePage } = require('../validators/validatePage');
const { BOOK_INSTANCES_TABLE } = require('../constants/tableNames');
const { NotFoundError } = require('objection');


exports.all_reservations = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_LIBRARIAN]),

    ...validatePage,

    asyncHandler(async(req, res, next)=>{
        try {
            const selectedFields = [RESERVATIONS_BOOK_ID, RESERVATIONS_USER_ID, RESERVATIONS_DATE_OF_RESERVATION, RESERVATIONS_RESERVATION_ID];

            const offset = (req.query.page - 1 || 0) * PAGINATION_LIMIT;

            const reservations = await Reservation
                .query()
                .select(selectedFields)
                .limit(PAGINATION_LIMIT)
                .offset(offset);

            for (let reservation of reservations) {
                try {
                    const book = await Book
                        .query()
                        .findById(reservation[RESERVATIONS_BOOK_ID]);

                    reservation[BOOKS_TITLE] = book[BOOKS_TITLE];

                    const user = await User
                        .query()
                        .findById(reservation[RESERVATIONS_USER_ID]);

                    reservation[USERS_FIRST_NAME] = user[USERS_FIRST_NAME];
                    reservation[USERS_LAST_NAME] = user[USERS_LAST_NAME];
                    reservation[USERS_USERNAME] = user[USERS_USERNAME];

                } catch (err) {
                    return errorResponse(res, err.message);
                }
            }

            return res.json(reservations);
        }
        catch (err) {
            return errorResponse(res, err.message);
        }
    })
]

exports.reservation_details = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_LIBRARIAN]),

    ...idValidator,

    asyncHandler(async(req, res, next)=>{
        try{
            const reservation = await Reservation
                .query()
                .select()
                .findById(req.params.id);

            if (!reservation) {
                return notFoundResponse(res, 'Reservation not found');
            }

            try {
                const book = await Book
                    .query()
                    .findById(reservation[RESERVATIONS_BOOK_ID]);

                reservation[BOOKS_TITLE] = book[BOOKS_TITLE];

                const user = await User
                    .query()
                    .findById(reservation[RESERVATIONS_USER_ID]);

                reservation[USERS_FIRST_NAME] = user[USERS_FIRST_NAME];
                reservation[USERS_LAST_NAME] = user[USERS_LAST_NAME];
                reservation[USERS_USERNAME] = user[USERS_USERNAME];

            } catch (err) {
                return errorResponse(res, err.message);
            }

            return res.json(reservation);
        }
        catch (err) {
            return errorResponse(res, err.message);
        }
    })
]

exports.reservations_by_user = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_LIBRARIAN, userRoles.ROLE_USER], [userRoles.ROLE_USER]),

    ...idValidator,

    asyncHandler(async(req, res, next)=>{
        try{
            const reservations = await Reservation
                .query()
                .select()
                .where({[RESERVATIONS_USER_ID]: req.params.id});

            for (let reservation of reservations) {
                try {
                    const book = await Book
                        .query()
                        .findById(reservation[RESERVATIONS_BOOK_ID]);

                    reservation[BOOKS_TITLE] = book[BOOKS_TITLE];

                    const user = await User
                        .query()
                        .findById(reservation[RESERVATIONS_USER_ID]);

                    reservation[USERS_FIRST_NAME] = user[USERS_FIRST_NAME];
                    reservation[USERS_LAST_NAME] = user[USERS_LAST_NAME];
                    reservation[USERS_USERNAME] = user[USERS_USERNAME];

                } catch (err) {
                    return errorResponse(res, err.message);
                }
            }

            return res.json(reservations);
        }
        catch (err) {
            return errorResponse(res, err.message);
        }
    })
]

exports.reservations_by_book = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_LIBRARIAN]),

    ...idValidator,

    asyncHandler(async(req, res, next)=>{
        try{
            const reservations = await Reservation
                .query()
                .select()
                .where({[RESERVATIONS_BOOK_ID]: req.params.id})

            for (let reservation of reservations) {
                try {
                    const book = await Book
                        .query()
                        .findById(reservation[RESERVATIONS_BOOK_ID]);

                    reservation[BOOKS_TITLE] = book[BOOKS_TITLE];

                    const user = await User
                        .query()
                        .findById(reservation[RESERVATIONS_USER_ID]);

                    reservation[USERS_FIRST_NAME] = user[USERS_FIRST_NAME];
                    reservation[USERS_LAST_NAME] = user[USERS_LAST_NAME];
                    reservation[USERS_USERNAME] = user[USERS_USERNAME];

                } 
                catch (err) {
                    return errorResponse(res, err.message);
                }
            }
    
            return res.json(reservations);
        }
        catch (err) {
            return errorResponse(res, err.message);
        }
    })
]

exports.create_reservation = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_LIBRARIAN, userRoles.ROLE_USER], [userRoles.ROLE_USER]),

    allowedFields([RESERVATIONS_BOOK_ID, RESERVATIONS_DATE_OF_RESERVATION, RESERVATIONS_USER_ID]),
    
    validateAndSanitize(),

    asyncHandler(async(req, res, next)=>{
        try{
            const maxReservationsPerUser = await LibraryPolicy 
                .query()
                .findOne({ [LIBRARY_POLICIES_PROPERTY]: MAX_RESERVATIONS_PER_USER });
            const maxReservationsPerUserValue = maxReservationsPerUser[LIBRARY_POLICIES_VALUE];

            const reservationsCount = await Reservation
                .query()
                .where({ [RESERVATIONS_USER_ID]: req.body[RESERVATIONS_USER_ID] })
                .count();

            const reservationsCountValue = reservationsCount[0]['count(*)'];

            const bookInstancesCount = await BookInstance
                .query()
                .where({ [BOOK_INSTANCE_STATUS]: 'R', [BOOK_INSTANCE_USER_ID]: req.body[RESERVATIONS_USER_ID] })
                .count();

            const bookInstancesCountValue = bookInstancesCount[0]['count(*)'];

            const totalReservations = reservationsCountValue + bookInstancesCountValue;

            if (totalReservations >= maxReservationsPerUserValue) {
                return badRequestResponse(res, 'User has reached the maximum number of reservations');
            }

            const existingReservation = await Reservation
                .query()
                .where({ [RESERVATIONS_USER_ID]: req.body[RESERVATIONS_USER_ID], [RESERVATIONS_BOOK_ID]: req.body[RESERVATIONS_BOOK_ID] })
                .first();

            if (existingReservation) {
                return errorResponse(res, 'User already has a reservation for this book');
            }

            const newReservation = await Reservation
                .query()
                .insert({
                    [RESERVATIONS_RESERVATION_ID]: uuidv4(),
                    ...req.body
                })

            const availableBookInstance = await BookInstance
                .query()
                .where({ [BOOK_INSTANCE_STATUS]: 'A', [BOOK_INSTANCE_BOOK_ID]: req.body[RESERVATIONS_BOOK_ID] })
                .first();

            if (availableBookInstance) {
                const maxReservationDuration = await LibraryPolicy
                    .query()
                    .select([LIBRARY_POLICIES_VALUE])
                    .where({[LIBRARY_POLICIES_PROPERTY]: MAX_RESERVATION_DURATION})

                const availableByDate = new Date();
                availableByDate.setDate(availableByDate.getDate() + maxReservationDuration[0][LIBRARY_POLICIES_VALUE]);

                await BookInstance
                    .query()
                    .patch({
                        [BOOK_INSTANCE_STATUS]: 'R',
                        [BOOK_INSTANCE_AVAILABLE_BY]: availableByDate.toISOString().split('T')[0],
                        [BOOK_INSTANCE_USER_ID]: req.body[RESERVATIONS_USER_ID]
                    })
                    .where({ [BOOK_INSTANCE_INSTANCE_ID]: availableBookInstance[BOOK_INSTANCE_INSTANCE_ID] });

                await Reservation
                    .query()
                    .deleteById(newReservation[RESERVATIONS_RESERVATION_ID]);
            }

            return successResponse(res, "Reservation Created Successfully.");
        }
        catch (err) {
            return errorResponse(res, err.message);
        }
    })
]

exports.delete_reservation = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_LIBRARIAN, userRoles.ROLE_USER]),

    ...idValidator,

    validateAndSanitize(),

    asyncHandler(async(req, res, next)=>{
        console.log("HERE");
        const { [RESERVATIONS_USER_ID]: userId } = req.body;
        if (!userId) {
            return badRequestResponse(res, "No user id in request body.");
        }

        try {
            const user = await User
                .query()
                .findById(userId);

            if (!user) {
                return notFoundResponse(res, "User not found.");
            }

            if(user[USERS_ROLE] !== userRoles.ROLE_USER){
                return badRequestResponse(res, "Reservations can only be done for system users.");
            }

            if (req.user[USERS_ROLE] === userRoles.ROLE_USER && user[USERS_ROLE] !== req.user[USERS_ROLE]) {
                return unauthorizedResponse(res, "User is not authorized to delete this reservation.");
            }

            const reservation = await Reservation
                .query()
                .deleteById(req.params.id);

            if(!reservation){
                const bookInstance = await BookInstance
                    .query()
                    .select([BOOK_INSTANCE_INSTANCE_ID, BOOK_INSTANCE_BOOK_ID])
                    .where({
                        [BOOK_INSTANCE_BOOK_ID]: req.body[RESERVATIONS_BOOK_ID],
                        [BOOK_INSTANCE_USER_ID]: userId,
                        [BOOK_INSTANCE_STATUS]: "R"
                    })
                    .first();

                if(!bookInstance){
                    return notFoundResponse(res, "Reservation Not Found.");
                }

                await BookInstance
                    .query()
                    .patch({
                        [BOOK_INSTANCE_STATUS]: "A",
                        [BOOK_INSTANCE_AVAILABLE_BY]: null,
                        [BOOK_INSTANCE_USER_ID]: null
                    })
                    .where({
                        [BOOK_INSTANCE_BOOK_ID]: req.body[RESERVATIONS_BOOK_ID],
                        [BOOK_INSTANCE_USER_ID]: userId
                    });

                updateBookInstanceStatus(bookInstance[BOOK_INSTANCE_INSTANCE_ID], bookInstance[BOOK_INSTANCE_BOOK_ID]);
            }

            return successResponse(res, 'Reservation deleted successfully');
        }
        catch (err) {
            return errorResponse(res, err.message);
        }
    })
]