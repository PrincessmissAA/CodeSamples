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

    app.post('/', 
        upload.single('PrecurePhoto'),  // switch from .none() if you're uploading a file
    [
        check('myName').trim().notEmpty().withMessage('Name is required.'),
        check('Personnality').trim().notEmpty().withMessage('Personality is required.'),
        check('Theme').trim().notEmpty().withMessage('Theme is required.'),
        check('STheme').trim().notEmpty().withMessage('Sub Theme is required.'),
        check('hairstyle').notEmpty().withMessage('Hairstyle selection is required.'),
        check('numTeammates').isInt({ min: 1, max: 10 }).withMessage('Teammates must be a number between 1 and 10.'),
    ], 
    
    async (request, response) => {
        let baseSql = `SELECT * FROM precure_survey WHERE 1=1`;
        const whereStatements = [];
        const orderByStatements = [];
        const queryParameters = [];
    
        // Filters
        if (request.body.myName && request.body.myName.trim().length > 0) {
            whereStatements.push('myName LIKE ?');
            queryParameters.push('%' + request.body.myName + '%');
        }
    
        if (request.body.Personnality && request.body.Personnality.trim().length > 0) {
            whereStatements.push('Personnality = ?');
            queryParameters.push(request.body.Personnality);
        }
    
        if (request.body.Theme && request.body.Theme.trim().length > 0) {
            whereStatements.push('Theme = ?');
            queryParameters.push(request.body.Theme);
        }
    
        if (request.body.numTeammates && !isNaN(parseInt(request.body.numTeammates))) {
            whereStatements.push('numTeammates = ?');
            queryParameters.push(parseInt(request.body.numTeammates));
        }
    
        // Sorting
        if (request.body.sort === 'ASC' || request.body.sort === 'DESC') {
            orderByStatements.push(`id ${request.body.sort}`);
        }
    
        // Add WHERE and ORDER BY if applicable
        if (whereStatements.length > 0) {
            baseSql += ' AND ' + whereStatements.join(' AND ');
        }
        if (orderByStatements.length > 0) {
            baseSql += ' ORDER BY ' + orderByStatements.join(', ');
        }
    
        // LIMIT
        const limit = parseInt(request.body.limit);
        if (!isNaN(limit) && limit > 0 && limit <= 10) {
            baseSql += ' LIMIT ' + limit;
        }
    
        try {
            const result = await Precure.query(baseSql, queryParameters);
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.json({ data: result });
        } catch (error) {
            console.error(error);
            response.status(500)
                .setHeader('Access-Control-Allow-Origin', '*')
                .json({ message: '🎀 Something went wrong with the server. 🎀' });
        }
    });

//I used Chatgpt to generate the delete and put methods
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