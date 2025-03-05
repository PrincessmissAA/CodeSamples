// Cute Precure Server 🌸
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up multer for file upload, renaming files
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Renames the file
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'));
        }
        cb(null, true);
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', upload.single('PrecurePhoto'), (req, res) => {
    let errors = [];

    // Validation for 6+ values
    if (!req.body.Personality) errors.push("Please select a personality! 🎀");
    if (!req.body.Theme) errors.push("Theme is required! 🌸");
    if (!req.body.STheme) errors.push("Sub Theme cannot be empty! 💖");
    if (!req.file) errors.push("Please upload a cute Precure photo! 📸");
    if (!req.body.numTeammates || req.body.numTeammates < 1) errors.push("At least one teammate is needed! 🏆");
    
    const validHairstyles = ["Short", "Medium", "Long"];
    if (!validHairstyles.includes(req.body.hairstyle)) errors.push("Invalid hairstyle selection! ✂️");

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    res.json({
        message: "Yay! Submission successful! 🎉",
        fileName: req.file.filename
    });
});

app.listen(port, () => {
    console.log(`🌟 Precure Server is running at http://localhost:${port} 🌟`);
});
