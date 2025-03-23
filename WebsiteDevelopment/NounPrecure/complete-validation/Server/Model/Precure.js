//including the connection.js file
const connection = require('./Connection');

//gives access to await which alows promise
async function getAll(parameters = {}) {
    //MySQL database query
    let selectSql = ``,
        queryParameters = [];
    //stop, run the database query then return the results
    return await connection.query(selectSql, queryParameters);
}

async function insert(parameters = {}) {
    //MySQL database query
    let insertSql = ``,
        queryParameters = [];
    //stop, run the database query then return the results
    return await connection.query(insertSql, queryParameters);
}

module.exports = {
    getAll
}
