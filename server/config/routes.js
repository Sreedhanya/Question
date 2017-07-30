//var notes=require('../controllers/notes.js');
const path = require("path")
const users = require("./../controllers/user.js") 
const questions = require("./../controllers/questions.js") 
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Question = mongoose.model('Question');

module.exports = (app) =>{
    app.post('/login', users.login)
    app.get("/logout", users.logout)
    app.post("/create", questions.create)
    app.get('/get_logged_in_user', users.currentUser)
    app.post("/destroyQuestion", questions.deleteQuestion)
    app.get("/listQuestions", questions.listQuestions)
    app.post("/addVotes", questions.addVotes)
   
    app.post('/name', users.username)
    app.post('/getQuestions', questions.getQuestions)
   
    

    app.get("*", (req,res) =>{
        res.sendFile(path.resolve("./client/dist/index.html"))
    })
}
