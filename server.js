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

db.sequelize.sync({ force: true}).then(()=>{
  console.log('Drop and Resync Db');
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

app.get('/', function (req, res) {
  res.json({ message: "Welcome to azza  application. using jwt "}); 
})

const PORT= process.env.PORT || 8081;
 
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`);
})