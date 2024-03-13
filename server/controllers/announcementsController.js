/**
 * This module exports a set of middleware functions for handling HTTP requests related to announcements.
 * Each function corresponds to a specific HTTP method and route, and includes validation, authentication, and error handling.
 * The functions interact with the Announcement model to query the database and return the appropriate response.
 */

const Announcement = require('../models/announcements');
const asyncHandler = require('express-async-handler');
const {v4: uuidv4} = require('uuid');

// Middleware Functions
const {idValidator} = require('../middlewares/idValidator');
const {queryValidator} = require('../validators/queryValidator');
const {dateRangeValidator} = require('../validators/validateDateRange');
const { validatePage } = require('../validators/validatePage');
const validateAndSanitize = require('../middlewares/bodyValidator');
const authorize = require('../middlewares/authorize');

// Utility Functions
const errorResponse = require('../utils/errorResponse');
const notFoundResponse = require('../utils/notFoundResponse');
const successResponse = require('../utils/successResponse');
const badRequestResponse = require('../utils/badRequestResponse');
const incrementDate = require('../utils/incrementDate');
const allowedFields = require('../utils/allowedFields');

// Constants
const userRoles = require('../constants/userRoles');
const { ANNOUNCEMENTS_ANNOUNCEMENT_ID, ANNOUNCEMENTS_DATE_POSTED, ANNOUNCEMENTS_CONTENT, ANNOUNCEMENTS_TITLE} = require('../constants/fieldNames');
const { PAGINATION_LIMIT } = require('../constants/paginationConstants');

// Authentication Middlewares and Functions
const authenticate = require('../auth/authenticateUser');

exports.all_announcements = [
    authenticate,

    validatePage,

    asyncHandler(async(req, res, next)=>{
        try{
            const offset = (req.query.page - 1 || 0) * PAGINATION_LIMIT;
            const announcements = await Announcement
                .query()
                .select()
                .orderBy(ANNOUNCEMENTS_DATE_POSTED, 'desc')
                .limit(PAGINATION_LIMIT)
                .offset(offset);
            return res.json(announcements);
        }
        catch (err) {
            return errorResponse(res, err.message);
        }
    })
]

exports.latest_announcement = [
    authenticate,

    asyncHandler(async(req, res, next)=>{
        try{
            const selectedFields = [ANNOUNCEMENTS_TITLE, ANNOUNCEMENTS_CONTENT];
            
            const announcements = await Announcement
                .query()
                .select(selectedFields)
                .orderBy(ANNOUNCEMENTS_DATE_POSTED)
                .first();
            
            return res.json(announcements);
        }
        catch (err) {
            return errorResponse(res, err.message);
        }
    })
]

exports.announcement_details = [
    authenticate,

    ...idValidator,

    asyncHandler(async(req, res, next)=>{
        try{
            const announcementDetails = await Announcement
                .query()
                .findById(req.params.id)

            if(!announcementDetails || announcementDetails.length === 0){
                return notFoundResponse(res);
            }
            return res.json(announcementDetails);
        }
        catch (err) {
            return errorResponse(res, err.message);
        }
    })
]

exports.create_announcement = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN]),
    
    validateAndSanitize(),

    // Custom validator to ensure no extra fields are present
    allowedFields([ANNOUNCEMENTS_TITLE, ANNOUNCEMENTS_CONTENT, ANNOUNCEMENTS_DATE_POSTED]),

    asyncHandler(async(req, res, next)=>{
        try{
            req.body[ANNOUNCEMENTS_ANNOUNCEMENT_ID] = uuidv4();

            if (req.body[ANNOUNCEMENTS_DATE_POSTED]) {
                req.body[ANNOUNCEMENTS_DATE_POSTED] = incrementDate(req.body[ANNOUNCEMENTS_DATE_POSTED]);
            }

            await Announcement
                .query()
                .insert(req.body);

            return successResponse(res, "Announcement Created Successfully");
        }
        catch(err){
            return errorResponse(res, err.message);
        }
    })
]

