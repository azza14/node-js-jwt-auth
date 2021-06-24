const util= require('util');
const multer= require('multer');

const maxsize= 2 * 1024 * 2024;

let storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,__basedir + '/resources/static/assets/uploads/');
    },
    filename:(req,file,cb)=>{
        console.log( 'file originalname'+ file.originalname);
        cb(null,file.originalname);
    }
});

let uploadFile= multer({
    storage:storage,
    limits:{fileSize:maxsize},
}).single('file');

let uploadFileMiddleware= util.promisify(uploadFile);


module.exports= uploadFileMiddleware;
