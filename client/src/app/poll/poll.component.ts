import { Component, OnInit } from '@angular/core';
import {User} from './../user';
import { Router, ActivatedRoute } from '@angular/router';
import {Question} from './../question';
import {PollService} from './../poll.service';
@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

  questionId: String;
  currentUserQuestions: Array<Question>;
  currentQuestion = Question
  current_user: User;

  constructor(private _service: PollService, private _route: ActivatedRoute,  private _router: Router) {
     this._route.params.subscribe((param)=>{
      console.log("Question id is  ", param.question_id);
      this.questionId = param.question_id;
    })

   }

  ngOnInit() {
    this._service.getCurrentUser()
    .then((data) => {
      if(data){
        this.current_user = data

      } else {
        this._router.navigate(["/login"])
      }
    })
    this.getQuestion();
  }
  getQuestion(){
    this._service.getQuestion(this.questionId)
      .then((data) => {
        if(data){
          this.currentQuestion = data;
          console.log("question", data)
        }
  })
  .catch(err => console.log(err))
    }

addVote(option:String){
  this._service.addVotes(option,this.questionId)
    .then(() =>{
      this.getQuestion();
      window.location.reload();
    })
    .catch(err => console.log(err))

      }

}
