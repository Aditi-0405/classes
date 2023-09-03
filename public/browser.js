
// const socket = io('http://localhost:3000')

const  category = localStorage.getItem("category")
console.log(category)

if(category == "student"){
  window.location.href = `/student/home_page`

}
else if(category == "teacher" ){
  window.location.href = `/teacher/home_page`

}


const showTutors = async () => {

  const token = localStorage.getItem("token")
  var sender_id
  if (token) {
    const {
        data: { user }
    } = await axios.get(`/display/user_profile?token=${token}`);
    
    console.log("Sender: ", user.userId);
    
    const sender_id = user.userId;
    
    // socket.on("connect", () => {
    //     socket.emit("userConnected", { user_id: sender_id });
    // });
    
}
    const tutors = await axios.get('/api/v1/tutions/getAllTutors')
    console.log(tutors.data)
}
showTutors()








  // socket.on("received", data => {
  //   let li = document.createElement("li");
  //   let span = document.createElement("span");
  //   var messages = document.getElementById("messages");
  //   messages.appendChild(li).append(data.message);
  //   messages.appendChild(span).append("by " + "anonymoussssseee" + ": " + "just now");
  //   console.log("Hello bingo!");
  // });



  


  

