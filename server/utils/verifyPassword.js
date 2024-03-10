/**
 * This module exports a function that verifies a password using PBKDF2.
 * The function takes a password, a stored hash, and a stored salt as arguments.
 * It hashes the password with the stored salt and then compares the resulting hash to the stored hash.
 * The function returns a promise that resolves with a boolean indicating whether the password is correct.
 */

const crypto = require('crypto');

// Hash a password using PBKDF2 and compare it to a stored hash
async function verifyPassword(password, storedHash, storedSalt) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, Buffer.from(storedSalt, "hex"), 100000, 64, 'sha512', (err, derivedKey) => {
            if (err) {
                reject(err);
            }
            resolve(storedHash === derivedKey.toString('hex'));
        });
    });
}

module.exports = verifyPassword;