import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table'; 
import { HttpClientModule } from '@angular/common/http';
import { SensorListComponent } from './components/sensor-list/sensor-list.component';
import {  MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { AddSensorComponent } from './components/add-sensor/add-sensor.component';
import {  MatOptionModule, NativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatRadioModule }from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    SensorListComponent,
    AddSensorComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatOptionModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    NativeDateModule,
    MatRadioModule ,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSelectModule, 
  
      ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
