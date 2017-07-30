const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    user_name: {type: String},
    question: {type: String},
    options: Array,
    vote: Array
}, {timestamps: true});

mongoose.model('Question', QuestionSchema);