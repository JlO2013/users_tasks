import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Users } from '../users';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  sub : Subscription = new Subscription();
  sub2 : Subscription = new Subscription()
  users : Users[] = []
  filteredUsers : Users[] = []
  getNewUser : boolean = false
  showTasks : boolean = false
  hideTasks : boolean = true
  now : Date = new Date()


  constructor(private utils : UsersService) {}
  
  newUser()
  {
    this.getNewUser = !this.getNewUser
  }

  search(searchData : string)
  {
  this.filteredUsers = this.users.filter(x => x.name?.includes(searchData) || x.email?.includes(searchData))
  }

  addUser(id: any, name: string, email : string)
  {
    let obj = {id,name,email}
    this.sub2 = this.utils.addUser(obj)
      .subscribe((status) => {
        alert(status);
        window.location.reload()
      })

  }
  todaySTasks()
  {
    this.showTasks = true;
    this.hideTasks = !this.showTasks
  }
  backToUsers()
  {
    this.showTasks = false
    this.hideTasks = !this.showTasks    
  }
  ngOnInit(): void { 

    setInterval(() => {
      this.now = new Date();
    }, 1);
    
    if(this.now.getMinutes() == 20)
    {
      this.todaySTasks()
    }
 
    if(this.showTasks === true)
    {
      this.hideTasks === false
    }
    else
    {
      this.hideTasks === true
    }

    this.sub = this.utils.getUsers()
    .subscribe((data : any) =>
    { 
      this.users = data ;
      this.filteredUsers = data  
    });
  }

  ngOnDestroy()
  {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
}
