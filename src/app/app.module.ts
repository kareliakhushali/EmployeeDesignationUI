import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { EmployeeFormComponent } from './employee-details/employee-form/employee-form.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component'
import { FormsModule } from '@angular/forms'
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
//import { ToastrModule } from 'ngx-toastr/public_api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeFormComponent,
    EmployeeDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
