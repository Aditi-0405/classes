const email_log= document.getElementById("email_log")
const password_log= document.getElementById("password_log")
const form_log= document.getElementById("form_log")


// const userholder=document.getElementById('username3')
// var u = localStorage.getItem('user');
// if(u){
//   userholder.innerHTML=u
//   }


//   userholder.addEventListener("click", async function(){
//     var t = localStorage.getItem('token');
//     if(t){
//     const {
//       data: { user },
//     } = await axios.get(`/display/user_profile?token=${t}`)
//     console.log(user)
  
//     window.location.href = `/display/user_profilee?id=${user.userId}&name=${user.name}`
  
  
  
//   }
  
  
//   })

form_log.addEventListener("submit" , async(e)=>{
    e.preventDefault()
    const email= email_log.value
    const password= password_log.value
    try{
        const{data}= await axios.post('/api/v1/auth/login/teacher', { email, password})
        // console.log({data})
        if(data.user){
       
        console.log(data.user.name)
        email_log.value=''
        password_log.value=''
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', data.user.name)
        localStorage.setItem('category', "teacher")
        window.location.href = `/teacher/home_page`

    }
       else if(data.msg){

            console.log(data.msg)
        }
       
    }
    catch(error){
        console.log(error)
    }

})