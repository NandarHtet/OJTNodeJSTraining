import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import multer from 'multer';
import authRouter from './routers/authRoute.js'

const app = express();
const upload = multer();

app.set('view engine','pug');
app.set('views','./views');

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(upload.array());
app.use(cookieParser());

app.use(session({
    secret : 'Your secret key',
    resave : false,
    saveUninitialized : false
}));

app.use('/',authRouter);

app.use((err,req,res,next) => {
    console.log(err);
    res.redirect('/login');
})

app.listen(5000,()=> console.log("Server is running on port 5000"));