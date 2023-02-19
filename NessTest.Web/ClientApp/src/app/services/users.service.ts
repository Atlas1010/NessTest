import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Types/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  api = "http://localhost:12867/api/";
  UsersEndPoint='Users/';
  RolesEndPoint='Roles/';

  GetRoles(): Observable<any[]> { 
    return this.http.get<any[]>(this.api +this.RolesEndPoint+ "GetRoles");
  }
  
  GetUsers(): Observable<any[]> { 
    return this.http.get<any[]>(this.api +this.UsersEndPoint+ "GetUsers");
  }
  GetUserById(id:string): Observable<any> {
    return this.http.get<any>(this.api +this.UsersEndPoint+ "GetUser?id=" + id);
  }

  addUser(action: User): Observable<any> {
    console.log(action);
    return this.http.post<any>(this.api +this.UsersEndPoint+ "CreateUser", action);
  }
   updateUser(action: User,id:string) {
    return  this.http.put(this.api + this.UsersEndPoint+"UpdateUser?id"+id, action);
  }
}
