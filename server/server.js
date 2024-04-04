if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const {app} = require('./app');  // Import the app from app.js

const port = process.env.PORT || 3001;  // Use the PORT environment variable, or 3001 if PORT isn't defined

try {
        app.listen(port, () => console.log(`Server is running on port ${port}`));
} catch (error) {
        console.error('Error starting server:', error);
}