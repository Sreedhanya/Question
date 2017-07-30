import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import "rxjs";
import {User} from './user';
@Injectable()
export class PollService {

  constructor(private http: Http) { }


login(user: User){
      return this.http.post("/login", user)
      .map(data => data.json()).toPromise()
    }
    create(question) {
      return this.http.post('/create', question)
      .map(data => data.json())
      .toPromise()
  }
  getCurrentUser() {
    return this.http.get('/get_logged_in_user')
    .map(data => data.json()).toPromise();
  }
  getAll(){
    return this.http.get('/listQuestions')
    .map(data => data.json()).toPromise();
  }

 getQuestion(questionId: String){
     return this.http.post('/getQuestions',{id: questionId})
    .map(data => data.json()).toPromise();
  }
addVotes(option:String,questionId:String)
{
   return this.http.post('/addVotes',{id: questionId, option:option})
    .map(data => data.json()).toPromise();
}

  destroyQuestion(question){
     return this.http.post('/destroyQuestion', question)
    .map(data => data.json()).toPromise();
  }
  }

