import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();

mongoose.connect(
    // 'mongodb://localhost:27017/pos?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
    'mongodb+srv://admin:admin@cluster0.glhmj.mongodb.net/pos?retryWrites=true&w=majority',
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