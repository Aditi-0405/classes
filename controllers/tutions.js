const tutor_acad_doc = require('../models/tutors_academics')
const tutor_extarcurr_doc = require('../models/tutors_extra_curr')
const student_acad_doc = require('../models/student_aca')
const student_extracurr_doc = require('../models/student_extra_curr')
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const mongoose = require("mongoose")



const UserStudentSchema_doc= require('../models/user_student')
const UserTeacherSchema_doc= require('../models/user_teacher')


const { StatusCodes } = require('http-status-codes')
const Student_Profile= require('../models/student_profile')
const Teacher_Profile= require('../models/teacher_profile')

const createTutor_aca = async (req, res) => {
    const { name, subject, std, description, location, fees, start_time, end_time, phone, email, am_pm_start, am_pm_end, created_by } = req.body
    console.log(req.body)
    console.log("aaa", created_by)
    const fees_f = parseInt(fees)

    const imagePath = req.file.path
    const imagePathf = imagePath.split("public")[1]
    const start_time_f = start_time + ' ' + am_pm_start
    const end_time_f = end_time + ' ' + am_pm_end



    try {
        const newTutor = await tutor_acad_doc.create({
            name: name,
            subject: subject,
            std: std,
            description: description,
            location: location,
            charges: fees_f,
            start_time: start_time_f,
            end_time: end_time_f,
            phone: phone,
            email: email,
            photos: imagePathf,
            created_by: new mongoose.Types.ObjectId(created_by)
            // created_by: created_by

            

        })
        console.log(newTutor)
        res.status(200).json({ newTutor })

    }
    catch (error) {
        console.log(error)

    }
}
const createTutor_extracurr = async (req, res) => {

    const { name, activity, std, description, location, fees, start_time, end_time, phone, email, am_pm_start, am_pm_end } = req.body
    console.log(req.body)
    const fees_f = parseInt(fees)

    const imagePath = req.file.path
    const imagePathf = imagePath.split("public")[1]
    const start_time_f = start_time + ' ' + am_pm_start
    const end_time_f = end_time + ' ' + am_pm_end

    try {
        const newTutor = await tutor_extarcurr_doc.create({
            name: name,
            activity: activity,
            std: std,
            description: description,
            location: location,
            charges: fees_f,
            start_time: start_time_f,
            end_time: end_time_f,
            phone: phone,
            email: email,
            photos: imagePathf


        })
        console.log(newTutor)
        res.status(200).json({ newTutor })

    }
    catch (error) {
        console.log(error)

    }

}

const createStudent_aca = async (req, res) => {
    const { name,subject, std, description, location, start_time, end_time, phone, email, am_pm_start, am_pm_end,created_by } = req.body

    console.log("req.body", req.body)



    const start_time_f = start_time + ' ' + am_pm_start
    const end_time_f = end_time + ' ' + am_pm_end




    try {
        const newStudent = await student_acad_doc.create({
            name: name,

            subject: subject,
            std: std,
            description: description,
            location: location,

            start_time: start_time_f,
            end_time: end_time_f,
            phone: phone,
            email: email,
            created_by: new mongoose.Types.ObjectId(created_by)
            


        })
        console.log(newStudent)
        res.status(200).json({ newStudent })

    }
    catch (error) {
        console.log(error)

    }
}


const createStudent_extra_curr = async (req, res) => {
    const { activity, std, description, location, start_time, end_time, phone, email, am_pm_start, am_pm_end } = req.body

    console.log(req.body)



    const start_time_f = start_time + ' ' + am_pm_start
    const end_time_f = end_time + ' ' + am_pm_end




    try {
        const newStudent = await student_extracurr_doc.create({

            activity: activity,
            std: std,
            description: description,
            location: location,

            start_time: start_time_f,
            end_time: end_time_f,
            phone: phone,
            email: email,



        })
        console.log(newStudent)
        res.status(200).json({ newStudent })

    }
    catch (error) {
        console.log(error)

    }
}

const getAllTutors = async (req, res) => {
    try {
        const tutors_aca = await tutor_acad_doc.find({})
        const tutors_extra_curr = await tutor_extarcurr_doc.find({})

        res.status(200).json({ tutors_aca: tutors_aca, tutors_extra_curr: tutors_extra_curr })
    }
    catch (error) {
        console.log(error)
    }
}

const createdBy_Student_aca = async (req, res) => {
    try {
        const { student_id, subject, std } = req.query
        console.log(req.query)
        console.log(req.params.id)
        const user = await Student_Profile.find({ user_id: req.params.id })

        user[0].created_tutions_aca.push(student_id)
        user[0].subjects_aca.push(subject)
        user[0].classes_aca.push(std)
        await user[0].save();




        // console.log(estate_id)
        // console.log(user)
        res.status(200).json({ message: 'Element added to estate successfully' });
    }
    catch (error) {
        console.error('Error adding element to estate:', error);
        res.status(500).json({ message: 'Failed to add element to estate' });

    }


}

