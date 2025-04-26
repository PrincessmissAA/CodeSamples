const connection = require('./Connection');

async function getAll() {
    let selectSql = `SELECT * FROM PrecureForm`;
    return await connection.query(selectSql);
}

module.exports = {
    getAll
}