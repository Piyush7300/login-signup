const mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost:27017/data',).then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);

})

var conn = mongoose.connection
conn.on('connected', function () {
  console.log('Database connected')
})
conn.on('disconnected', function () {
  console.log('MongoDB disconnected ')
})
conn.on('error', console.error.bind(console))
module.exports = {conn,mongoose};