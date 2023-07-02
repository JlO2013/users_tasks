import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { DailyTasksComponent } from './daily-tasks/daily-tasks.component';

const appRoutes : Routes = [{ path : "" , component : UsersComponent},
                            { path : "dailyTasks/:userid" , component : DailyTasksComponent}]


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    UserComponent,
    UsersComponent,
    DailyTasksComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
