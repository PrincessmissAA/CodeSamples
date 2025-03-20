//This is the edited complete validation expres code, with some ChatGPT code
// Libraries
const path = require('path');
const express = require('express');
const multer = require('multer');
const { check, checkSchema, validationResult } = require('express-validator');
// Store successful form submissions
const submissions = [];


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
        check('userName', 'Name must be at least 2 characters long.').isLength({ min: 2 }),
        check('Personality', 'Please select a personality type.').notEmpty(),
        check('Theme', 'Theme is required.').notEmpty(),
        check('STheme', 'Sub Theme cannot be empty.').notEmpty(),
        check('numTeammates', 'Number of teammates must be at least 1.').isInt({ min: 1 }),
        check('hairstyle', 'Please select a hairstyle.').isIn(['Short', 'Medium', 'Long']),
        check('colorPicker', 'Please select a color.').notEmpty(),
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

        // Store the successful submission
        const newSubmission = {
            userName: req.body.userName,
            Personality: req.body.Personality,
            Theme: req.body.Theme,
            STheme: req.body.STheme,
            numTeammates: req.body.numTeammates,
            hairstyle: req.body.hairstyle,
            colorPicker: req.body.colorPicker,
            fileName: req.file ? req.file.filename : null, // Save the uploaded file name if present
        };

        // Save submission in the array
        submissions.push(newSubmission);

        // Send response including all stored submissions
        res.json({
            message: '✅ Form submitted successfully!',
            submissions: submissions, // Send all saved submissions
        });


    }
);

app.get('/submissions', (req, res) => {
    res.json({ submissions });
});


// 🌟 Start server
app.listen(port, () => {
    console.log(`🌟 Server is running at http://localhost:${port} 🌟`);
});
