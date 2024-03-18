const app = require('./app');  // Import the app from app.js

try {
    app.listen(3001, () => console.log('Server is running on port 3001'));
} catch (error) {
    console.error('Error starting server:', error);
}