exports.update_announcement = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN]),
    
    // Validate id  
    ...idValidator,

    validateAndSanitize(),

    // Custom validator to ensure no extra fields are present
    allowedFields([ANNOUNCEMENTS_TITLE, ANNOUNCEMENTS_CONTENT, ANNOUNCEMENTS_DATE_POSTED]),

    asyncHandler(async(req, res, next)=>{
        try{
            const announcement = await Announcement
                .query()
                .findById(req.params.id)

            if(!announcement || announcement.length === 0){
                return notFoundResponse(res);
            }

            // Increase DatePosted by one day
            if (req.body[ANNOUNCEMENTS_DATE_POSTED]) {
                req.body[ANNOUNCEMENTS_DATE_POSTED] = incrementDate(req.body[ANNOUNCEMENTS_DATE_POSTED]);
            }

            await Announcement
                .query()
                .findById(req.params.id)
                .patch(req.body);

            return successResponse(res, "Announcement Updated Successfully.");
        }

        catch (err) {
            return errorResponse(res, err.message);
        }
    })
]

exports.delete_announcement = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN]),

    ...idValidator,

    asyncHandler(async(req, res, next)=>{
        try{
            const announcementDetails = await Announcement
                .query()
                .findById(req.params.id)

            if(!announcementDetails || announcementDetails.length === 0){
                return notFoundResponse(res);
            }

            await Announcement
                .query()
                .deleteById(req.params.id)

            return successResponse(res, "Announcement Deleted Successfully.");
        }
        catch (err) {
            return errorResponse(res, err.message);
        }
    })
]

exports.announcement_by_date_range = [
    authenticate,

    // Validates the start and end dates and checks if end date is lesser than start date
    dateRangeValidator,

    validatePage,

    asyncHandler(async(req, res, next)=>{
        try{
            let startDate = new Date(req.params.startDate);
            let endDate = new Date(req.params.endDate);

            endDate.setDate(endDate.getDate() + 1);

            const offset = (req.query.page - 1 || 0) * PAGINATION_LIMIT;

            const announcements = await Announcement
                .query()
                .whereBetween(ANNOUNCEMENTS_DATE_POSTED, [startDate.toISOString(), endDate.toISOString()])
                .orderBy(ANNOUNCEMENTS_DATE_POSTED, 'desc')
                .limit(PAGINATION_LIMIT)
                .offset(offset);

            return res.json(announcements);
        }
        catch(err){
            return errorResponse(res, err.message);
        }
    })
]

exports.search_announcements = [
    authenticate,

    validatePage,

    queryValidator,

    asyncHandler(async(req, res, next)=>{
        const query = req.params.query;
        const offset = (req.query.page - 1 || 0) * PAGINATION_LIMIT;
        
        // Query the 'Announcement' table to get announcements where the title or content matches the query.
        // The results are ordered first by whether the title matches the query, then by the position of the query in the title, and finally by the position of the query in the content.
        // The query is limited to 'PAGINATION_LIMIT' results and offset by the 'offset' variable to support pagination.
        const announcements = await Announcement
            .query()
            .select()
            .where(ANNOUNCEMENTS_TITLE, 'like', `%${query}%`)
            .orWhere(ANNOUNCEMENTS_CONTENT, 'like', `%${query}%`)
            .orderByRaw(`CASE WHEN ${ANNOUNCEMENTS_TITLE} LIKE ? THEN 1 ELSE 2 END, LOCATE(?, ${ANNOUNCEMENTS_TITLE}), LOCATE(?, ${ANNOUNCEMENTS_CONTENT})`, [`%${query}%`, query, query])
            .limit(PAGINATION_LIMIT)
            .offset(offset);

        if(!announcements || announcements.length === 0){
            return notFoundResponse(res);
        }

        return res.json(announcements);
    })
]