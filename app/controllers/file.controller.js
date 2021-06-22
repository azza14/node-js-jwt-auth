const uploadFile = require('../middleware/upload');
const fs = require("fs");
const baseUrl = "http://localhost:8080/files/";


const upload= (req ,res)=>
{
    try 
    {
         uploadFile(req,res);
        if(req.file == undefined){
            return res.status(400).send({
                message:'Please upload a file!'
            });
        }
        res.status(200).send({
            message:'"Uploaded the file successfully:' + req.file.originalname
        });
    }
    catch (error)
     {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
              message: "File size cannot be larger than 2MB!",
            });
          }

        res.status(500).send({
            message: " can't upload the file  " +req.file.originalname + error
        });
    }
}

const getListFiles= (req,res)=>{

    let fileInfos=[];
    const directoryPath= __basedir+'/resources/static/assets/uploads/';
    
    fs.readdir(directoryPath,function(err, files){
        if(err){
            res.status(500).send({message:' Unable to scan files'});

        }
        
        files.forEach(file => {
            fileInfos.push({
                name:file,
                url: baseUrl + file,
            });
        });
        res.status(200).send(fileInfos);
    });
};

const download= (req,res)=>{
    const fileName= req.params.name;
    const directoryPath= __basedir + '/resources/static/assets/uploads/';

    res.download(directoryPath + fileName, fileName, function (err) {
        if (err) {
            res.status(500).send({
                message:' "Could not download the file ' + err
            });
        }
      })
}

module.exports={
    upload,
    getListFiles,
    download
}