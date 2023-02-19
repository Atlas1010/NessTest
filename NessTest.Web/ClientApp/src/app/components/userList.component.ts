
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-list',
  templateUrl: 'userList.html'
})
export class UserListComponent implements OnInit  {
  User
  constructor(private UsersList:UsersService,private router: Router) { }
  actionsList=''
  ngOnInit(): void {
  /*this.UsersList.GetUsers().subscribe(
    (Success) => {
        this.User = Success;
     //this.actionsList = Success;
      console.log("success get ServiceTik", Success);
    },
    (Error) => {
      console.log("error ServiceTik", Error);
    })*/
  }

  Users=[
    {id:1,UserName:'ass',role:'dd',creationDate:new Date(),active:'כן'},
    {id:3,UserName:'ass',role:'dd',creationDate:new Date(),active:'כן'}
  ]
  UpdateUser(id:String){
    this.router.navigate(['/UserUpdate',{id:id}]);
  }
  AddUser(){
    this.router.navigate(['/UserUpdate']);
  }
}
