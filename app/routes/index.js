const { Router } = require('express');
const express = require('express')
const router= express.Router();
const fileController= require('../controllers/file.controller');

let routes= app =>{
    router.post('/upload', fileController.upload);
    router.get('/files', fileController.getListFiles);
    router.get('/files/:name',fileController.download);

    app.use(Router);
}

module.exports= routes;



