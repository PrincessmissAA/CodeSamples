//library for connecting to MySQL database
//To install, run the following on cmd: npm install mysql2
const mysql = require('mysql2/promise');

let connection = null;

//'async' keyword allows the function to return a promise which is 'await'
async function query(sql, params) {
    //Singleton DB connection
    if (null === connection) {
        //Stop, Let's make the database connection
        connection = await mysql.createConnection({
            host: "student-databases.cvode4s4cwrc.us-west-2.rds.amazonaws.com",
            user: "avywilford",
            password: "4ffvz1uNRgHXhtp5vVAqwmk68D72dFjBR0W",
            database: 'avywilford',
        });
    }
    //Stop run the database code first
    const [results,] = await connection.execute(sql, params);
    return results;
}

//files outside of this file can access the query function
module.exports = {
    query
}
