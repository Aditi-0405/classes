const container = document.getElementById("container")

const chat_window = document.getElementById("chat-window")

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString);
var sender_id = urlParams.get("from");
var receiver_id = urlParams.get("to");
var messages = document.getElementById("messages");
const title = document.getElementById("title")


const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];


const socket = io('http://localhost:3000')


const token = localStorage.getItem("token")
const chat_list = document.getElementById("chat_list")


function scrollToBottom() {
  
  messages.scrollTop = messages.scrollHeight;
}



$("form").submit(async function (e) {
  display_chats()
  var temp


  let li = document.createElement("li");
  e.preventDefault(); // prevents page reloading
  // socket.emit("chat_message", $("#message").val());

  var message = "you: " + $("#message").val();

  socket.emit('received_message_for_student', { receiver_id, message, sender_id });



  temp = receiver_id
  receiver_id=sender_id
  sender_id= temp

  message = $("#message").val();

  socket.emit('received_message', { receiver_id, message, sender_id });
  temp = receiver_id
  receiver_id=sender_id
  sender_id= temp




  // socket.emit("received_message", (user_id, $("#message").val()))
  console.log($("#message").val())

  // socket.emit('received_message', { receiver_id, message, sender_id });
  const my_message = document.createElement("div")
  my_message.innerHTML = `${message}`

  // messages.appendChild(li).append(my_message);
  let span = document.createElement("span");
  // messages.appendChild(my_message);

  $("#message").val("");

  return false;
});


const display_chats = async () => {


  if (token) {
    const {
      data: { user }
    } = await axios.get(`/display/user_profile?token=${token}`)



    // const sender_id = user.userId;
    const response = await axios.get(`/api/v1/tutions/findUserProfile_student/${user.userId}`)

    const user_id = response.data.user_P._id


    const response1 = await axios.get(`/api/v1/tutions/fetch_chats_students?student_id=${user_id}`)

    // console.log("response chats: ", response1)

    const response_chats = response1.data.user

    console.log("response chats", response_chats)

    // console.log(response_chats.chat)

    container.innerHTML = ``
    messages.innerHTML = ``
    //   const recipientChat = receiverUser[0].chat.find(conversation => conversation.senderId.equals(sender_id));

    const response_chats_required = response_chats.chat.find(conversation => conversation.senderId === (sender_id))









    if (response_chats_required) {

      title.innerHTML = `
      <a href="#" class="head"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person"
      viewBox="0 0 16 16">
      <path
          d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
  </svg></a>
      
      <span class="sender_name">${response_chats_required.name}</span>
      
      
  `






      let li = document.createElement("li");

      response_chats_required.messages.forEach(element => {


        // messages.appendChild(span).append("by " + "Anonymous" + ": " + "just now");


        // messages.appendChild(li).append(element);
        element.message.forEach(element1 => {
          const date1 = element1.createdAt

          const date = new Date(date1)
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const amOrPm = hours >= 12 ? 'PM' : 'AM';
      
          // Convert hours from 24-hour format to 12-hour format
          const formattedHours = hours % 12 || 12;
      
          // Ensure minutes are displayed with two digits (e.g., 05 instead of 5)
          const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
          const timings = `${formattedHours}:${formattedMinutes} ${amOrPm}`
      
          console.log(timings);
      
      
          const day = date.getDate(); // Get the day (1-31)
          const month = date.getMonth() + 1
          console.log(day, " ", months[month - 1])
          const day_month = day + " " + months[month - 1] + " ";
      
          console.log(timings);
          




          const chat = document.createElement('div')

          chat.classList.add('chat-child')

          // chat.innerHTML = `${element1}<span class="timing">${timings}</span>`;
          chat.innerHTML =`<div class="mess">${element1.text}</div>
                          <div class="timing">${timings}</div>
          
          `


          messages.appendChild(chat)

        })

      });
    }


  }

  scrollToBottom()

}

display_chats()



