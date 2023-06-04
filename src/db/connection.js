// to connect the database to express
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL,{
    // To prevent deprication warnings

    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log(`Connection successful`)
}).catch((e)=>{
    console.log(`Connection unsuccessful`)
    console.log(e)
})