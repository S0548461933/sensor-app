import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SensorListComponent } from './components/sensor-list/sensor-list.component';
import { SensorItemComponent } from './components/sensor-item/sensor-item.component';
import { AddSensorComponent } from './components/add-sensor/add-sensor.component';

const routes: Routes = [
{path: '', redirectTo: 'sensors', pathMatch: 'full'},
{path: 'sensors', component: SensorListComponent},
{ path: 'add-sensor', component: AddSensorComponent }, 
{ path: '**', redirectTo: '/sensors' } // טיפול בשגיאות


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
