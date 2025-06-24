const bcrypt = require('bcrypt');

//vuelve a hash las contrasenas con un salt de 10 rondas
const SALT_ROUNDS = 10;

async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyHush(password, hash) {
    return await bcrypt.compare(password, hash);
}

async function hashWithBcrypt(text) {
    const saltRounds = 10;
    return await bcrypt.hash(text, saltRounds);
}

async function compareWithBcrypt(text, hash) {
    return await bcrypt.compare(text, hash);
}

module.exports = {
    hashPassword,
    verifyHush,
    hashWithBcrypt,
    compareWithBcrypt
};