const express = require('express')
const bodyParser = require("body-parser");
const dotenv = require('dotenv')
const firebase = require('firebase')
const admin = require("firebase-admin")
const cors = require('cors')
const corsOptions = require("./corsOptions")
// const {getDatabase ,ref ,child, push, set } = require("firebase/database")
// const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
require('./firebase')
dotenv.config()
const app = express()
const port = process.env.PORT;
const auth = firebase.auth();
// const db = getDatabase()
// const todoRef = ref(db, '/todos')
const database = firebase.database()

app.use(bodyParser.json())
app.use(cors(corsOptions))
// app.use(bodyParser.urlencoded({extended:false}))

app.get('/', async (req, res) => {
  res.send('Hello World!')

})

app.post('/signup', async (req, res) => {
  try {
    const { email, pwd } = req.body
    console.log(email, pwd)
    const resultSingUp = await auth.createUserWithEmailAndPassword(email, pwd);
    if (resultSingUp) {
      console.log(resultSingUp.user)
      return res.status(200).send(resultSingUp.user)
    }
  } catch (error) {
    console.log(error.message)
    return res.status(404).send({ error: error.message })
  }
})

app.post('/signin', async (req, res) => {
  try {
    const { email, pwd } = req.body;
    const resultSignIn = await auth.signInWithEmailAndPassword(email, pwd);
    const idToken = await auth.currentUser.getIdToken(true)
    const decodeToken = await admin.auth().verifyIdToken(idToken)
    if (decodeToken.uid == resultSignIn.user.uid) {
      // const refreshToken = resultSignIn.user.stsTokenManager.refreshToken
      // console.log(resultSignIn.user.stsTokenManager)
      // const accessToken = resultSignIn.user.stsTokenManager.accessToken
      // res.cookie("jwt", accessToken, {
      //   expiresIn: "1d",
      //   httpOnly: true,
      //   sameSite: "None",
      //   secure: true,
      // })
      // const keysAll = Object.keys(resultSignIn.user)
      // for(let i =0; i<11; i++){
      //   console.log(resultSignIn.user[keysAll[i]])
      // }
      console.log(idToken)
      res.cookie("jwt", idToken, {
        exp: 30,
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      console.log('from inside : ',decodeToken.uid==resultSignIn.user.uid)
      return res.status(200).send(resultSignIn.user)
    }

  } catch (error) {
    console.log(error.message)
    return res.status(404).send({ error: error.message })
  }
})


app.post("/todoadd", async (req, res) => {
  try {
    const { todo } = req.body;
    const todoRef = database.ref('addtodos')
    const newtodoref = todoRef.push();
    const resultAdd = await newtodoref.set(todo)
    return res.status(200).send({ message: "todo added" })
  } catch (error) {
    return res.send(error.message)
  }
})

app.get('/todoread', async (req, res) => {
  try {
    const todoRef = database.ref('addtodos')
    const todoData = await todoRef.once('value')
    if (todoData) {
      const todos = todoData.val()
      return res.status(200).send(todos)
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
})

app.delete('/tododelete', async (req, res) => {
  try {
    const { todoId } = req.body;
    console.log(req.body)
    console.log(todoId)
    const todoRef = database.ref('addtodos/' + todoId)
    const todoRemove = await todoRef.remove()
    return res.status(200).send({ message: "todo deleted" })
  } catch (error) {
    return res.status(200).send(error.message)
  }
})

app.put('/todoupdate', async (req, res) => {
  try {
    const { todoId, newtodo } = req.body;
    console.log(todoId, newtodo)
    const todoRef = database.ref('addtodos/');
    const todoUpdate = await todoRef.update({ [todoId]: newtodo })
    return res.status(200).send({ message: "todo updated" })
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


