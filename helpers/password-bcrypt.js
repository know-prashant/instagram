const bcrypt = require('bcrypt');
const { saltRounds } = require('../config/bcrypt');

const createBcrypt = async (password) => {
    try{
        //Generate hash
        const hash = await bcrypt.hashSync(password, saltRounds);
        return hash;
    }catch(e){
        throw e;
    }
};

const compareBcrypt = async (password, hash) => {
    try{
        return await bcrypt.compareSync(password, hash);
    }catch(e){
        throw e;
    }
}

module.exports = {
    createBcrypt,
    compareBcrypt
};