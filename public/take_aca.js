
const form_sub = document.getElementById("form_sub_take_aca")

// form_sub.addEventListener("submit" , async(event) => {
//     event.preventDefault();

//     const token = localStorage.getItem('token');
//     try{
//         const formData = new FormData(form_sub);
   
      
//        const response = await axios.post('/api/v1/tutions/create_student_academics', formData)
//        const student_id=response.data.newStudent._id
//        const subject=response.data.newStudent.subject
//        const std=response.data.newStudent.std


//        console.log(student_id)
       
       
       
         
//        var t = localStorage.getItem('token');
//        if(t){
//          const {
//            data: { user },
//          } = await axios.get(`/display/user_profile?token=${t}`)
       
//          const {data}=await axios.post(`/api/v1/tutions/update/createdBy_Student_aca/${user.userId}?student_id=${student_id}&subject=${subject}&std=${std}`)
//          console.log(data)


       
//        }
       


//     }
//     catch(error){
//         console.log(error);
//     }
// })





const token = localStorage.getItem("token")

form_sub.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        

        var data

        if(token){
            const {
                data: { user }
            } = await axios.get(`/display/user_profile?token=${token}`)
            data = await axios.get(`/api/v1/tutions/findUserProfile_student/${user.userId}`)
            console.log("data:  ", data.data.user_P._id)

        }

        
        const formData = new FormData(form_sub);
        // console.log(data.data._id)
        formData.append('created_by',  data.data.user_P._id);
        

      

        
        
        const response = await axios.post('/api/v1/tutions/create_student_academics', formData)
        const student_id = response.data.newStudent._id
        const subject = response.data.newStudent.subject
        const std = response.data.newStudent.std
        if (token) {
            const {
                data: { user }
            } = await axios.get(`/display/user_profile?token=${token}`)
            const { data } = await axios.post(`/api/v1/tutions/update/createdBy_Student_aca/${user.userId}?student_id=${student_id}&subject=${subject}&std=${std}`)
            window.location.href='/'

        }

    }
    catch (error) {
        console.log(error);
    }
})



