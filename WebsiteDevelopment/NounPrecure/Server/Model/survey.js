const connection = require('./Connection');

async function getAll() {
    let selectSql = `SELECT * FROM precure_survey`;
    return await connection.query(selectSql);
}

module.exports = {
    getAll
}