import { Component, OnInit } from '@angular/core';
import {User} from './../user';
import {Router} from '@angular/router';
import {Question} from './../question';
import {PollService} from './../poll.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
newQuestion = new Question();
  currentUser: User;
  constructor(private _service :PollService, private _router : Router) { }

  ngOnInit() {
    this._service.getCurrentUser()
    .then((data) => {
      if(data){
        this.currentUser = data
      } else {
        this._router.navigate(["/login"])
      }
    })
  }
 onSubmit(){

    this.newQuestion.options.push(this.newQuestion.option1)
    this.newQuestion.options.push(this.newQuestion.option2)
    this.newQuestion.options.push(this.newQuestion.option3)
    this.newQuestion.options.push(this.newQuestion.option4)
    for(let i=0; i<4; i++){
      this.newQuestion.vote.push(0);
    }

  //  if(this.new_question.question!=null)
    this.newQuestion.user_name = this.currentUser.name;
    console.log(this.newQuestion.options);
    this._service.create(this.newQuestion)
    .then(() => {
      this._router.navigate(['/dashboard'])})
    .catch((err) => {console.log(err)});

  }
}
