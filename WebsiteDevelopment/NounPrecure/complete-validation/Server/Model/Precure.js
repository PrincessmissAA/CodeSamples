//I used Chatgpt to help make the async functions
const connection = require('./Model/Connection');

// Get all records
async function getAll(parameters = {}) {
    const selectSql = `SELECT * FROM Precure`; // Adjust table name if needed
    return await connection.query(selectSql, []);
}

// Get one record by ID
async function getById(id) {
    const selectSql = `SELECT * FROM Precure WHERE id = ?`;
    return await connection.query(selectSql, [id]);
}

// Insert a new record
async function insert(parameters = {}) {
    const insertSql = `INSERT INTO Precure (name, choice, filename) VALUES (?, ?, ?)`;
    const queryParams = [parameters.name, parameters.choice, parameters.filename];
    return await connection.query(insertSql, queryParams);
}

// Update a record by ID
async function edit(id, parameters = {}) {
    const updateSql = `UPDATE Precure SET name = ?, choice = ?, filename = ? WHERE id = ?`;
    const queryParams = [parameters.name, parameters.choice, parameters.filename, id];
    return await connection.query(updateSql, queryParams);
}

// Delete a record by ID
async function remove(id) {
    const deleteSql = `DELETE FROM Precure WHERE id = ?`;
    return await connection.query(deleteSql, [id]);
}

// FIXED: module.exports not "modules.export"
module.exports = {
    getAll,
    getById,
    insert,
    edit,
    remove
};
