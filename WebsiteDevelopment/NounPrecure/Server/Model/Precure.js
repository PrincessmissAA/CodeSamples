// Precure.js — enhanced for PA 4–11 compliance
const connection = require('./Connection');

async function createTable() {
    const createSql = `
        CREATE TABLE IF NOT EXISTS precure_survey (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            season VARCHAR(255) NOT NULL,
            theme VARCHAR(255) NOT NULL,
            stheme VARCHAR(255),
            precure_photo VARCHAR(255),
            hairstyle VARCHAR(255),
            num_teammates INT
        )
    `;
    return await connection.query(createSql);
}

async function getAll(parameters = {}) {
    let selectSql = `SELECT * FROM precure_survey WHERE 1=1`;
    const queryParams = [];

    if (parameters.name) {
        selectSql += ` AND name = ?`;
        queryParams.push(parameters.name);
    }
    if (parameters.season) {
        selectSql += ` AND season = ?`;
        queryParams.push(parameters.season);
    }
    if (parameters.theme) {
        selectSql += ` AND theme = ?`;
        queryParams.push(parameters.theme);
    }
    if (parameters.stheme) {
        selectSql += ` AND stheme = ?`;
        queryParams.push(parameters.stheme);
    }
    if (parameters.num_teammates) {
        selectSql += ` AND num_teammates = ?`;
        queryParams.push(parameters.num_teammates);
    }

    if (parameters.order) {
        const allowedColumns = ['season', 'name', 'theme', 'num_teammates'];
        if (allowedColumns.includes(parameters.order)) {
            selectSql += ` ORDER BY ${parameters.order}`;
        }
    }

    selectSql += ` LIMIT 100`;
    return await connection.query(selectSql, queryParams);
}

async function getById(id) {
    const selectSql = `SELECT * FROM precure_survey WHERE id = ?`;
    return await connection.query(selectSql, [id]);
}

async function edit(id, parameters = {}) {
    let updateSql = `
        UPDATE precure_survey 
        SET 
            name = ?, 
            season = ?, 
            theme = ?, 
            stheme = ?, 
            hairstyle = ?, 
            num_teammates = ?`;

    const queryParams = [
        parameters.name,
        parameters.season,
        parameters.theme,
        parameters.stheme,
        parameters.hairstyle,
        parameters.num_teammates
    ];

    if (parameters.precure_photo !== undefined && parameters.precure_photo !== null) {
        updateSql += `, precure_photo = ?`;
        queryParams.push(parameters.precure_photo);
    }

    updateSql += ` WHERE id = ?`;
    queryParams.push(id);

    return await connection.query(updateSql, queryParams);
}

async function remove(id) {
    const deleteSql = `DELETE FROM precure_survey WHERE id = ?`;
    return await connection.query(deleteSql, [id]);
}

async function insert(parameters = {}) {
    let insertSQL = `
        INSERT INTO precure_survey 
        (name, season, theme, stheme, precure_photo, hairstyle, num_teammates)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    let queryParameters = [
        parameters.name,      
        parameters.season, 
        parameters.theme,        
        parameters.stheme,       
        parameters.precure_photo, 
        parameters.hairstyle,    
        parameters.num_teammates  
    ];
    return await connection.query(insertSQL, queryParameters);
}

module.exports = {
    getAll,
    getById,
    insert,
    edit,
    remove,
    createTable
};
