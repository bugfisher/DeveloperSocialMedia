const express = require('express');
const app = express();
const connectDB = require('./config/db');


//connect database
connectDB();

//Init middleware 
app.use(express.json({extended:false}));

app.get('/',(req,res)=>{res.send('API RUNNING')});

//Define routes

app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/profile',require('./routes/api/profile'));


const port = process.env.port || 5000 ;
app.listen(port,()=>{console.log(`Server started on port ${port}`)});

