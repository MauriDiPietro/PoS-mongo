import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err)=>{
        if(err){
            console.log(err)
        }else{
            console.log('Conectado a la base de datos!')
        }
    }
);

export default mongoose;