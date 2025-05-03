// index.js — Express routes for Precure App
const path = require('path');
const express = require('express');
const multer = require('multer');
const { check, validationResult } = require('express-validator');
const Precure = require('./Model/Precure');

// Create table on start
Precure.createTable()
    .then(() => console.log('🎀 Table checked/created successfully! 🎀'))
    .catch((error) => console.error('Error creating table:', error));

const app = express();
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, path.parse(file.originalname).name + '-' + Date.now() + path.parse(file.originalname).ext)
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => cb(null, ["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype))
});

const port = 3000;

// GET all with filters
app.get('/Precure/', upload.none(), async (req, res) => {
    try {
        const result = await Precure.getAll(req.query);
        res.json({ data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '🎀 Something went wrong with the server. 🎀' });
    }
});

// GET by ID
app.get('/survey/:id', upload.none(), async (req, res) => {
    try {
        const result = await Precure.getById(req.params.id);
        res.json({ data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '🎀 Error retrieving record 🎀' });
    }
});

// POST new entry
app.post('/',
    upload.single('precure_photo'),
    [
        check('name').trim().notEmpty().withMessage('Name is required.'),
        check('season').trim().notEmpty().withMessage('Season is required.'),
        check('theme').trim().notEmpty().withMessage('Theme is required.'),
        check('stheme').trim().notEmpty().withMessage('Sub Theme is required.'),
        check('hairstyle').notEmpty().withMessage('Hairstyle selection is required.'),
        check('num_teammates').isInt({ min: 1, max: 10 }).withMessage('Teammates must be a number between 1 and 10.')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newPrecure = {
                name: req.body.name,
                season: req.body.season,
                theme: req.body.theme,
                stheme: req.body.stheme,
                precure_photo: req.file ? req.file.filename : null,
                hairstyle: req.body.hairstyle,
                num_teammates: parseInt(req.body.num_teammates)
            };
            const result = await Precure.insert(newPrecure);
            res.status(200).json({ data: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '🎀 Something went wrong inserting into the server 🎀' });
        }
    }
);

// PUT update by ID
app.put('/Precure/:id',
    upload.none(),
    [
        check('name').trim().notEmpty().withMessage('Name is required.'),
        check('season').trim().notEmpty().withMessage('Season is required.'),
        check('theme').trim().notEmpty().withMessage('Theme is required.'),
        check('stheme').trim().notEmpty().withMessage('Sub Theme is required.'),
        check('hairstyle').notEmpty().withMessage('Hairstyle selection is required.'),
        check('num_teammates').isInt({ min: 1, max: 10 }).withMessage('Teammates must be a number between 1 and 10.')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const id = req.params.id;
            const result = await Precure.edit(id, req.body);
            res.json({ data: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '🎀 Error updating record 🎀' });
        }
    }
);

// DELETE by ID
app.delete('/Precure/:id', async (req, res) => {
    try {
        const result = await Precure.remove(req.params.id);
        res.json({ data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '🎀 Error deleting record 🎀' });
    }
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
