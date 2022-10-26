const express = require("express");
const app = express();
const PORT = 4000;
const fs = require("firebase-admin");
const { FieldValue } = require("firebase-admin/firestore");
const serviceAccount = require("./app/firebase/simplechatio-firebase-adminsdk-cw05x-dde9d0ead2.json");
fs.initializeApp({
  credential: fs.credential.cert(serviceAccount),
});
const db = fs.firestore();

const http = require("http").Server(app);
const cors = require("cors");
const { setUserOnline } = require("./helpers/User");
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// const db = require('./app/models');
// db.mongoose
// .connect(db.url)
// .then(()=>{
//   console.log('Connected to db!')
// })
// .catch(err=>{
//   console.log('Cannot connect to db: ', err);
//   process.exit();
// })
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://192.168.0.19:5173",
  },
});

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socketIO.emit("testResponse", "conn");
  socket.on("user-connection", async (data) => {
    console.log("User " + data.uid + `(${data.name}) have connected`);
    // setUserOnline(data.uid)
    // const docRef = db.collection('users').doc(data.uid);

    // Update the timestamp field with the value from the server
    // const res = await docRef.update({
    //   online: true
    // });
  });
  socket.on("user-disconnection", async (data) => {
    console.log("User " + data.uid + `(${data.name}) has disconnected`);

    // Update the timestamp field with the value from the server
    // const res = await docRef.update({
    //   online: false,
    // });
    const chatRef = db.collection("chats").doc(data.ChatId);

    // Set the 'capital' field of the city
    const res = await chatRef.update({
      messsages: [...messages, data.message],
    });
  });
  socket.on("testMessage", (data) => {
    console.log("Test__ we got: " + JSON.stringify(data));
    socketIO.emit("testResponse", data);
  });
  socket.on("chatConnect", async (data) => {
    console.log("Connected to :" + data + " room");
    const chatRef = db.collection("chats").doc(data);
    const doc = await chatRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      socketIO.emit("fetchMessages", {chatId : data, messages: doc.data().messages});
    }
  });
  socket.on("message", async (data) => {
    socketIO.emit("messageResponse", data);
    // Update the timestamp field with the value from the server
    // const docRef = db.doc(db, "chats", data.ChatId)
    //  await updateDoc(docRef, {
    //   messages: [...messages, data.message]
    // });
    // console.log(
    //   "Message: " + data.message.message + " to chat: " + data.chatId
    // );
    const res = await db
      .collection("chats")
      .doc(data.chatId)
      .update({
        messages: FieldValue.arrayUnion(data.message),
      });
  });
  // socket.on('chatCon', (data)=>{
  //   console.log('User '+data.user+' conneted to '+data.cID+' room')
  //   socket.join(data.cID)
  // })
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});
app.get("/", (req, res) => {
  res.json({
    message: "Hello world cx",
  });
});
app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

http.listen(process.env.PORT || 4000, () => {
  console.log(`Server listening on ${PORT}`);
});
