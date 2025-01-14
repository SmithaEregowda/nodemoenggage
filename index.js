const express=require("express");
const mongoose=require("mongoose");


require("dotenv").config();

const cors=require("cors");

const app=express();
const server = require("http").createServer(app);

const userRoutes=require('./routes/auth');
const listRoutes=require('./routes/list');
const Errorhandler = require("./middlewares/errorhandler");

const BodyParser=require("body-parser")


app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true, 
}));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});


app.use(BodyParser.json())

app.use(BodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('make world');
  });

  app.use('/user',userRoutes)
  
  app.use('/list',listRoutes)

  app.use(Errorhandler)


const connectdataBaseHandler=async()=>{
    try{
        const result=mongoose.connect(`mongodb+srv://smitha:smitha123@cluster0.pmlfv.mongodb.net/statusCodeapp?retryWrites=true&w=majority`);
        if(!result){
            const error=new Error('Failed to connect Database');
            throw error;
        }
        console.log('Database Connected!!')
    }catch(err){
        console.log("Facing Issue:",err)
    }
}

server.listen(process.env.PORT||3030, () => {
    console.log("Listening on *:7070");
});

connectdataBaseHandler()