//Libraries
const path = require('path');
const express = require('express');
const multer = require('multer');
const { check, validationResult } = require('express-validator');
const Precure = require('./Model/Precure');

// Setup defaults for script
const app = express();
const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, 'uploads/')
    },
    filename: function (request, file, callback) {
        callback(null, path.parse(file.originalname).name + '-' + Date.now() + path.parse(file.originalname).ext)
    }
});
const upload = multer({
    storage: storage,
    fileFilter: (request, file, callback) => {
        const allowedFileMimeTypes = ["image/png", "image/jpg", "image/jpeg"];
        callback(null, allowedFileMimeTypes.includes(file.mimetype));
    }
});
const port = 80;

// GET route for retrieving records
app.get('/Precure/', upload.none(), async (request, response) => {
    try {
        const result = await Precure.getAll(request.query);
        response.json({ data: result });
    } catch (error) {
        response.status(500).json({ message: '🎀 Something went wrong with the server. 🎀' });
    }
});

// POST route with validation
app.post('/', 
    upload.single('PrecurePhoto'),
    [
        check('myName').trim().notEmpty().withMessage('Name is required.'),
        check('Personnality').trim().notEmpty().withMessage('Personality is required.'),
        check('Theme').trim().notEmpty().withMessage('Theme is required.'),
        check('STheme').trim().notEmpty().withMessage('Sub Theme is required.'),
        check('hairstyle').notEmpty().withMessage('Hairstyle selection is required.'),
        check('numTeammates').isInt({ min: 1, max: 10 }).withMessage('Teammates must be a number between 1 and 10.')
    ], 
    async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        let baseSql = `SELECT * FROM precure_survey WHERE 1=1`;
        const whereStatements = [], orderByStatements = [], queryParameters = [];

        if (request.body.myName) {
            whereStatements.push('myName LIKE ?');
            queryParameters.push('%' + request.body.myName + '%');
        }
        if (request.body.Personnality) {
            whereStatements.push('Personnality = ?');
            queryParameters.push(request.body.Personnality);
        }
        if (request.body.Theme) {
            whereStatements.push('Theme = ?');
            queryParameters.push(request.body.Theme);
        }
        if (request.body.numTeammates && !isNaN(parseInt(request.body.numTeammates))) {
            whereStatements.push('numTeammates = ?');
            queryParameters.push(parseInt(request.body.numTeammates));
        }
        if (request.body.sort === 'ASC' || request.body.sort === 'DESC') {
            orderByStatements.push(`id ${request.body.sort}`);
        }
        if (whereStatements.length > 0) {
            baseSql += ' AND ' + whereStatements.join(' AND ');
        }
        if (orderByStatements.length > 0) {
            baseSql += ' ORDER BY ' + orderByStatements.join(', ');
        }
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
    }
);

// DELETE route
app.delete('/Precure/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const result = await Precure.remove(id);
        response.json({ data: result });
    } catch (error) {
        response.status(500).json({ message: '🎀 Error deleting record 🎀' });
    }
});

// PUT route with validation
app.put('/Precure/:id', 
    upload.none(),
    [
        check('myName').trim().notEmpty().withMessage('Name is required.'),
        check('Personnality').trim().notEmpty().withMessage('Personality is required.'),
        check('Theme').trim().notEmpty().withMessage('Theme is required.'),
        check('STheme').trim().notEmpty().withMessage('Sub Theme is required.'),
        check('hairstyle').notEmpty().withMessage('Hairstyle selection is required.'),
        check('numTeammates').isInt({ min: 1, max: 10 }).withMessage('Teammates must be a number between 1 and 10.')
    ],
    async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        try {
            const id = request.params.id;
            const result = await Precure.edit(id, request.body);
            response.json({ data: result });
        } catch (error) {
            response.status(500).json({ message: '🎀 Error updating record 🎀' });
        }
    }
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
