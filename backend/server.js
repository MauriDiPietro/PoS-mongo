import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routesSales from './routes/sale.routes.js';
import routesProducts from './routes/listOfPrice.routes.js';
import './db/db.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
  });
const whiteList = ['http://localhost:3000', 'ws://localhost:3000', 'https://larueca.netlify.app/', 'https://larueca.vercel.app/']
app.use(cors({origin: whiteList}));


app.use('/sales', routesSales)
app.use('/products', routesProducts)


app.listen(process.env.PORT, ()=>{
    console.log(`Server OK PORT=${process.env.PORT}`)
})