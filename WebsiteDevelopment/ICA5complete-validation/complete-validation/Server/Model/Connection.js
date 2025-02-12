const mysql = require('mysql2/promise');

let connection = null;

//'async' keyword allows the function to return a promise which is 'await'
async function query(sql, params) {
    //Singleton DB connection
    if (null === connection) {
        //Stop, Let's make the database connection
        connection = await mysql.createConnection({
            host: "student-databases.cvode4s4cwrc.us-west-2.rds.amazonaws.com",
            user: "in_class_activity",
            password: "in_class_activity",
            database: 'in_class_activity'
        });
    }
    //Stop run the database code first
    const [results,] = await connection.execute(sql, params);
    return results;
}

module.exports = {
    query
}
