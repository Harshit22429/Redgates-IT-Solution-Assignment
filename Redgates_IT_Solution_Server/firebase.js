const { initializeApp } = require("firebase/app");
const admin = require('firebase-admin')
const serviceAccountKey = require("./serviceAccountKey.json")

const firebaseConfig = {
  apiKey: "AIzaSyB4gS9ZRbsIIMeA3W11ehGdCvrfUKFC80A",
  authDomain: "redgates-it-solution-server.firebaseapp.com",
  projectId: "redgates-it-solution-server",
  storageBucket: "redgates-it-solution-server.appspot.com",
  messagingSenderId: "499628726458",
  appId: "1:499628726458:web:743431d4683db6f6910a83",
  databaseURL: "https://redgates-it-solution-server-default-rtdb.firebaseio.com"
};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey)
})
const app = initializeApp(firebaseConfig);

module.exports = app
