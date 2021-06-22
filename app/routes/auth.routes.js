const controller =require('../controllers/auth.controller');
const {  verifySingUp  }= require('../middleware');

 module.exports= function(app){
     app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
     });
     app.post('/api/auth/signup',
        [
        verifySingUp.checkDuplicateUsernameOrEmail,
        verifySingUp.checkRolesExisted
        ],
        controller.signUp
     );

     app.post('/api/auth/signin',controller.signin);
 };
//prisma 