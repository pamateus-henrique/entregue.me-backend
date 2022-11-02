require('./db/connect');
const express = require('express');
const app = express();
const products = require('./routes/products');

const connectDB = require('./db/connect');
require('dotenv').config();

const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const cors = require('cors');


//middlewares
app.use(cors());
app.use(express.static('./public'));
app.use(express.json());
const port = 8080;

//routes
app.use('/api/v1/products', products);

app.use(notFound);
app.use(errorHandler);

const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, ()=>{
            console.log(`Server is listening on port ${port}`);
        });
    } catch(error){
        console.log(error)
    }
}


start();
