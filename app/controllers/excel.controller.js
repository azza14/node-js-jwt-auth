const db = require('.././models');
const Tutorial = db.tutorials;
const excel= require('exceljs')

const readXlsxFile = require('read-excel-file/node');

const upload = async (req, res) => {

    try {
        if (req.file == undefined) 
        {
            return res.status(400).send('Please upload an excel file!');
        }
        let path = __basedir + '/resources/static/assets/uploads/' + req.file.filename;
        console.log('value  tutorialc path' + path )
       
        readXlsxFile(path).then((rows) =>
         {
             //skip Header
                rows.shift();
                let tutorials = [];
                rows.forEach((row) => {
                    let tutorial = {
                        id: row[0],
                        title: row[1],
                        description: row[2],
                        published: row[3]
                    };
                  //  console.log('value  tutorial' + tutorials)
                    tutorials.push(tutorial);
                  //  console.log('value  tutorial s ' + tutorials)

                });
                Tutorial.bulkCreate(tutorials)
                    .then(() => {
                        res.status(200).send({
                            message: ' upload file successfuly' + req.file.originalname,
                        });
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message: "Fail to import data into database!",
                            err: err.message
                        });
                    });
            })
             .catch((err) => {
                res.status(500).send({
                     message: "cant import data into database!",
                     err: err.message
               });
                console.log(err)
            });

         } catch (err) {
        console.error(err);
        req.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
};
const getAllTutorials = (req, res) => {

    Tutorial.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Some error occurred while retrieving tutorials.' || err.message
            });
        });
};

const download= (req,res)=>{
    Tutorial.findAll()
    .then((objs)=>{
        let tutorials=[];
        objs.forEach((obj) => {
            tutorials.push({
              id: obj.id,
              title: obj.title,
              description: obj.description,
              published: obj.published,
            });

    });
    let workbook= new excel.Workbook();
    let worksheet= workbook.addWorksheet('Tutorials');

    worksheet.columns=[
        {header:'Id', key :'id',width:5},
        {header:'Title', key :'title',width:25},
        {header:'Description', key :'description',width:25},
        {header:'Published', key :'published',width:10},
    ];
    
    worksheet.addRows(tutorials);

    res.setHeader(
        'Content-Type',
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "tutorials.xlsx"
         );

      return workbook.xlsx.write(res).then(function () {
        res.status(200).end();
  });

});
};


module.exports = {
    upload,
    getAllTutorials,
    download
}