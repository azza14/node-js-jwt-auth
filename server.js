const express = require('express')
const  Sequelize= require('sequelize');

const bodyParser=require('body-parser')
const cors = require('cors')

const app = express()
var corsOptions={
    origin:"http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const db= require('./app/models');
const Role= db.role;
// In development,
// you may need to drop existing tables and re-sync database.
// So you can use force: true
db.sequelize.sync({ force: true}).then(()=>{
  console.log('create Db');
  initial();
})


function initial(){
  Role.create({
    id:1,
    name:'user'
  });

  Role.create({
    id:2,
    name:'moderator'
  });

  Role.create({
    id:3,
    name:'admin'
  });
}

//routes
 require('./app/routes/auth.routes')(app);
 require('./app/routes/user.routes')(app);

app.get('/', function (req, res) {
  res.json({ message: "Welcome to azza  application. using jwt "}); 
})


const PORT= process.env.PORT || 4200;
 
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`);
})