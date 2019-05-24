const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/user1503',{
    useNewUrlParser:true,
    useCreateIndex:true
})

mongoose.connection
.then(()=>console.log('DB Connected!'))
.catch(()=>console.log('DB can not connect!'))