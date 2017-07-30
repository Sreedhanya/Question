const mongoose = require("mongoose")
const User = mongoose.model("User")
const session=require("express-session");
mongoose.Promise = global.Promise;

module.exports = {
	login: (req, res) => {
		User.findOne({name: req.body.name})
			.then(data => {
				if(data){
					req.session.user_id = data._id
					res.json(true)
				} else {
					let new_user = new User({name: req.body.name})
                    // console.log(this.new_user.name)
					new_user.save()
						.then(() => {
							req.session.user_id = new_user._id
							res.json(true)
						})
						.catch(err => res.status(500).json(err))
				}
			})
    },
     currentUser: (req,res) => {
        if(req.session.user_id){
			User.findOne({_id: req.session.user_id})
				.then(user => res.json(user))
				.catch(err => res.status(412).json(err))
		} else {
			res.json(false)
		}
     },
  username: (req,res) =>{
        User.findOne({_id: req.body.user_id})
        .then(user => res.json(user))
				.catch(err => res.status(415).json(err))
		},
 logout: (req, res) => {
		req.session.destroy()
		res.redirect('/');
	}
}