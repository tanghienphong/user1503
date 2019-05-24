const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const flash = require('connect-flash'); 
const session = require('express-session');
require('./lib/dbconnect')
const { hash, compare } =  require('./lib/bcrypt')
const {UserModel} = require('./models/User')
const userRouter = require('./controllers/user.route')
const homeRouter = require('./controllers/home.route')
const { checkLogin } = require('./lib/authenticate');

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:false}))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))
app.use(flash()) 
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})

// chuyển post từ heroku xuống.
const port = process.env.port || 3000

app.listen(port,()=>{
    return console.log('Server started on port 3000')
})

app.use('/',userRouter)
app.use('/',checkLogin,homeRouter)

// app.get('/signup',(req,res)=>{
//     return res.render('signup')
// })

// app.post('/signup',(req,res)=>{
//     const {email, fullname, password, password_comfirmation} = req.body
//     if(password != password_comfirmation){
//         req.flash('error_msg','Password not match!');
//         res.redirect('/signup')
//     }
//     hash(password)
//     .then(passwordHash=>{
//         return UserModel.create({
//             email, fullname, password: passwordHash
//         })
//     })
//     .then(user=>{
//         console.log(user)
//         res.redirect('./signin')
//     })
//     .catch(err=>{
//         req.flash('error_msg', err.message);
//         res.redirect('/signup')
//     })
// })

// app.get('/signin',(req,res)=>{
//     return res.render('signin')
// })

// app.post('/signin',(req,res)=>{
//     const {email, password} = req.body;
//     UserModel.findOne({email})
//     .then(user=>{
//         if(!user){
//             req.flash('error_msg', "User is not found!")
//             return res.redirect('/signin')
//         }
//         //compare password
//         return compare(password, user.password)        
//     })
//     .then(result=>{
//         if(!result){
//             req.flash('error_msg', 'Password Invalid!')
//             return res.redirect('/signin')
//         }else{
//             req.flash('success_msg', "Login successfull!")
//             return res.redirect('/')
//         }                    
//     })
//     .catch(err=>{
//         req.flash('error_msg', err.message)
//         return res.redirect('/signin')
//     })
// })

// app.get('/',(req,res)=>{
//     return res.render('home')
// })