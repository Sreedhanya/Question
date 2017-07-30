const mongoose=require('mongoose');
const userSchema=mongoose.Schema({name: String  },{timestamps:true})
mongoose.model("User",userSchema);
