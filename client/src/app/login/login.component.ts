import { Component, OnInit } from '@angular/core';
import {PollService} from './../poll.service';
import { User } from './../user';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newUser = new User;
  constructor(private _service : PollService, private _router : Router) { }

  ngOnInit() {
  }
saveUser()
  {
    console.log(this.newUser.name)
this._service.login(this.newUser).then(()=>{
this._router.navigate(["/dashboard"])});
this.newUser= new User();


  }
}
