//Libraries
const path = require('path');
const express = require('express');
const multer = require('multer');
const { check, validationResult } = require('express-validator');
const Precure = require('./Model/Precure');

// Create table when server starts
Precure.createTable()
    .then(() => {
        console.log('🎀 Table checked/created successfully! 🎀');
    })
    .catch((error) => {
        console.error('Error creating table:', error);
    });

// Setup defaults for script
const app = express();
app.use(express.static(path.join(__dirname, '../public')));
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
const port = 3000;

// GET route for retrieving records
app.get('/Precure/', upload.none(), async (request, response) => {
    try {
        const result = await Precure.getAll(request.query);
        response.json({ data: result });
    } catch (error) {
        response.status(500).json({ message: '🎀 Something went wrong with the server. 🎀' });
    }
});

app.get('/survey/:id', upload.none(), async (request, response) => {
    try {
        const result = await Precure.getById(request.params.id);
        response.json({ data: result });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: '🎀 Error retrieving record 🎀' });
    }
});


// POST route with validation
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

        try {
            const newPrecure = {
                myName: request.body.myName,
                Personnality: request.body.Personnality,
                Theme: request.body.Theme,
                STheme: request.body.STheme,
                PrecurePhoto: request.file ? request.file.filename : null,
                hairstyle: request.body.hairstyle,
                numTeammates: parseInt(request.body.numTeammates)
            };
            const result = await Precure.insert(newPrecure);
            response.status(200).json({ data: result });
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: '🎀 Something went wrong inserting into the server 🎀' });
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
    console.log(`Example app listening at http://localhost:3000`);
});
