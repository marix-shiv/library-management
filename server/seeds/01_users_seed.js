const { v4: uuidv4 } = require('uuid');
const crypto =  require('crypto');

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

exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('users').del();

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
            UserID: uuidv4(),
            Username: 'john_doe_123',
            Password: password1.key,
            Salt: password1.salt,
            Role: 'A',
            first_name: 'John',
            last_name: 'Dave',
            date_of_birth: '1770-01-01',
            Status: true
        },
        {
            UserID: uuidv4(),
            Username: 'jane_smith_456',
            Password: password2.key,
            Salt: password2.salt,
            Role: 'L',
            first_name: 'Jane',
            last_name: 'Smith',
            date_of_birth: '1985-01-01',
            Status: false
        },
        {
            UserID: uuidv4(),
            Username: 'jim_brown_789',
            Password: password3.key,
            Salt: password3.salt,
            Role: 'S',
            first_name: 'Jim',
            last_name: 'Brown',
            date_of_birth: '1990-01-01',
            Status: true
        },
        {
            UserID: uuidv4(),
            Username: 'sarah_jones_012',
            Password: password4.key,
            Salt: password4.salt,
            Role: 'U',
            first_name: 'Sarah',
            last_name: 'Jones',
            date_of_birth: '1995-01-01',
            Status: true
        },
        {
            UserID: uuidv4(),
            Username: 'michael_345',
            Password: password5.key,
            Salt: password5.salt,
            Role: 'U',
            first_name: 'Michael',
            last_name: 'Jackson',
            date_of_birth: '2000-01-01',
            Status: false
        },
        {
            UserID: uuidv4(),
            Username: 'alex_smith_789',
            Password: password6.key,
            Salt: password6.salt,
            Role: 'A',
            first_name: 'Alex',
            last_name: 'Smith',
            date_of_birth: '1980-05-15',
            Status: true
        },
        {
            UserID: uuidv4(),
            Username: 'emilyJ_012',
            Password: password7.key,
            Salt: password7.salt,
            Role: 'U',
            first_name: 'Emily',
            last_name: 'Jones',
            date_of_birth: '1992-08-23',
            Status: true
        },
        {
            UserID: uuidv4(),
            Username: 'davidW_345',
            Password: password8.key,
            Salt: password8.salt,
            Role: 'S',
            first_name: 'David',
            last_name: 'Wilson',
            date_of_birth: '1975-03-10',
            Status: false
        },
        {
            UserID: uuidv4(),
            Username: 'laura_T_678',
            Password: password9.key,
            Salt: password9.salt,
            Role: 'L',
            first_name: 'Laura',
            last_name: 'Thomas',
            date_of_birth: '1988-11-07',
            Status: true
        },
        {
            UserID: uuidv4(),
            Username: 'samuel_C_901',
            Password: password10.key,
            Salt: password10.salt,
            Role: 'U',
            first_name: 'Samuel',
            last_name: 'Clark',
            date_of_birth: '1997-01-30',
            Status: false
        }
        
    ]);
};