// to connect the database to express

const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/auditionsData",{
    // To prevent deprication warnings

    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log(`Connection successful`)
}).catch((e)=>{
    console.log(`Connection unsuccessful`)
    console.log(e)
})