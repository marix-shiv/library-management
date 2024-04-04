/**
 * noSidebarPaths.js
 * 
 * This is a Node.js module that exports an array of paths where the sidebar should not be displayed.
 * 
 * The array includes the paths '/', '/error', '/login', and '/signup'. These paths correspond to the home page, error page, login page, and signup page respectively. This array can be imported and used in other parts of the application to conditionally render the sidebar based on the current path.
 * 
 * @module constants/noSidebarPaths
 */

module.exports = [
    '/',
    '/error',
    '/login',
    '/signup'
]