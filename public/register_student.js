
const log_but= document.getElementById("login_sub")
const registration_but= document.getElementById("registration_sub")





const name_reg= document.getElementById("name_reg")
const email_reg= document.getElementById("email_reg")
const password_reg= document.getElementById("password_reg")
const form_reg= document.getElementById("form_reg")


// const userholder=document.getElementById('username4')
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

form_reg.addEventListener("submit", async (e)=>{
    e.preventDefault()
    const name= name_reg.value

    const email= email_reg.value
    const password= password_reg.value

    try{
        const{data}= await axios.post('/api/v1/auth/register/student', {name, email, password})
        console.log(data)
        
        window.location.href = `/`

    }
    catch(error){
        console.log(error)
    }




})