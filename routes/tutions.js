
// handling the photo upload using multer

const multer = require('multer')


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, './public/images')

    },
    filename: function (req, file, cb){
        return cb(null, `${Date.now()}- ${file.originalname}`)

    }
})

const upload= multer({storage: storage})


const express = require("express")
const router= express.Router()

const{createTutor_aca, createTutor_extracurr,createStudent_aca,createStudent_extra_curr,
    getAllTutors,createdBy_Student_aca,
    createdBy_Student_extracurr,findUserProfile_Student,createdBy_Teacher_aca,getTutors_aca_recommended,
    findUserProfile_teacher,getStudents_aca_recommended,
    getTutors_aca_overall,fetch_chats_teachers,fetch_chats_students } = require('../controllers/tutions')
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
router.route('/create_tut_aca').post(upload.single('photo') , createTutor_aca)
router.route('/create_tut_extra_curr').post(upload.single('photo') , createTutor_extracurr)
router.route('/create_student_academics').post(upload.none(),createStudent_aca)
router.route('/create_student_extra_curr').post(upload.none(),createStudent_extra_curr)
router.route('/getAllTutors').get(getAllTutors)

router.route('/update/createdBy_Student_aca/:id').post(createdBy_Student_aca)
router.route('/update/createdByStudent_extracurr_/:id').post(createdBy_Student_extracurr)
router.route('/findUserProfile_student/:id').get(findUserProfile_Student)
router.route('/update/createdBy_teacher_aca/:id').post(createdBy_Teacher_aca)
router.route('/getTutors_aca_recommended').get(getTutors_aca_recommended)
router.route('/findUserProfile_teacher/:id').get(findUserProfile_teacher)
router.route('/getStudents_aca_recommended').get(getStudents_aca_recommended)
router.route('/getTutors_aca_overall').get(getTutors_aca_overall)
router.route('/fetch_chats_teachers').get(fetch_chats_teachers)
router.route('/fetch_chats_students').get(fetch_chats_students)



module.exports= router





