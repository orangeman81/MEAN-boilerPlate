import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './components/components.module';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginFormComponent } from './login/login-form/login-form.component';

import { ApiService } from './providers/api.service';
import { TodoStore } from './providers/todo-store.service';
import { AuthStore } from './providers/auth-store.service';
import { AuthGuard } from './providers/guards/auth.guard';
import { TokenInterceptor } from './providers/guards/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule
  ],
  providers: [
    ApiService,
    TodoStore,
    AuthStore,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
