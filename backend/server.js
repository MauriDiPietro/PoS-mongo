import express from 'express';
import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'
import cors from 'cors';
import morgan from 'morgan';
import routesSales from './routes/sale.routes.js';
import routesProducts from './routes/listOfPrice.routes.js';
import './db/db.js'
import {getSalesByDate, saveSale} from './controllers/sale.controllers.js'


const PORT = 8080

const app = express();

const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

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

io.on('connection', async (socket) => {
    socket.on('conectado', ()=>{
        console.log('front conectado!');
        
        // console.log(`${socket.id}`)
    })

    socket.on('sale', await saveSale(newSale))

    // // carga inicial de ventas
    socket.emit('sales', await getSalesByDate());

    // // actualizacion de productos
    // socket.on('update', async sale => {
    //     await saveSale(sale)
    //     io.sockets.emit('sales', await getSalesByDate());
    // })
});



httpServer.listen(PORT, ()=>{
    console.log(`Server OK PORT=${PORT}`)
})