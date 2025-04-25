//I used Chatgpt to help make the async functions
const connection = require('./Model/Connection');

// Get all records
async function getAll(parameters = {}) {
    let selectSql = `SELECT * FROM precure_survey WHERE 1=1`;
    const queryParams = [];

    if (parameters.myName) {
        selectSql += ` AND myName = ?`;
        queryParams.push(parameters.myName);
    }
    if (parameters.Personnality) {
        selectSql += ` AND Personnality = ?`;
        queryParams.push(parameters.Personnality);
    }
    if (parameters.Theme) {
        selectSql += ` AND Theme = ?`;
        queryParams.push(parameters.Theme);
    }
    if (parameters.numTeammates) {
        selectSql += ` AND numTeammates = ?`;
        queryParams.push(parameters.numTeammates);
    }

    return await connection.query(selectSql, queryParams);
}


// Get one record by ID
async function getById(id) {
    const selectSql = `SELECT * FROM Precure WHERE id = ?`;
    return await connection.query(selectSql, [id]);
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

async function insert(paramaters = {}) {
    let insertSQL = `INSERT INTO precure_survey (book_id, name, personnality, theme, Stheme, precurePhoto, hairstyle, numTeammates) VALUES (?, ?, ?, ?)`,
        queryParameters = [
            parseInt(paramaters.book),
            paramaters.myName,
            paramaters.Personnality,
            paramaters.Theme,
            paramaters.STheme,
            paramaters.PrecurePhoto,
            paramaters.hairstyle,
            paramaters.numTeammates
        ];
    return await connection.query(insertSQL, queryParameters);
}

async function updateData(id, parameters = {}){
    let updateSQL = `UPDATE precure_survey SET myName = ?, Personnality = ?, Theme = ?, Stheme = ?, precurePhoto = ?, hairstyle = ?, numTeammates = ? WHERE id = ?`,
        queryParameters = [
            parseInt(paramaters.book),
            paramaters.myName,
            paramaters.Personnality,
            paramaters.Theme,
            paramaters.STheme,
            paramaters.PrecurePhoto,
            paramaters.hairstyle,
            paramaters.numTeammates
        ];
    return await connection.query(insertSQL, queryParameters);
}

// FIXED: module.exports not "modules.export"
module.exports = {
    getAll,
    getById,
    insert,
    edit,
    remove,
    updateData
};
