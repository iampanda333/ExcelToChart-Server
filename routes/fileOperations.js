const express = require('express');
const multer = require('multer');
const excelToJson = require('convert-excel-to-json');

const router = new express.Router();

var store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: store,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(xlsx)/)) {
            return cb(new Error('Please upload excel file'));
        }
        cb(undefined, true);
    }
});

router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'File is missing' });
    }
    const result = excelToJson({
        sourceFile: req.file.path,
        header: {
            rows: 1
        },
        columnToKey: {
            A: 'sprint',
            B: 'expVelocity',
            C: 'actVelocity'
        }
    });
    res.json({ result: result['Sheet1'] });
}, (error, req, res, next) => {
    res.status(400).json({ error: error.message });
});

router.get('/test', function (req, res) {
    res.send('test')
})

module.exports = router;
