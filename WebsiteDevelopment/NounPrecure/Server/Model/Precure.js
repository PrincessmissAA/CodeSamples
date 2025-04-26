//I used Chatgpt to help make the async functions
const connection = require('./Connection');

async function createTable() {
    const createSql = `
        CREATE TABLE IF NOT EXISTS precure_survey (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            personnality VARCHAR(255) NOT NULL,
            theme VARCHAR(255) NOT NULL,
            stheme VARCHAR(255),
            precurephoto VARCHAR(255),
            hairstyle VARCHAR(255),
            numteammates INT
        )
    `;
    return await connection.query(createSql);
}

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
    const selectSql = `SELECT * FROM precure_survey WHERE id = ?`;
    return await connection.query(selectSql, [id]);
}


// Update a record by ID
async function edit(id, parameters = {}) {
    const updateSql = `
        UPDATE precure_survey 
        SET 
            name = ?, 
            Personnality = ?, 
            Theme = ?, 
            STheme = ?, 
            PrecurePhoto = ?, 
            hairstyle = ?, 
            numTeammates = ?
        WHERE id = ?
    `;
    const queryParams = [
        parameters.myName,
        parameters.Personnality,
        parameters.Theme,
        parameters.STheme,
        parameters.PrecurePhoto,
        parameters.hairstyle,
        parameters.numTeammates,
        id
    ];
    return await connection.query(updateSql, queryParams);
}


// Delete a record by ID
async function remove(id) {
    const deleteSql = `DELETE FROM precure_survey WHERE id = ?`;
    return await connection.query(deleteSql, [id]);
}


async function insert(parameters = {}) {
    let insertSQL = `
        INSERT INTO precure_survey 
        (name, personnality, theme, stheme, precurephoto, hairstyle, numteammates)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    let queryParameters = [
        parameters.myName,      
        parameters.Personnality, 
        parameters.Theme,        
        parameters.STheme,       
        parameters.PrecurePhoto, 
        parameters.hairstyle,    
        parameters.numTeammates  
    ];
    return await connection.query(insertSQL, queryParameters);
}


async function updateData(id, parameters = {}) {
    let updateSQL = `
        UPDATE precure_survey 
        SET 
            name = ?, 
            Personnality = ?, 
            Theme = ?, 
            STheme = ?, 
            PrecurePhoto = ?, 
            hairstyle = ?, 
            numTeammates = ?
        WHERE id = ?
    `;
    let queryParameters = [
        parameters.myName,
        parameters.Personnality,
        parameters.Theme,
        parameters.STheme,
        parameters.PrecurePhoto,
        parameters.hairstyle,
        parameters.numTeammates,
        id // <- very important!!
    ];
    return await connection.query(updateSQL, queryParameters);
}


// FIXED: module.exports not "modules.export"
module.exports = {
    getAll,
    getById,
    insert,
    edit,
    remove,
    updateData, 
    createTable
};
