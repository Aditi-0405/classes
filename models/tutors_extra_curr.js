const mongoose = require("mongoose")

const tutorSchema_extra_curr  = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'please provide name']
    },
    activity:{
        type:String,
        required:[true, 'please provide activity']
    },
    std:{
        type:String,
        required:[true, 'please provide class']
    },
    description:{
        type:String,
        required:[true, 'please provide name']
    },
    location:{
        type:String,
        required:[true, 'please provide name']
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
    }
})

module.exports= mongoose.model('tutor_extarcurr_doc',tutorSchema_extra_curr )