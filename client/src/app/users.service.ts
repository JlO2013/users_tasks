import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Users } from './users';
import { Tasks } from './tasks';
import { Posts } from './posts';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http : HttpClient) { }

  getUsers() 
  {
    return this.http.get("http://localhost:8000/api/users")
  }

  getUser(id : string)
  {
   return this.http.get("http://localhost:8000/api/users/" + id)
  }

  addUser(obj : Users)
  {
    return this.http.post("http://localhost:8000/api/users", obj)
  }

  addTask(id: string, obj: Tasks)
  {
    return this.http.patch("http://localhost:8000/api/users/tasks/" + id, obj)
  }

  addPost(id: string, obj: Posts)
  {
    return this.http.patch("http://localhost:8000/api/users/posts/" + id, obj)
  }

  updateUser(id: string, obj: Users)
  {
    return this.http.put("http://localhost:8000/api/users/" + id, obj)
  }

  updateTask(userid: string, taskid: string, obj: Tasks)
  {
    return this.http.put("http://localhost:8000/api/users/" + userid + "/tasks/" + taskid, obj)
  }

  deleteUser(id: string)
  {
    return this.http.delete("http://localhost:8000/api/users/" + id)
  }
}
