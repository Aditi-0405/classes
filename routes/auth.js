
const express= require("express")
const router= express.Router()

const{register_teacher,register_student, login_student, login_teacher} = require('../controllers/auth')


router.route('/login/student').post(login_student)
router.route('/register/student').post(register_student)
router.route('/login/teacher').post(login_teacher)
router.route('/register/teacher').post(register_teacher)





module.exports= router