const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// initialize app
const app = express();

// define middleware
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use(cors());

//config database 
const mongodbURI = "mongodb+srv://mustafa:contactpassword@cluster0.tpo90.mongodb.net/coWorker?retryWrites=true&w=majority"
mongoose.connect(mongodbURI, {useNewUrlParser: true,useUnifiedTopology: true});

// const require routes
const user = require('./routes/user');
const place = require('./routes/place');


// load routes
app.use('/api/user', user);
app.use('/api/place', place);

// test app
app.get('/',(req,res)=>{
    res.send({home:"Welcome to home page"})
});


// run express app
app.listen(5000,()=>{
    console.log("Sever is running")
});
