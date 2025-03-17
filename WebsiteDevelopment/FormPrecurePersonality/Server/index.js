//This is the edited complete validation expres code, with some ChatGPT code
// Libraries
const path = require('path');
const express = require('express');
const multer = require('multer');
const { check, checkSchema, validationResult } = require('express-validator');

const app = express();
const port = 3000; // Change to 3000 to avoid permission issues with port 80

//Serve static files from "public" folder (Make sure your index.html, style.css, and index.js are inside "public")
app.use(express.static('public'));

//Route to serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// File upload storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads/'); // Store files in "uploads/" folder
    },
    filename: function (req, file, callback) {
        callback(null, path.parse(file.originalname).name + '-' + Date.now() + path.parse(file.originalname).ext);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        const allowedFileMimeTypes = ["image/png", "image/jpg", "image/jpeg"];
        callback(null, allowedFileMimeTypes.includes(file.mimetype));
    }
});

//Form submission route
app.post(
    '/',
    upload.single('PrecurePhoto'),
    [
        check('Personality', 'Please select a personality type.').notEmpty(),
        check('Theme', 'Theme is required.').notEmpty(),
        check('STheme', 'Sub Theme cannot be empty.').notEmpty(),
        check('numTeammates', 'Number of teammates must be at least 1.').isInt({ min: 1 }),
        check('hairstyle', 'Please select a hairstyle.').isIn(['Short', 'Medium', 'Long']),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error("Validation Errors:", errors.array());
            return res.status(400).json({
                message: 'Request fields or files are invalid.',
                errors: errors.array(),
            });
        }

        res.json({ message: '✅ Form submitted successfully!', fileName: req.file.filename });
    }
);


// 🌟 Start server
app.listen(port, () => {
    console.log(`🌟 Server is running at http://localhost:${port} 🌟`);
});
