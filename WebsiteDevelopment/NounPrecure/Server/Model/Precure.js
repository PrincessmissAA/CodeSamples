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
            precure_photo VARCHAR(255),
            hairstyle VARCHAR(255),
            num_teammates INT
        )
    `;
    return await connection.query(createSql);
}

// Get all records
async function getAll(parameters = {}) {
    let selectSql = `SELECT * FROM precure_survey WHERE 1=1`;
    const queryParams = [];

    if (parameters.name) {
        selectSql += ` AND name = ?`;
        queryParams.push(parameters.name);
    }
    if (parameters.personnality) {
        selectSql += ` AND personnality = ?`;
        queryParams.push(parameters.personnality);
    }
    if (parameters.theme) {
        selectSql += ` AND theme = ?`;
        queryParams.push(parameters.theme);
    }
    if (parameters.num_teammates) {
        selectSql += ` AND num_teammates = ?`;
        queryParams.push(parameters.num_teammates);
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
            personnality = ?, 
            theme = ?, 
            stheme = ?, 
            precure_photo = ?, 
            hairstyle = ?, 
            num_teammates = ?
        WHERE id = ?
    `;
    const queryParams = [
        parameters.name,
        parameters.personnality,
        parameters.theme,
        parameters.stheme,
        parameters.precure_photo,
        parameters.hairstyle,
        parameters.num_teammates,
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
        (name, personnality, theme, stheme, precure_photo, hairstyle, num_teammates)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    let queryParameters = [
        parameters.name,      
        parameters.personnality, 
        parameters.theme,        
        parameters.stheme,       
        parameters.precure_photo, 
        parameters.hairstyle,    
        parameters.num_teammates  
    ];
    return await connection.query(insertSQL, queryParameters);
}


async function updateData(id, parameters = {}) {
    let updateSQL = `
        UPDATE precure_survey 
        SET 
            name = ?, 
            personnality = ?, 
            theme = ?, 
            stheme = ?, 
            precure_photo = ?, 
            hairstyle = ?, 
            num_teammates = ?
        WHERE id = ?
    `;
    let queryParameters = [
        parameters.name,
        parameters.personnality,
        parameters.theme,
        parameters.stheme,
        parameters.precure_photo,
        parameters.hairstyle,
        parameters.num_teammates,
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
