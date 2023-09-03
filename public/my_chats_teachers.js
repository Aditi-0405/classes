

const token = localStorage.getItem("token")
const chat_list = document.getElementById("chat_list")
var messages = document.getElementById("messages");


const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];



const display_chats = async () => {

  if (token) {
    const {
      data: { user }
    } = await axios.get(`/display/user_profile?token=${token}`)

    // const sender_id = user.userId;
    const response = await axios.get(`/api/v1/tutions/findUserProfile_teacher/${user.userId}`)

    const user_id = response.data.user_P._id


    const response1 = await axios.get(`/api/v1/tutions/fetch_chats_teachers?teacher_id=${user_id}`)

    // console.log("response chats: ", response1)




    const response_chats = response1.data.user
    console.log("response chats",response_chats)

    chat_list.innerHTML = ``
    const header = document.createElement('div')
    header.innerHTML = `<h1 class ="header_chats">Chats</h1>`
    chat_list.appendChild(header)
    

    response_chats.chat.forEach((item) => {
      item.messages[0].updatedAt = new Date(item.messages[0].updatedAt);
  });

    // response_chats.chat.sort((a,b) => a.name.length - b.name.length);
    // response_chats.chat.sort((a,b) => a.messages[0].message.length - b.messages[0].message.length);
    response_chats.chat.sort((a,b) => b.messages[0].updatedAt - a.messages[0].updatedAt);
     

    console.log("sorted response chats", response_chats.chat)


    response_chats.chat.forEach(element => {



      const sender = document.createElement('div')
      sender.classList.add('section-child')
      const last_message = element.messages[element.messages.length - 1].message[(element.messages[element.messages.length - 1].message).length -1]
      console.log("last_message",last_message)

      

      const date1 = last_message.createdAt

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

      
      sender.innerHTML = `<a href= "/see_individual_chat?from=${element.senderId}&to=${user_id}" class= "link">




      
        <div class="name_time">
        <div class ="name">${element.name}</div>
        <div class="timing">${timings}</div>
        
        
        </div>

        
        
        
        <div class="last_message_1">${last_message.text}</div>
        
      </a>`

      chat_list.appendChild(sender)





    });


  }


}

display_chats()



