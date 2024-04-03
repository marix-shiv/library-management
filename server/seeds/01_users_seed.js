/**
 * This script seeds the 'users' table in the database.
 * 
 * It first deletes all existing entries in the 'users' table.
 * Then, it inserts new entries into the 'users' table.
 * 
 * Each user entry includes a unique ID, username, hashed password, salt for the password, role, first name, last name, date of birth, and status.
 * The password for each user is hashed using the PBKDF2 algorithm.
 * 
 * This script uses the 'uuid' library to generate unique IDs and the 'crypto' library to hash passwords.
 */

const { v4: uuidv4 } = require('uuid');
const hashPassword = require('../utils/passwordHasher');
const { USERS_USER_ID, USERS_USERNAME, USERS_PASSWORD, USERS_LAST_NAME, USERS_SALT, USERS_ROLE, USERS_FIRST_NAME, USERS_DATE_OF_BIRTH, USERS_STATUS } = require('../constants/fieldNames');

exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('users').del();

    const testPassword = await hashPassword('Test@#1111');
    const password1 = await hashPassword('AaBb@#1298');
    const password2 = await hashPassword('AaBb@#1299');
    const password3 = await hashPassword('AaBb@#1300');
    const password4 = await hashPassword('AaBb@#1301');
    const password5 = await hashPassword('AaBb@#1302');
    const password6 = await hashPassword('AaBb@#1303');
    const password7 = await hashPassword('AaBb@#1304');
    const password8 = await hashPassword('AaBb@#1305');
    const password9 = await hashPassword('AaBb@#1306');
    const password10 = await hashPassword('AaBb@#1307');
    

    // Inserts seed entries
    return knex('users').insert([
        {
            [USERS_USER_ID]: '123e4567-e89b-12d3-a456-426614174000',
            [USERS_USERNAME]: 'testUsername1',
            [USERS_PASSWORD]: testPassword.key,
            [USERS_SALT]: testPassword.salt,
            [USERS_ROLE]: 'S',
            [USERS_FIRST_NAME]: 'Test',
            [USERS_LAST_NAME]: 'User',
            [USERS_DATE_OF_BIRTH]: '2000-01-01',
            [USERS_STATUS]: true
        },
        {
            [USERS_USER_ID]: '123e4567-e89b-12d3-a456-426614174020',
            [USERS_USERNAME]: 'testUsername2',
            [USERS_PASSWORD]: testPassword.key,
            [USERS_SALT]: testPassword.salt,
            [USERS_ROLE]: 'U',
            [USERS_FIRST_NAME]: 'Test1',
            [USERS_LAST_NAME]: 'User2',
            [USERS_DATE_OF_BIRTH]: '2000-01-01',
            [USERS_STATUS]: false
        },
        {
            [USERS_USER_ID]: uuidv4(),
            [USERS_USERNAME]: 'john_doe_123',
            [USERS_PASSWORD]: password1.key,
            [USERS_SALT]: password1.salt,
            [USERS_ROLE]: 'U',
            [USERS_FIRST_NAME]: 'John',
            [USERS_LAST_NAME]: 'Dave',
            [USERS_DATE_OF_BIRTH]: '1770-01-01',
            [USERS_STATUS]: true
        },
        {
            [USERS_USER_ID]: uuidv4(),
            [USERS_USERNAME]: 'jane_smith_456',
            [USERS_PASSWORD]: password2.key,
            [USERS_SALT]: password2.salt,
            [USERS_ROLE]: 'L',
            [USERS_FIRST_NAME]: 'Jane',
            [USERS_LAST_NAME]: 'Smith',
            [USERS_DATE_OF_BIRTH]: '1985-01-01',
            [USERS_STATUS]: true
        },
        {
            [USERS_USER_ID]: uuidv4(),
            [USERS_USERNAME]: 'jim_brown_789',
            [USERS_PASSWORD]: password3.key,
            [USERS_SALT]: password3.salt,
            [USERS_ROLE]: 'U',
            [USERS_FIRST_NAME]: 'Jim',
            [USERS_LAST_NAME]: 'Brown',
            [USERS_DATE_OF_BIRTH]: '1990-01-01',
            [USERS_STATUS]: true
        },
        {
            [USERS_USER_ID]: uuidv4(),
            [USERS_USERNAME]: 'sarah_jones_012',
            [USERS_PASSWORD]: password4.key,
            [USERS_SALT]: password4.salt,
            [USERS_ROLE]: 'U',
            [USERS_FIRST_NAME]: 'Sarah',
            [USERS_LAST_NAME]: 'Jones',
            [USERS_DATE_OF_BIRTH]: '1995-01-01',
            [USERS_STATUS]: true
        },
        {
            [USERS_USER_ID]: uuidv4(),
            [USERS_USERNAME]: 'michael_345',
            [USERS_PASSWORD]: password5.key,
            [USERS_SALT]: password5.salt,
            [USERS_ROLE]: 'U',
            [USERS_FIRST_NAME]: 'Michael',
            [USERS_LAST_NAME]: 'Jackson',
            [USERS_DATE_OF_BIRTH]: '2000-01-01',
            [USERS_STATUS]: false
        },
        {
            [USERS_USER_ID]: uuidv4(),
            [USERS_USERNAME]: 'alex_smith_789',
            [USERS_PASSWORD]: password6.key,
            [USERS_SALT]: password6.salt,
            [USERS_ROLE]: 'A',
            [USERS_FIRST_NAME]: 'Alex',
            [USERS_LAST_NAME]: 'Smith',
            [USERS_DATE_OF_BIRTH]: '1980-05-15',
            [USERS_STATUS]: true
        },
        {
            [USERS_USER_ID]: uuidv4(),
            [USERS_USERNAME]: 'emilyJ_012',
            [USERS_PASSWORD]: password7.key,
            [USERS_SALT]: password7.salt,
            [USERS_ROLE]: 'U',
            [USERS_FIRST_NAME]: 'Emily',
            [USERS_LAST_NAME]: 'Jones',
            [USERS_DATE_OF_BIRTH]: '1992-08-23',
            [USERS_STATUS]: true
        },
        {
            [USERS_USER_ID]: uuidv4(),
            [USERS_USERNAME]: 'davidW_345',
            [USERS_PASSWORD]: password8.key,
            [USERS_SALT]: password8.salt,
            [USERS_ROLE]: 'S',
            [USERS_FIRST_NAME]: 'David',
            [USERS_LAST_NAME]: 'Wilson',
            [USERS_DATE_OF_BIRTH]: '1975-03-10',
            [USERS_STATUS]: true
        },
        {
            [USERS_USER_ID]: uuidv4(),
            [USERS_USERNAME]: 'laura_T_678',
            [USERS_PASSWORD]: password9.key,
            [USERS_SALT]: password9.salt,
            [USERS_ROLE]: 'L',
            [USERS_FIRST_NAME]: 'Laura',
            [USERS_LAST_NAME]: 'Thomas',
            [USERS_DATE_OF_BIRTH]: '1988-11-07',
            [USERS_STATUS]: true
        },
        {
            [USERS_USER_ID]: uuidv4(),
            [USERS_USERNAME]: 'samuel_C_901',
            [USERS_PASSWORD]: password10.key,
            [USERS_SALT]: password10.salt,
            [USERS_ROLE]: 'U',
            [USERS_FIRST_NAME]: 'Samuel',
            [USERS_LAST_NAME]: 'Clark',
            [USERS_DATE_OF_BIRTH]: '1997-01-30',
            [USERS_STATUS]: false
        }
        
    ]);
};