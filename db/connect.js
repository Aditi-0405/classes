const mongoose = require("mongoose")

const connectDb = (MONGO_URI) =>{
    return mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
}

module.exports = connectDb