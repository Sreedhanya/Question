import { Component, OnInit } from '@angular/core';
import {User} from './../user';
import {Router} from '@angular/router';
import {PollService} from './../poll.service';
import {Question} from './../question';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 searchStr: String=""; 
currentUser= new User();
questionList: Array<Question>;
  constructor(private _service:PollService, private _router: Router) { }

  ngOnInit() {
    this._service.getCurrentUser()
    .then((data) => {
      if(data){
        console.log("current user is",data);
        this.currentUser = data
        this.getAllQuestions();
      } else {
        this._router.navigate(["/login"])
      }
    })
  }

getAllQuestions(){
  this._service.getAll()
    .then((data) => {
      if(data){
        console.log(data);
        this.questionList = data;
        console.log(this.questionList);
      }
    })
    .catch((err) => {console.log(err)});
  }



  Delete(question){
    let del = confirm(`Please confirm if you are sure to remove this question`);
      if(del){
        this._service.destroyQuestion(question)
        .then(() => {
          this.getAllQuestions();
         })
          .catch((err) => {console.log(err)});
      }
  }
  }


