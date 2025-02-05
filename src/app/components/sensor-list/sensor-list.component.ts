import { Component,OnInit  } from '@angular/core';
import { SensorService, Sensor } from '../../services/sensor.service';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.css']
})
export class SensorListComponent implements OnInit{
  sensors$!: Observable<Sensor[]>;
  filteredSensors$!: Observable<Sensor[]>;
  totalSensors$!: Observable<number>;
  workingSensors$!: Observable<number>;
  faultySensors$!: Observable<number>;

  filter = {
    deviceName: '',
    dateRange: ''
  };

  availableDates = ['היום', 'שבוע אחרון', 'חודש אחרון']; 

  constructor(private sensorService: SensorService, private router: Router) {
    
   }
  ngOnInit(): void {
    // קבלת החיישנים מהסרוויס
    this.sensors$ = this.sensorService.sensors$;

    // חישוב מספר החיישנים הכולל, התקינים והתקולים
    this.totalSensors$ = this.sensors$.pipe(map(sensors => sensors.length));
    this.workingSensors$ = this.sensors$.pipe(map(sensors => sensors.filter(s => s.DeviceOK === 1).length));
    this.faultySensors$ = this.sensors$.pipe(map(sensors => sensors.filter(s => s.DeviceOK !== 1).length));

    this.filteredSensors$ = this.sensors$;

  }

  applyFilters() {
    this.filteredSensors$ = this.sensors$.pipe(
      map(sensors => {
        return sensors.filter(sensor => {
          const matchesName = this.filter.deviceName ? sensor.WebSiteDeviceName === this.filter.deviceName : true;
          const matchesDate = this.filter.dateRange ? this.checkDateRange(sensor.LastReportDate) : true;
          return matchesName && matchesDate;
        });
      })
    );
  }

  checkDateRange(date: string): boolean {
    const currentDate = new Date();
    const sensorDate = new Date(date);

    if (this.filter.dateRange === 'היום') {
      return sensorDate.toDateString() === currentDate.toDateString();
    } else if (this.filter.dateRange === 'שבוע אחרון') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(currentDate.getDate() - 7);
      return sensorDate >= oneWeekAgo;
    } else if (this.filter.dateRange === 'חודש אחרון') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(currentDate.getMonth() - 1);
      return sensorDate >= oneMonthAgo;
    }
    return true;
  }
  clearFilters() {
    // איפוס הערכים הממויינים
    this.filter.deviceName = '';
    this.filter.dateRange = '';
    // הצגת כל החיישנים
    this.filteredSensors$ = this.sensors$;
  }
 
  toggleStatus(sensor: Sensor) {
    this.sensorService.toggleStatus(sensor);
  }
  navigateToAdd() {
    this.router.navigate(['/add-sensor']);
  }

}
