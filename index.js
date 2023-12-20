const bodyParser = require ('body-parser');
const express = require ('express');
const cors = require ('cors');
const mongoose = require ('mongoose');
const dotenv = require('dotenv');
const productRouter = require('./routes/productRoute');
const uploadRouter = require('./routes/uploadRoutes');
const port = process.env.PORT || 8000;

dotenv.config();
const app = express();

app.use(cors())
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

app.use('/api/product', productRouter);
app.use('/api/upload', uploadRouter);


mongoose.connect(process.env.MONGODB_URI).then(()=>{
    try {
        console.log('DATABASE CONNECTED');
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(port, ()=>{
    console.log(`SERVER RUNNING ON PORT ${port}`);
})