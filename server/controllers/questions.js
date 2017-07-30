const mongoose = require('mongoose');
const Question = mongoose.model('Question');
mongoose.Promise = global.Promise;

module.exports = {
    create: (req,res,next) => {
        let question = new Question(req.body);
        question.save()
        .then(() => {
            res.json(true);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
},
    listQuestions:(req,res) =>{
        Question.find({})
        .then(questions => {console.log("questions to list in dashboard",questions);res.json(questions);})
				.catch(err => {res.status(501).json(err); })
    },
     

    getQuestions:(req,res) =>{
    console.log("in controller getQuestion",req.body.id)
        Question.findOne({_id: req.body.id})
        .then(question => { console.log("question:",question);res.json(question);})
				.catch(err => {res.status(500).json(err); })
    },
    
    addVotes:(req,res) =>{
        Question.findOne({_id:req.body.id}) 
         .then(question => {
            
        for(let i=0; i<question.options.length;i++){
                if(question.options[i] == req.body.option){
                    question.vote[i] = question.vote[i]+1;
                }
            }
            question.markModified('vote');
            console.log(question.vote)
            question.save()
            res.json(true);
            })
				.catch(err => {res.status(501).json(err); })
        },
    deleteQuestion: (req,res) => {
        Question.findByIdAndRemove(req.body._id)
        .then(() => { res.json(true);})
        .catch((err) => {res.status(503).json(err);})
    },
}