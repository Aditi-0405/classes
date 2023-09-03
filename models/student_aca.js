const mongoose = require("mongoose")

const studentSchema  = new mongoose.Schema({
    name:{

        type: String,
        required:[true, 'please provide name']

    },
   
    subject:{
        type:String,
        required:[true, 'please provide subject']
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
    
    phone:{
        type:String,
        required:[true, 'please provide phone number of the agent']
    },
    email:{
        type:String,
        required:[true, 'please provide email of the agent']
    }, 

    created_by:{
        type: mongoose.Schema.Types.ObjectId,
        // type: String
    }
    // photos:{
    //     type: String,
    //     required:[true, 'Please upload the image of your estate']
    // },
})

module.exports= mongoose.model('student_acad_doc',studentSchema )