const express = require('express');
const router= express.Router();
const excelController= require('../controllers/excel.controller');
const upload= require('../middleware/uploadexcel');
 
let routes= app =>{
    router.post('/api/excel/upload', upload.single('file'), excelController.upload);
    router.get('/api/excel/tutorials', excelController.getAllTutorials);
    router.get("/api/excel/download", excelController.download);

   // app.use('/api/excel',router)
};
module.exports= routes;

