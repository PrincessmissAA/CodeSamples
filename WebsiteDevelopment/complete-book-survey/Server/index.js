//Libraries
const express = require('express');
const multer  = require('multer');
const book = require('./Model/book');
const survey = require('./Model/survey');
const { check, checkSchema, validationResult } = require('express-validator');


//Setup defaults for script
const app = express();
app.use(express.static('public'));
const upload = multer()
const port = 80 //Default port to http server

//JSON of books from database
app.get(
    '/books/', 
    upload.none(),
    async (request, response) => {
        let result = {};
        try {
            result = await book.getAll();
        } catch (error) {
            return response
                .status(500) //Error code
                .json({message: 'Something went wrong with the server.'});
        }
        //Default response object
        response.json({'data': result});
});

app.get(
    '/survey/',
    upload.none(),
    async (request, response) => {
        let result = {};
        try {
            result = await survey.getAll();
        } catch (error) {
            return response
                .status(500) //Error code
                .json({message: 'Something went wrong with the server.'});
        }
        //Default response object
        response.json({'data': result});
});

app.get(
    '/survey/:id/',
    upload.none(),
    async (request, response) => {
        let result = {};
        try {
            result = await survey.getByID(request.params.id);
        } catch (error) {
            console.error(error);
            return response
                .status(500) //Error code
                .json({message: 'Something went wrong with the server.'});
        }
        //Default response object
        response.json({'data': result});
    }
);


//Action to handle form submission
app.post(
    '/', 
    upload.none(), 
    async (request, response) => {
        try {
            result = await survey.insert(request.body);
        } catch (error) {
            return response
                .status(500) //Error code
                .json({message: 'Something went wrong with the server.'});
        }
        //Default response object
        response.json({'data': 'Survey response saved!'});
});

app.put(
    '/:id/',
    upload.none(),

    check('firstName', 'Please enter a valid name').trim().notEmpty().isLength({min:2}).isAlpha(),
    check('lastName', 'Please enter a valid name').trim().notEmpty().isLength({min:2}).isAlpha(),
    check('book', 'Please enter a valid name').trim().notEmpty().isInt(),
    check('reason', 'Please enter a valid name').trim().notEmpty().isLength({min:2}),


    async (request, response) => {
        let result = {};
        try {
            result = await survey.updateData(request.params.id, request.body);
        } catch (error) {
            console.error(error);
            return response
                .status(500) //Error code
                .json({message: 'Something went wrong with the server.'});
        }
        //Default response object
        response.json({'data': result});
    }
)

app.listen(port);