import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routesSales from './routes/sale.routes.js';
import routesProducts from './routes/listOfPrice.routes.js';
import './db/db.js'
import dotenv from 'dotenv'
dotenv.config()

// const PORT = process.env.PORT || 8080

const app = express();



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
const whiteList = ['http://localhost:3000', 'ws://localhost:3000']
app.use(cors({origin: whiteList}));


// const corsOptions = {
//     origin: function(origin, callback){
//         if(whiteList.indexOf(origin)===-1){
//             callback(null, true)
//         }else{
//             callback(new Error('Noot allowed by CORS'))
//         }
//     }
// }


app.use('/sales', routesSales)
app.use('/products', routesProducts)


app.listen(process.env.PORT, ()=>{
    console.log(`Server OK PORT=${process.env.PORT}`)
})