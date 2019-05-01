import { AuthGuard } from './providers/guards/auth.guard';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "main",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "main",
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "todo",
    loadChildren: "./todo/todo.module#TodoModule",
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    redirectTo: "main",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
