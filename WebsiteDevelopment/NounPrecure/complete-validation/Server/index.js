//Libraries
const path = require('path');
const express = require('express');
const multer = require('multer');
const { check, checkSchema, validationResult } = require('express-validator');
const Precure = require('./Model/Precure');

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

app.get(
    //Path of the Http request
    '/Precure/',
    '/Precure/:id',
    '/Personnality/',
    '/Theme/',
    '/SubTheme/',
    '/Hairstyle/',
    upload.none(),
    async (request, sresponse) => {
        let result = {};
        //try the first block of code, run the second block of code if it fails
        try {
            //stop, get results from the database
            result = await Precure.getAll(request.query);
        } catch (error) {
            //server error
            return response
                .status(500) //Error code
                .json({ message: '🎀 Something went wrong with the server. 🎀 ' });

        }
        //Default response object
        response.json({ 'data': result });
    });

app.post(
    upload.none(),
    async (request, response) => {
        let result = {};
        //try the first block of code, run the second block of code if it fails
        try {
            //stop, get results from the database
            result = await Precure.insert(request.query);
        } catch (error) {
            //server error
            return response
                .status(500) //Error code
                .json({ message: '🎀 Something went wrong with the server. 🎀 ' });

        }
        //Default response object
        response.json({ 'data': result });
    });

    app.delete('/Precure/:id', async (request, response) => {
        try {
            const id = request.params.id;
            const result = await Precure.remove(id);
            response.json({ data: result });
        } catch (error) {
            response.status(500).json({ message: '🎀 Error deleting record 🎀' });
        }
    });
    

app.put('/Precure/:id', upload.none(), async (request, response) => {
    try {
        const id = request.params.id;
        const result = await Precure.edit(id, request.body);
        response.json({ data: result });
    } catch (error) {
        response.status(500).json({ message: '🎀 Error updating record 🎀' });
    }
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})