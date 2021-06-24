const express = require('express')
const  Sequelize= require('sequelize');

const bodyParser=require('body-parser')
const cors = require('cors')

global.__basedir= __dirname;
const app = express()
var corsOptions={
    origin:"http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: true}));

const db= require('./app/models');
const Role= db.role;
// In development,
// you may need to drop existing tables and re-sync database.
// So you can use force: true
db.sequelize.sync({ force: false}).then(()=>{
  console.log('create Db');
  initial();
})


 async function initial(){
  await Role.create({
   // id:1,
    name:'user'
  });

  await Role.create({
   // id:2,
    name:'moderator'
  });
  console.log('test create ')

  await  Role.create({
    
   // id:3,
    name:'admin'
  });
}

//routes
 require('./app/routes/auth.routes')(app);
 require('./app/routes/user.routes')(app);
 
require('./app/routes/index')(app);
require('./app/routes/tutorial.routes')(ap);

// production error handler
const HTTP_SERVER_ERROR = 5000;
app.use(function(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  return res.status(err.status || HTTP_SERVER_ERROR).render('5000');
});

app.get('/', function (req, res) {
  res.json({ message: "Welcome to azza  application. using jwt "}); 
})


const PORT= process.env.PORT || 4200;
 
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`);
})