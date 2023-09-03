


const UserStudentSchema_doc= require('../models/user_student')
const UserTeacherSchema_doc= require('../models/user_teacher')


const { StatusCodes } = require('http-status-codes')
const Student_Profile= require('../models/student_profile')
const Teacher_Profile= require('../models/teacher_profile')



//




const register_student = async (req, res) =>{
    try{
    // console.log(req.body)
    const user= await UserStudentSchema_doc.create({...req.body})
    const user_profile= await Student_Profile.create({name:user.name, email: user.email, user_id: user._id})
    console.log(user_profile)
    res.status(200).json({msg: "User successfully registered", user})}
    
    catch(error){
        console.log(error)
        res.status(500).json({msg: "Registration failed"})

    }
}
const register_teacher = async (req, res) =>{
    try{
    // console.log(req.body)
    const user= await UserTeacherSchema_doc.create({...req.body})
    const user_profile= await Teacher_Profile.create({name:user.name, email: user.email, user_id: user._id})
    console.log(user_profile)
    res.status(200).json({msg: "User successfully registered", user})}
    
    catch(error){
        console.log(error)
        res.status(500).json({msg: "Registration failed"})

    }
}

const login_student= async (req, res)=>{
    try{
    const{email, password}= req.body
    if(!email || !password){
        res.json('please provide email and password')
    }
    const user= await UserStudentSchema_doc.findOne({email})
    if(!user){
        res.status(404).json({msg:"Invalid credentials"})
    }
    
    const isPasswordCorrect= await user.comparePassword(password)
    if(! isPasswordCorrect){
        res.json({msg: "Invalid credentials"})
    }
    else{
    const token= user.createJWT()
    res.status(StatusCodes.OK).json({user:{name: user.name}, token, })} 

    }
    catch(error){
        console.log(error)
    }

}


const login_teacher= async (req, res)=>{
    try{
    const{email, password}= req.body
    if(!email || !password){
        res.json('please provide email and password')
    }
    const user= await UserTeacherSchema_doc.findOne({email})
    if(!user){
        res.status(404).json({msg:"Invalid credentials"})
    }
    
    const isPasswordCorrect= await user.comparePassword(password)
    if(! isPasswordCorrect){
        res.json({msg: "Invalid credentials"})
    }
    else{
    const token= user.createJWT()
    res.status(StatusCodes.OK).json({user:{name: user.name}, token})} 

    }
    catch(error){
        console.log(error)
    }

}


module.exports={register_teacher,register_student, login_student, login_teacher}