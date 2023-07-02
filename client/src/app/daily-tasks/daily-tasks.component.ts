import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from '../users.service';
import { Users } from '../users';
import { Tasks } from '../tasks';
import { Posts } from '../posts';

@Component({
  selector: 'app-daily-tasks',
  templateUrl: './daily-tasks.component.html',
  styleUrls: ['./daily-tasks.component.css']
})
export class DailyTasksComponent implements OnInit {

  sub: Subscription = new Subscription()
  sub2: Subscription = new Subscription()

  user : Users = {}
  tasks : Tasks[] = []
  tas : any = {}
  posts : Posts[] = []
  doneTasks : Tasks[] = []
  taskDone : boolean = false
  dLine : any = (new Date(this.tas.deadline).getDate() + '/' + new Date(this.tas.deadline).getMonth() + '/' + new Date(this.tas.deadline).getFullYear())
  task : any = {title : this.tas.title, deadline: this.dLine, completed: false}
                
  @Input()
  userid : any = this.user._id

  @Output()
  notify : EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private utils: UsersService) {}

  complete(taskid : any, title : any)
  {
    let upTask = {title, completed: true}
    this.sub2 = this.utils.updateTask(this.userid, taskid, upTask)
      .subscribe((status) => (status))
      this.taskDone = true
      window.location.reload()
  }
  backToUsers()
  {
    this.notify.emit(false)
    
  }

ngOnInit(): void {
  this.sub = this.utils.getUser(this.userid)
  .subscribe((data : Users) => {
    this.user = data
    this.user.tasks?.map((x :Tasks) => 
    {
      return this.tasks.push(x)
    })
    this.user.posts?.map((y : Posts) => 
    {
      return this.posts.push(y)
    })
    this.tasks.map((t:any) => {
      if(t.completed === false)
    {
      this.doneTasks.push(t)
    }
    })
    if(this.doneTasks.length === 0)
    {
      this.taskDone = false
    }
    else
    {
      this.taskDone = true
    }
  
  })

  
}
ngOnDestroy()
{
  this.sub.unsubscribe();
  this.sub2.unsubscribe();
}
}
