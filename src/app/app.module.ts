// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { TasksComponent } from  './tasks/tasks.component';
import { TaskSearchComponent } from  './navbar/task-search/task-search.component';

// Services
import { TaskService } from './tasks/shared/task.service';
import { InMemoryTaskDataService } from './in-memory-task-data.service';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    TaskDetailComponent,
    TasksComponent,
    TaskSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    // InMemoryWebApiModule.forRoot(InMemoryTaskDataService, { apiBase: 'api'} )
    InMemoryWebApiModule.forRoot(InMemoryTaskDataService)
  ],
  providers: [ TaskService ],
  bootstrap: [AppComponent]
})

export class AppModule {}