const createdBy_Student_extracurr = async (req, res) => {
    try {
        const { student_id, subject, std } = req.query
        console.log(req.params.id)
        const user = await Student_Profile.find({ user_id: req.params.id })
        console.log(user)

        user[0].created_tutions_extracurr.push(student_id)
        user[0].subjects_extracurr.push(subject)
        user[0].classes_extracurr.push(std)
        await user[0].save();




        // console.log(estate_id)
        // console.log(user)
        res.status(200).json({ message: 'Element added to estate successfully' });
    }
    catch (error) {
        console.error('Error adding element to estate:', error);
        res.status(500).json({ message: 'Failed to add element to estate' });

    }

}

const findUserProfile_Student = async(req, res)=>{
    try{
        const user = await Student_Profile.find({user_id: req.params.id})
        // console.log("hiii")
        // console.log(user)
       
        if(user){
            res.status(200).json({user_P:user[0]})
            // const a= user[0]
            // res.status(200).json({a})
        }

    }
    catch(error){
        // console.log("hi")
        console.log(error);
        res.status(500).json({message: 'Something went wrong'})

    }

}

const createdBy_Teacher_aca = async (req, res) => {
    try {
        const { teacher_id, subject, std } = req.query
        // console.log(req.query)
        // console.log(req.params.id)
        const user = await Teacher_Profile.find({ user_id: req.params.id })

        user[0].created_tutions_aca.push(teacher_id)
        user[0].subjects_aca.push(subject)
        user[0].classes_aca.push(std)
        await user[0].save();




        // console.log(estate_id)
        // console.log(user)
        res.status(200).json({ message: 'Element added to estate successfully' });
    }
    catch (error) {
        console.error('Error adding element to estate:', error);
        res.status(500).json({ message: 'Failed to add element to estate' });

    }


}

const getTutors_aca_recommended = async(req, res) =>{
    const{loc, subject, std} = req.query
    // console.log(loc)
    const queryObject ={}
    if(loc && loc != 'null' && loc !=''){
        queryObject.location = loc
    }
    if(subject && subject != 'null' && subject !=''){
        queryObject.subject = subject
    }
    if(std && std != 'null' && std !=''){
        queryObject.std = std
    }
    // console.log(queryObject)
    const tutors = await tutor_acad_doc.find(queryObject)
    res.status(200).json({tutors})



}
const getTutors_aca_overall = async(req, res) =>{
    const{subject, std, fees, loc} = req.query
    
    const queryObject ={}
    if(loc && loc != 'null' && loc !=''){
        queryObject.location = loc
    }
    if(subject && subject != 'null' && subject !=''){
        queryObject.subject = subject
    }
    if(std && std != 'null' && std !=''){
        queryObject.std = std
    }
    if(fees && fees != 'null' && fees !=''){
        const feesf = parseInt(fees)
        const fees_query = {
            $lte : feesf
        }
        queryObject.charges = fees_query
    }
    console.log(queryObject)
    const tutors = await tutor_acad_doc.find(queryObject)
    // console.log(tutors)
    res.status(200).json({tutors})


}

const findUserProfile_teacher = async(req, res)=>{
    try{
        const user = await Teacher_Profile.find({user_id: req.params.id})
       
        if(user){
            res.status(200).json({user_P:user[0]})
            // const a= user[0]
            // res.status(200).json({a})
        }

    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Something went wrong'})

    }

}

const getStudents_aca_recommended = async(req, res) =>{
    const{loc, subject, std} = req.query
    // console.log(loc)
    const queryObject ={}
    if(loc && loc != 'null' && loc !=''){
        queryObject.location = loc
    }
    if(subject && subject != 'null' && subject !=''){
        queryObject.subject = subject
    }
    if(std && std != 'null' && std !=''){
        queryObject.std = std
    }
    console.log(queryObject)
    const students = await student_acad_doc.find(queryObject)
    res.status(200).json({students})



}

const fetch_chats_teachers = async(req, res) => {

    const {teacher_id} = req.query
    const tutorUser = await Teacher_Profile.find({
        _id: teacher_id});

res.status(200). json({user:tutorUser[0] })
    
}


const fetch_chats_students = async(req, res) => {

    const {student_id} = req.query
    const studentUser = await Student_Profile.find({
        _id: student_id});
        // console.log("student user[0]",studentUser[0])
      
res.status(200). json({user:studentUser[0] })
    
}
module.exports = { createTutor_aca, createTutor_extracurr, createStudent_aca, createStudent_extra_curr, 
    getAllTutors,createdBy_Student_aca,createdBy_Student_extracurr,findUserProfile_Student,createdBy_Teacher_aca,
    getTutors_aca_recommended,getTutors_aca_overall,findUserProfile_teacher,getStudents_aca_recommended,fetch_chats_teachers ,fetch_chats_students }
    
    