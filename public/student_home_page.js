
const tutors_div = document.getElementById("recommended_tutors")
const logout = document.getElementById("logout")

// const subm= document.getElementsByClassName("subm")
// const subm= document.getElementById("subm")
const subm = document.querySelector('.subm')
const sub_act = document.querySelector('.sub_act')
const std = document.querySelector('.std')
const fees_lim = document.querySelector('.fees_lim')
const loc = document.querySelector('.location')
// const view_profile_btn = document.querySelector('.view-profile-btn')
const socket = io('http://localhost:3000')

const my_chat_link = document.querySelector('#my_chat_link')
const token = localStorage.getItem("token")

logout.addEventListener("click", ()=>{
  localStorage.removeItem('token')
  localStorage.removeItem("user")
  localStorage.removeItem("category")
  window.location.href = `/`
})

my_chat_link.addEventListener("click" , async()=>{
  if (token) {
    const {
      data: { user }
  } = await axios.get(`/display/user_profile?token=${token}`)

  const sender_id = user.userId;
  const response = await axios.get(`/api/v1/tutions/findUserProfile_student/${user.userId}`)

  const user_profile_id = response.data.user_P._id

  window.location.href = `/get_my_chats_students?user_profile_id=${user_profile_id}`;}
})



const showTutors = async () => {





  
  if (token) {
    const {
      data: { user }
  } = await axios.get(`/display/user_profile?token=${token}`);
  
  console.log("Sender: ", user.userId);
  
  const sender_id = user.userId;
  
  socket.on("connect", () => {
      socket.emit("userConnected", { user_id: sender_id });
  });

    const response = await axios.get(`/api/v1/tutions/findUserProfile_student/${user.userId}`)
    // console.log(response.data.user_P)

    const subjects = response.data.user_P.subjects_aca
    const classes = response.data.user_P.classes_aca
    var tutorsMap = []

    subjects.forEach(async (element1, index) => {
      const element2 = classes[index]
      const tutors_arr = await axios.get(`/api/v1/tutions/getTutors_aca_recommended?subject=${element1}&std=${element2}`)
      var tutors_data = tutors_arr.data.tutors
      const scrollable = document.createElement('div')
      scrollable.classList.add('scrollable')
      

      if (tutors_arr.data.tutors.length > 0) {
        
        tutors_data.forEach(element => {
          if(! tutorsMap.includes(element._id)){
            const tut1 = document.createElement('div')
            tut1.classList.add('section-child')
            tut1.innerHTML = `
            <div class="card" style="width: 18rem;">
            <img src="${element.photos}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${element.name.toUpperCase()}</h5>
              <p class="card-text">${element.subject.toUpperCase()} TUTOR | CLASS: ${element.std.toUpperCase()} |  ${element.start_time} - ${element.end_time}</p>
              <p>Rs. ${element.charges}</p>
              <a href="#" class="btn btn-primary view-profile-btn" id=${element._id} data-user_profile_id= ${element.created_by}>View Details</a>
            </div>
          </div>
        `;
            scrollable.appendChild(tut1)
            tutorsMap.push(element._id)
            
          }

        });
        // console.log("tutors map array",tutorsMap)
        tutors_div.appendChild(scrollable)
      }

    });



  }

}

subm.addEventListener("click", async (e) => {
  e.preventDefault()


  try {
    console.log(sub_act.value)

    const tutors_arr = await axios.get(`/api/v1/tutions/getTutors_aca_overall?subject=${sub_act.value}&std=${std.value}&fees=${fees_lim.value}&loc=${loc.value}`)
    const tutors_data = tutors_arr.data.tutors
    tutors_div.innerHTML = ``
    tutors_data.forEach(element => {
      const tut1 = document.createElement('div')
      tut1.classList.add('section-child')
      console.log(element.created_by)
      tut1.innerHTML = `
          <div class="card" style="width: 18rem;">
          <img src="${element.photos}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${element.name.toUpperCase()}</h5>
            <p class="card-text">${element.subject.toUpperCase()} TUTOR | CLASS: ${element.std.toUpperCase()}</p>
            
            <a href="#" class="btn btn-primary view-profile-btn" id=${element._id} data-user_profile_id= ${element.created_by} >VISIT LINK</a>
          </div>
        </div>
  
        `;



      tutors_div.appendChild(tut1)


    })




  }
  catch (error) {
    console.log(error);
  }
})


const find_tutor_profile = async (buttonId, user_profile) => {
  // window.location.href = `/get_tutor_profile/?id=${buttonId}`
  window.location.href = `/get_tutor_profile/?id=${buttonId}&user_profile_id=${user_profile}`
  
}




document.addEventListener('click', function (event) {
  if (event.target.classList.contains('view-profile-btn')) {
    const buttonId = event.target.id;
    console.log(buttonId)
    const user_profile= event.target.getAttribute('data-user_profile_id')
    find_tutor_profile(buttonId, user_profile);
    

  }
});

showTutors()