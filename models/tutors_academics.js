const mongoose = require("mongoose")

const tutorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'please provide name']
    },
    subject:{
        type:String,
        required:[true, 'please provide subject']
    },
    std:{
        type:String,
        required:[true, 'please provide std']
    },
    description:{
        type:String,
        required:[true, 'please provide name']
    },
    location:{
        type:String,
        required:[true, 'please provide location']
    },
    start_time:{
        type:String,
        required:[true, 'please provide start_time']
    },
    end_time:{
        type:String,
        required:[true, 'please provide end_time']
    },
    photos:{
        type: String,
        required:[true, 'Please upload the image of your estate']
    },
    phone:{
        type:String,
        required:[true, 'please provide phone number of the agent']
    },
    email:{
        type:String,
        required:[true, 'please provide email of the agent']
    },
    charges:{
        type:Number,
        required:[true, 'please provide charges']
    },
    created_by:{
        type: mongoose.Schema.Types.ObjectId,
        // type: String
    }
      
})

module.exports= mongoose.model('tutor_acad_doc',tutorSchema )