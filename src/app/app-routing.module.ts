import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { TasksComponent } from  './tasks/tasks.component';

// forRoot vai retornar um modulo com todas as configuracoes das rotas da app
const ROUTES = RouterModule.forRoot([
  {
    path: 'tasks/:id',
    component: TaskDetailComponent
  },
  {
    path: 'tasks',
    component: TasksComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
])

@NgModule({
  declarations: [],
  imports: [ ROUTES ],
  exports: [ RouterModule ], // precisamos exportar aqui para que no app.module os recursos de rotas estejam disponíves para os modulos importados lá
  providers: [],
})

export class AppRoutingModule {}