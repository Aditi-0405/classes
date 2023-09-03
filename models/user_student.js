const mongoose= require("mongoose")
const bcrypt= require("bcryptjs")
const jwt= require("jsonwebtoken")

const UserStudentSchema= new mongoose.Schema({
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
    password:{
        type:String,
        required:[true, 'please provide password']
    }
})
UserStudentSchema.pre('save', async function(){
    const salt= await bcrypt.genSalt(10)
    this.password= await bcrypt.hash(this.password, salt)

})
UserStudentSchema.methods.createJWT= function (){
    return jwt.sign(
        {userId: this._id, name: this.name},
        "jwtsecret",{expiresIn:'1d'}
    )
}
UserStudentSchema.methods.comparePassword = async function (userPassword){
    const isMatch= await bcrypt.compare(userPassword, this.password)
    return isMatch

}

module.exports= mongoose.model('UserStudentSchema_doc' , UserStudentSchema)