const express = require("express")
const app = express()

const http = require("http");


const server = http.createServer(app);

const path = require('path')
const tutionRouter = require('./routes/tutions')
const authRouter = require('./routes/auth')
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken")
const Student_Profile = require('./models/student_profile')
const Teacher_Profile = require('./models/teacher_profile')



//all parsers
// var jsonParser = bodyParser.json();
// app.use(bodyParser.urlencoded({ extended: true })); app.use(bodyParser.json());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));



const io = require("socket.io")(server)

const userSocketMap = {}



io.on("connection", (socket) => {
    console.log("user connected");
    console.log(socket.id)


    socket.on("userConnected", ({ user_id }) => {
        console.log("User connected with user_id:", user_id);
        userSocketMap[user_id] = socket.id
        console.log(userSocketMap)
        // You can store this user_id or perform any other actions you need
    });




    // const user = socket.handshake.query.user;
    // console.log(socket.handshake.query)



    // console.log("userSocketMap",userSocketMap)

    socket.on("received_message", async (data) => {

        // console.log("haaan bhaiiii")
        const receiver_id = data.receiver_id
        const sender_id = data.sender_id
        console.log("receiver id", receiver_id)
        const receiverUser = await Teacher_Profile.find({
            _id: receiver_id
        });
        console.log("receiver user", receiverUser[0])



        //  const SenderUser = await Student_Profile.find({
        //     _id: sender_id});
        // console.log("sender user",SenderUser[0])


        // console.log(data.user_id, ": ", data.message)
        // console.log(userSocketMap)
        console.log("sender_id", data.sender_id)
        const message = data.message
        const name = data.name
        io.to(userSocketMap[data.receiver_id]).emit('message', { message });

        if (receiverUser[0]) {
            const recipientChat = receiverUser[0].chat.find(conversation => conversation.senderId.equals(sender_id));
            if (recipientChat) {
                // recipientChat.messages[0].message.push(message);
                recipientChat.messages[0].message.push({text: message});
                recipientChat.messages[0].updatedAt = Date.now()

            } else {
                // receiverUser[0].chat.push({ senderId: sender_id, name: name, messages: [{ message: message }] });
                receiverUser[0].chat.push({ senderId: sender_id, name: name, messages: [{ message: [{text: message }] }] });
            }
            
            await receiverUser[0].save();

        }






        // if(SenderUser[0]){
        //     const senderChat = SenderUser[0].chat.find(conversation => conversation.senderId.equals(sender_id));
        //     if (senderChat) {
        //       senderChat.messages.push(message);
        //     } else {
        //         SenderUser[0].chat.push({ senderId: sender_id, messages: [message] });
        //     }
        //     await SenderUser[0].save();
        // }

    });

    socket.on("received_message_for_student", async (data) => {

        // console.log("haaan bhaiiii")
        const receiver_id = data.receiver_id
        const sender_id = data.sender_id
        console.log("receiver id", receiver_id)
        const receiverUser = await Student_Profile.find({
            _id: receiver_id
        });
        // console.log("receiver user[0]", receiverUser[0])

        console.log("sender_id", data.sender_id)
        const message = data.message
        const name = data.name
        io.to(userSocketMap[data.receiver_id]).emit('message', { message });

        if (receiverUser[0]) {
            const recipientChat = receiverUser[0].chat.find(conversation => conversation.senderId.equals(sender_id));
            if (recipientChat) {
                // recipientChat.messages[0].message.push(message);
                recipientChat.messages[0].message.push({text: message});
                recipientChat.messages[0].updatedAt = Date.now()

            } else {
                // receiverUser[0].chat.push({ senderId: sender_id, name: name, messages: [{ message: message }] });
                receiverUser[0].chat.push({ senderId: sender_id, name: name, messages: [{ message: [{text: message }] }] });
            }
            
            await receiverUser[0].save();

        }

        

    });




    // Listen for chat_message event from the client
    socket.on("chat_message", (msg) => {
        // console.log("message: " + msg);

        // Broadcast the received message to all clients except the sender
        // socket.broadcast.emit("received", { message: msg });
        socket.emit("received", { message: msg });
    });

    // Listen for disconnect event
    socket.on("disconnect", () => {
        console.log("Disconnected");
    });
});











// for connecting to the database
const connectDb = require("./db/connect")

//want to access environment variables (MONGO_URI)
require('dotenv').config();


//required for using the static files
app.use(express.static('./public'))

//setting default view engine as ejs
app.set("view engine", "ejs")
app.set("views", path.resolve("./public/views"))

app.get('/', (req, res) => {
    res.render("homepage")
})

app.get('/take_tutions/academics', (req, res) => {
    res.render("take_academics")
})
app.get('/take_tutions/extra-curricular', (req, res) => {
    res.render("take_extra_curr")
})
app.get('/give_tutions/academics', (req, res) => {
    res.render("give_academics")
})
app.get('/give_tutions/extra-curricular', (req, res) => {
    res.render("give_extra_curr")
})
app.get('/login/student', (req, res) => {
    res.render("login_student")
})
app.get('/login/teacher', (req, res) => {
    res.render("login_teacher")
})
app.get('/register/student', (req, res) => {
    res.render("register_student")
})
app.get('/register/teacher', (req, res) => {
    res.render("register_teacher")
})
app.get('/student/home_page', (req, res) => {
    res.render("student_home_page")
})
app.get('/teacher/home_page', (req, res) => {
    res.render("teacher_home_page")
})
app.get('/get_my_chats_students', (req, res) => {
    res.render("my_chats_students")
})
app.get('/get_my_chats_teachers', (req, res) => {
    res.render("my_chats_teachers")
})
app.get('/display/user_profile', (req, res) => {
    const { token } = req.query


    const payload = jwt.verify(token, "jwtsecret")
    try {
        user = { userId: payload.userId, name: payload.name }
        res.status(200).json({ user })
    }
    catch (error) {
        console.log("error")
        res.status(400).json({ mag: "Authentication invalid" })
    }


})
app.get('/get_tutor_profile', (req, res) => {
    res.render("tutor_profile")
})

app.get('/get_student_profile', (req, res) => {
    res.render("student_profile")
})

app.get('/see_individual_chat', (req, res) => {
    res.render("personal_chats.ejs")
})
app.get('/see_individual_chat_student', (req, res) => {
    res.render("personal_chats_students.ejs")
})
app.use('/api/v1/tutions', tutionRouter)
app.use('/api/v1/auth', authRouter)

const port = 3000


const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        server.listen(port, () => {
            console.log(`port is listening to port ${port}`)
        })
    }
    catch (error) {
        console.log(error)
    }
}
start()


