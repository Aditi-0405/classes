const urlParams = new URLSearchParams(window.location.search);
var receiver_id = urlParams.get('user_profile_id');
console.log("Receiver: ", receiver_id)
const token = localStorage.getItem("token")
const user = localStorage.getItem("user")
// const display_sender = async () => {
//   const token = localStorage.getItem("token")
//   if (token) {
//     const {
//       data: { user }
//     } = await axios.get(`/display/user_profile?token=${token}`)
//     console.log("Sender: ", user.userId)
//   }}
// display_sender()

const socket = io('http://localhost:3000')

var messages = document.getElementById("messages");


(async function () {

  


    const token = localStorage.getItem("token")
    var sender_id
    if (token) {
      const {
          data: { user }
      } = await axios.get(`/display/user_profile?token=${token}`);
      
  
      
      // sender_id = user.userId;

      const response = await axios.get(`/api/v1/tutions/findUserProfile_student/${user.userId}`)

      sender_id= response.data.user_P._id

      console.log("Sender: ", sender_id);
      
      socket.on("connect", () => {
          socket.emit("userConnected", { user_id: sender_id });
      });
  }




  



  $("form").submit(function (e) {
    let li = document.createElement("li");
    e.preventDefault(); // prevents page reloading
    // socket.emit("chat_message", $("#message").val());
    var message = $("#message").val();
    var temp
    

    // socket.emit("received_message", (user_id, $("#message").val()))
    // console.log($("#message").val())
   
    socket.emit('received_message', { receiver_id, message ,sender_id});



    
    temp = receiver_id
    receiver_id=sender_id
    sender_id= temp
  
    message = "you: "+ $("#message").val();
  
    socket.emit('received_message_for_student', { receiver_id, message, sender_id, name:user });

    temp = receiver_id
    receiver_id=sender_id
    sender_id= temp

    messages.appendChild(li).append($("#message").val());
    let span = document.createElement("span");
    messages.appendChild(span).append("by " + "Anonymous" + ": " + "just now");

    $("#message").val("");

    return false;
  });

  socket.on("received", data => {
    let li = document.createElement("li");
    let span = document.createElement("span");
    var messages = document.getElementById("messages");
    messages.appendChild(li).append(data.message);
    messages.appendChild(span).append("by " + "anonymoussssees" + ": " + "just now");
    console.log("Hello bingo!");
  });

  socket.on("message", data =>{
    console.log(data.message)
  })
})();
// ReactDOM.render(<h1>Hello World</h1> , document.getElementById("testing"))



