const connection = require('./connection');

async function insert(paramaters = {}) {
    let insertSQL = `INSERT INTO gimm_340_survey (book_id, first_name, last_name, why) VALUES (?, ?, ?, ?)`,
        queryParameters = [
            parseInt(paramaters.book),
            paramaters.firstName,
            paramaters.lastName,
            paramaters.reason
        ];
    return await connection.query(insertSQL, queryParameters);
}

async function getAll() {
    let selectSql = `SELECT * FROM gimm_340_survey`;
    return await connection.query(selectSql);
}

async function getByID(id) {
    let selectSql = `SELECT * FROM gimm_340_survey WHERE id = ?`;
    return await connection.query(selectSql, [id]);
}

async function updateData(id, parameters = {}){
    let updateSQL = `UPDATE gimm_340_survey SET book_id = ?, first_name = ?, last_name = ?, why = ? WHERE id = ?`,
        queryParameters = [
            parseInt(parameters.book),
            parameters.firstName,
            parameters.lastName,
            parameters.reason,
            id
        ];
    return await connection.query(updateSQL, queryParameters);
}

module.exports = {
    insert,
    getAll,
    getByID,
    updateData
}