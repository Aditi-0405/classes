const mongoose = require("mongoose")

const studentSchema  = new mongoose.Schema({
   
    activity:{
        type:String,
        required:[true, 'please provide activity']
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
    
    phone:{
        type:String,
        required:[true, 'please provide phone number of the agent']
    },
    email:{
        type:String,
        required:[true, 'please provide email of the agent']
    },
    created_by:{
        type: mongoose.Schema.Types.ObjectId
    }
})

module.exports= mongoose.model('student_extracurr_doc',studentSchema )