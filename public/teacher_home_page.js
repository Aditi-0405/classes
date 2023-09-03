
const students_div = document.getElementById("recommended_students")


const my_chat_link = document.querySelector('#my_chat_link')
const token = localStorage.getItem("token")

const logout = document.getElementById("logout")



logout.addEventListener("click", () => {
  localStorage.removeItem('token')
  localStorage.removeItem("user")
  localStorage.removeItem("category")
  window.location.href = `/`
})
my_chat_link.addEventListener("click", async () => {
  if (token) {
    const {
      data: { user }
    } = await axios.get(`/display/user_profile?token=${token}`)

    const sender_id = user.userId;
    const response = await axios.get(`/api/v1/tutions/findUserProfile_teacher/${user.userId}`)

    const user_profile_id = response.data.user_P._id

    window.location.href = `/get_my_chats_teachers?user_profile_id=${user_profile_id}`;
  }
})

const showStudents = async () => {


  const token = localStorage.getItem("token")
  if (token) {
    const {
      data: { user }
    } = await axios.get(`/display/user_profile?token=${token}`)
    console.log(user)

    const response = await axios.get(`/api/v1/tutions/findUserProfile_teacher/${user.userId}`)
    console.log(response.data.user_P)

    const subjects = response.data.user_P.subjects_aca
    const classes = response.data.user_P.classes_aca


    subjects.forEach(async (element1, index) => {
      const element2 = classes[index]


      const students_arr = await axios.get(`/api/v1/tutions/getStudents_aca_recommended?subject=${element1}&std=${element2}`)
      var students_data = students_arr.data.students
      console.log("students data", students_data)
      // console.log(students_arr.data.students)
      if (students_arr.data.students.length > 0) {
        const left_arrow = document.createElement('div')
        left_arrow.classList.add('arrow')
        left_arrow.classList.add('left-arrow')
        left_arrow.innerHTML = `<`
        // students_div.appendChild(left_arrow)


        const scrollable = document.createElement('div')
        scrollable.classList.add('scrollable')
        students_data.forEach(element => {
          console.log("element", element)
          const stud1 = document.createElement('div')
          stud1.classList.add('section-child')
          stud1.innerHTML = `
          <div class="card" style="width: 18rem;">
         
          <div class="card-body">
            <h5 class="card-title">${element.name.toUpperCase()}</h5>
            <p class="card-text">${element.subject.toUpperCase()} TUTOR | CLASS: ${element.std.toUpperCase()}</p>
            
            <a href="#" class="btn btn-primary view-profile-btn" id=${element._id} data-user_profile_id= ${element.created_by} >View Details</a>
          </div>
        </div>
  
        `;
          scrollable.appendChild(stud1)

        });
        students_div.appendChild(scrollable)
        const right_arrow = document.createElement('div')
        right_arrow.classList.add('arrow')
        right_arrow.classList.add('right-arrow')
        right_arrow.innerHTML = `>`
        // students_div.appendChild(right_arrow)


      }

    });



  }

}




const find_tutor_profile = async (buttonId, user_profile) => {
  // window.location.href = `/get_tutor_profile/?id=${buttonId}`
  window.location.href = `/get_student_profile/?id=${buttonId}&user_profile_id=${user_profile}`

}





document.addEventListener('click', function (event) {
  if (event.target.classList.contains('view-profile-btn')) {
    const buttonId = event.target.id;
    console.log(buttonId)
    const user_profile = event.target.getAttribute('data-user_profile_id')
    console.log(buttonId, user_profile)
    find_tutor_profile(buttonId, user_profile);


  }
});

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('arrow')) {
    if (event.target.classList.contains('left-arrow')) {
      const scrollable = document.querySelector('.scrollable');
      let scrollPosition = 0;
      var direction = -1;
      scrollPosition += direction * 120; // Adjust this value based on item width and spacing
      scrollPosition = Math.min(0, Math.max(-(students_div.offsetWidth - students_div.offsetWidth), scrollPosition));
      students_div.style.transform = `translateX(${scrollPosition}px)`;
      // students_div.scrollLeft = Math.abs(scrollPosition);

    }
    else {
      var direction = 1;
      const scrollable = document.querySelector('.scrollable');
      let scrollPosition = 0;

      scrollPosition += direction * 120; // Adjust this value based on item width and spacing
      scrollPosition = Math.min(0, Math.max(-(students_div.offsetWidth - students_div.offsetWidth), scrollPosition));
      students_div.style.transform = `translateX(${scrollPosition}px)`;
      // students_div.style.transform = `translateX(${scrollPosition}px)`;
    }


  }
});

// const scrollable = document.querySelector('.scrollable');
// let scrollPosition = 0;

// function scrollItems(direction) {
//     scrollPosition += direction * 120; // Adjust this value based on item width and spacing
//     scrollPosition = Math.min(0, Math.max(-(scrollable.offsetWidth - students_div.offsetWidth), scrollPosition));
//     scrollable.style.transform = `translateX(${scrollPosition}px)`;
// }




showStudents()