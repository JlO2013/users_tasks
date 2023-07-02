import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../users';
import { Tasks } from '../tasks';
import { Posts } from '../posts';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{


  sub : Subscription = new Subscription()
  sub2 : Subscription = new Subscription()
  sub3 : Subscription = new Subscription()
  sub4 : Subscription = new Subscription()
  sub5 : Subscription = new Subscription()

  user : Users = {}
  count : boolean = false
  expand : boolean = false
  showPosts : boolean = true
  showTasks : boolean = true
  tasks : Tasks[] = []
  doneTasks : Tasks[] = []
  posts : Posts[] = []
  isVisible : boolean = false;
  taskDone : boolean = false
  
  @Input()
  userid : any = this.user._id
  
 
  constructor(private utils : UsersService, private ar : ActivatedRoute) {}
  sendData(id: any)
  { 
    if(id !== this.userid && this.isVisible==true)
    {
      this.expand = false
      this.isVisible=false
    } 
    else
    {
      this.expand=!this.expand
      this.isVisible=!this.isVisible
    }
  }

  getNewPost()
  {
    this.showPosts = !this.showPosts
  }

  complete(taskid : any, title : any)
  {
    let upTask = {title, completed: true}
    this.sub5 = this.utils.updateTask(this.userid, taskid, upTask)
      .subscribe((status) => (status))
      this.taskDone = true
      window.location.reload()
  }
  getNewTask()
  {
    this.showTasks = !this.showTasks
  }
  addTask(title : string, deadline: any)
  {
    let newTask = {title, deadline, completed : false}
    this.sub3 = this.utils.addTask(this.userid, newTask)
      .subscribe((status) => (status))
      window.location.reload()
      this.showTasks = !this.showTasks
  }
  addPost(title : string, body : string)
  {
    let newPost = {title, body}
    this.sub3 = this.utils.addPost(this.userid, newPost)
      .subscribe((status) => (status))
      window.location.reload()
      this.showPosts = !this.showPosts
  }
  deleteUser(user: Users)
  {
    let userd: any = user._id
    this.sub4 = this.utils.deleteUser(userd)
      .subscribe(status => alert(status))
      window.location.reload()
  }
  update(name: string, email: string, street: string, city: string, zipCode: any)
  {
    let obj = {name, email, street, city, zipCode}
    this.sub2 = this.utils.updateUser(this.userid, obj)
      .subscribe((status) => alert(status))
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
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
    this.sub5.unsubscribe();
  }
}
