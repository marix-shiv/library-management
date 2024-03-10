/**
 * This module exports a function that hashes a password using PBKDF2 (Password-Based Key Derivation Function 2).
 * The function generates a random salt, hashes the password with the salt, and then returns the hashed password and salt.
 * The hashed password and salt are returned as hexadecimal strings.
 */

const crypto = require('crypto');

// Generates a hash and a salt from the given password
async function hashPassword(password){
    return new Promise((resolve, reject)=>{
        // Generate Salt
        const salt = crypto.randomBytes(16);

        // Hash Password With Salt
        crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey)=>{
            if(err) reject(err);

            resolve({salt: salt.toString("hex"), key: derivedKey.toString('hex')});
        });
    });
}

module.exports = hashPassword;