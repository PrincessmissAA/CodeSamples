//Libraries
const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');
const course = require('./Model/course');

//Setup defaults for script
const app = express();
app.use(express.static('public'))

const upload = multer()
const port = 80 //Default port to http server

//The * in app.* needs to match the method type of the request
app.get(
    '/course/', 
    upload.none(), 
    async (request, response) => {
        let result = {};
        try {
            result = await course.getAllCourses(request.query);
        } catch (error) {
            console.log(error);
            return response.status(500) //Error code 
                .json({message: 'Something went wrong with the server.'});
        }
        //Default response object
        response.json({'data': result});
});

app.listen(port, () => {
    console.log(`Application listening at http://localhost:${port}`);
})