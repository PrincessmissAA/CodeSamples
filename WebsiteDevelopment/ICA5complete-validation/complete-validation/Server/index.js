//Libraries
const path = require('path');
const express = require('express');
const multer = require('multer');
const { check, checkSchema, validationResult } = require('express-validator');

//Setup defaults for script
const app = express();
const storage = multer.diskStorage({
    //Logic where to upload file
    destination: function (request, file, callback) {
        callback(null, 'uploads/')
    },
    //Logic to name the file when uploaded
    filename: function (request, file, callback) {
        /**
         * @source https://stackoverflow.com/questions/19811541/get-file-name-from-absolute-path-in-nodejs
         */
        callback(null, path.parse(file.originalname).name + '-' + Date.now() + path.parse(file.originalname).ext)
    }
})
const upload = multer({
    storage: storage,
    //Validation for file upload
    fileFilter: (request, file, callback) => {
        const allowedFileMimeTypes = ["image/png", "image/jpg", "image/jpeg"];
        callback(null, allowedFileMimeTypes.includes(file.mimetype));
    }
});
const port = 80 //Default port to http server

//The * in app.* needs to match the method type of the request
app.post(
    '/',
    //Should be the name of the 'file' field in the request
    upload.fields([{ name: 'file', maxCount: 1 }]),
    //Validation for 'name' field in request
    check('name', 'Please enter your name.').isLength({ min: 3 }),
    //Validation for 'choice' field in request
    check('choice', "Please select either the 'Yes' or 'No' option.")
        .isIn(['Yes', 'No']),
    //Validation for 'file' field in request
    checkSchema({
        'file': {
            custom: {
                options: (value, { req, path }) => !!req.files[path],
                errorMessage: 'Please upload an image file.',
            },
        },
    }),
    (request, response) => {
        //Validate request; If there any errors, send 400 response back
        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            return response
                .status(400)
                .setHeader('Access-Control-Allow-Origin', '*') //Prevent CORS error
                .json({
                    message: 'Request fields or files are invalid.',
                    errors: errors.array(),
                });
        }

        //Default response object
        response
            .setHeader('Access-Control-Allow-Origin', '*') //Prevent CORS error
            .json({ message: 'Request fields and files are valid.' });
    });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})