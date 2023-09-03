const form_sub = document.getElementById("form_sub_give_aca")

const name = document.getElementById("name")
const subject = document.getElementById("subject")
const std = document.getElementById("class")
const description = document.getElementById("description")
const loc = document.getElementById("location")
const fees = document.getElementById("fees")
const start_time = document.getElementById("start_time")
const end_time = document.getElementById("end_time")
const am_pm_start = document.getElementById("am_pm_start")
const am_pm_end = document.getElementById("am_pm_end")
const phone = document.getElementById("phone")
const email = document.getElementById("email")




const token = localStorage.getItem("token")

form_sub.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        

        var data

        if(token){
            const {
                data: { user }
            } = await axios.get(`/display/user_profile?token=${token}`)
            data = await axios.get(`/api/v1/tutions/findUserProfile_teacher/${user.userId}`)
            console.log("data:  ", data.data.user_P._id)

        }

        
        const formData = new FormData(form_sub);
        // console.log(data.data._id)
        formData.append('created_by',  data.data.user_P._id);
        

      

        
        
        const response = await axios.post('/api/v1/tutions/create_tut_aca', formData)
        const teacher_id = response.data.newTutor._id
        const subject = response.data.newTutor.subject
        const std = response.data.newTutor.std
        if (token) {
            const {
                data: { user }
            } = await axios.get(`/display/user_profile?token=${token}`)
            const { data } = await axios.post(`/api/v1/tutions/update/createdBy_teacher_aca/${user.userId}?teacher_id=${teacher_id}&subject=${subject}&std=${std}`)
            window.location.href='/'

        }

    }
    catch (error) {
        console.log(error);
    }
})






