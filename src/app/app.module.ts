// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskSearchComponent } from './navbar/task-search/task-search.component';

// Services
import { TaskService } from './tasks/shared/task.service';
import { InMemoryTaskDataService } from './in-memory-task-data.service';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

// rxjs operators: são usados no subscribe
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
// rxjs extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// jquery plugins
import * as $ from 'jquery';
import * as datetimepicker from 'eonasdan-bootstrap-datetimepicker';

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
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    // InMemoryWebApiModule.forRoot(InMemoryTaskDataService, { apiBase: 'api'} )
    InMemoryWebApiModule.forRoot(InMemoryTaskDataService)
  ],
  providers: [ TaskService ],
  bootstrap: [AppComponent]
})

export class AppModule {}