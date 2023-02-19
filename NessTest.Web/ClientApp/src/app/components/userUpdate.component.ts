
import { HttpClient } from '@angular/common/http';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Active } from '../Enum/propertiesEnum';
import { UsersService } from '../services/users.service';
import { Role } from '../Types/Role';
import { User } from '../Types/User';
import { IdValidators } from '../Validators';

@Component({
  selector: 'user-update',
  templateUrl: 'userUpdate.html'
})
export class UserUpdateComponent  implements OnInit {
  isChangesSaved: boolean;
  constructor(private formBuilder: FormBuilder ,private http:HttpClient,private User:UsersService,private route:ActivatedRoute) { }
id:string
  formGroup: FormGroup = new FormGroup({})
  mouseoverLogin: boolean = false
  isActive:Active
roles:Role[]=[];
role:Role
UserById:User
  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get("id");
console.log(this.id);
if(this.id!=null){
getUserById(this.id);
}
    //this.getRoles();
    this.formGroup = this.formBuilder.group({
      userName: new FormControl('', [Validators.pattern(/^[a-z\u0590-\u05fe]+$/i)]),
      ID: new FormControl('', [Validators.pattern(/^[0-9]{9}$/), IdValidators.isValidIsraeliID]),
      phone: new FormControl('',[Validators.required,Validators.minLength(9),Validators.maxLength(10)]),
      userEmail: new FormControl('',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      role: this.roles,
      isActive:new FormControl('')
    });
  }
   
  Update(){
    if(this.id==null){
           this.User.addUser(this.formGroup.value).subscribe(
      (Success) => {
        alert('הנתונים נשמרו בהצלחה!')
        this.isChangesSaved = true;
      },
      (Error) => {
        console.log("AddServicesAction", Error);
        this.isChangesSaved = false;
        alert("תקלה, יש לנסות שנית");
      })
    }
else{
  this.User.updateUser(this.formGroup.value,this.id).subscribe(
    (Success) => {
      alert('הנתונים נשמרו בהצלחה!')
      this.isChangesSaved = true;
    },
    (Error) => {
      console.log("AddServicesAction", Error);
      this.isChangesSaved = false;
      alert("תקלה, יש לנסות שנית");
    })
}

  } 
  getRoles(){
this.User.GetRoles().subscribe(
    (Success) => {
        this.roles = Success;
     //this.actionsList = Success;
      console.log("success get Roles", Success);
    },
    (Error) => {
      console.log("error Roles", Error);
    })
  }
  }


function getUserById(id:string) {
  this.http.GetUserById(id).subscribe(
    (Success) => {
      this.UserById = Success as User;
      this.formGroup.patchValue({
        userName:this.UserById.userName,
        ID:this.UserById.ID,
        phone:this.UserById.phone,
        userEmail:this.UserById.userEmail,
        role:this.UserById.Role.Description,
        isActive: this.UserById.isActive 

      });
      console.log("GetUsersById success:", Success);  
    },
    (Error) => {
      console.log("GetUsersById error:", Error);
    }
  )
}

