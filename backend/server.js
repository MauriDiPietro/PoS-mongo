import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routesSales from './routes/sale.routes.js';
import './db/db.js'

const PORT = 8080

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan('dev'));

app.use('/sales', routesSales)

app.listen(PORT, ()=>{
    console.log(`Server OK on port: ${PORT}`)
});