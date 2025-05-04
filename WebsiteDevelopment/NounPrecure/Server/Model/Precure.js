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

async function createCharacterTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS characters (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            photo VARCHAR(255),
            hairstyle VARCHAR(50),
            color VARCHAR(50),
            theme VARCHAR(100),
            subtheme VARCHAR(100)
        )`;
    return await connection.query(sql);
}

async function createSeasonTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS season (
            id INT AUTO_INCREMENT PRIMARY KEY,
            season_name VARCHAR(100) NOT NULL,
            year_aired YEAR
        )`;
    return await connection.query(sql);
}

async function createPrecureTeamTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS precure_team (
            id INT AUTO_INCREMENT PRIMARY KEY,
            characters_id INT,
            season_id INT,
            num_teammates INT,
            FOREIGN KEY (characters_id) REFERENCES characters(id),
            FOREIGN KEY (season_id) REFERENCES season(id)
        )`;
    return await connection.query(sql);
}



async function getAll(parameters = {}) {
    let selectSql = `
        SELECT 
            c.name,
            c.photo,
            c.hairstyle,
            c.color,
            c.theme,
            c.subtheme,
            s.season_name,
            s.year_aired,
            t.num_teammates
        FROM precure_team t
        INNER JOIN characters c ON t.characters_id = c.id
        INNER JOIN season s ON t.season_id = s.id
        WHERE 1 = 1`;
    
    const queryParams = [];

    if (parameters.name) {
        selectSql += ` AND c.name = ?`;
        queryParams.push(parameters.name);
    }

    if (parameters.theme) {
        selectSql += ` AND c.theme = ?`;
        queryParams.push(parameters.theme);
    }

    if (parameters.subtheme) {
        selectSql += ` AND c.subtheme = ?`;
        queryParams.push(parameters.subtheme);
    }

    if (parameters.season) {
        selectSql += ` AND s.season_name = ?`;
        queryParams.push(parameters.season);
    }

    if (parameters.order && ['season_name', 'name', 'theme', 'num_teammates'].includes(parameters.order)) {
        selectSql += ` ORDER BY ${parameters.order}`;
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

async function createTables() {
    await createCharacterTable();
    await createSeasonTable();
    await createPrecureTeamTable();
}


module.exports = {
    getAll,
    getById,
    insert,
    edit,
    remove,
    createTables
};
