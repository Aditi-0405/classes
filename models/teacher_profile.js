const mongoose= require("mongoose")
const bcrypt= require("bcryptjs")
const jwt= require("jsonwebtoken")


const Teacher_ProfileSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'please provide name']
    },
    email:{
        type:String,
        required:[true, 'please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
          unique: true,
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId
    },
    created_tutions_aca:[{type: mongoose.Schema.Types.ObjectId}],
    subjects_aca:[{type: String}],
    classes_aca:[{type:String}],
    created_tutions_extracurr:[{type: mongoose.Schema.Types.ObjectId}],
    subjects_extracurr:[{type: String}],
    classes_extracurr:[{type:String}],
    chat: [{
        senderId: {
          type: mongoose.Schema.Types.ObjectId,
         
          
        },
        name:{
          type: String
        },
        messages: [{
          message:[{
            text:{type: String},
            createdAt:{
              type: Date,
              default: Date.now
            }
          }],
          createdAt:{
            type: Date,
            default: Date.now,
          },
          updatedAt: {
            type: Date,
            default: Date.now,
          },
        

        }]
      }]

    
})
Teacher_ProfileSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});


module.exports= mongoose.model('Teacher_Profile' , Teacher_ProfileSchema)