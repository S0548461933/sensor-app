import { Component,OnInit  } from '@angular/core';
import { SensorService, Sensor } from '../../services/sensor.service';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.css'],
 
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
  deviceNames: string[] = [];

  constructor(private sensorService: SensorService, private router: Router) { }
  ngOnInit(): void {
    // קבלת החיישנים מהסרוויס
    this.sensors$ = this.sensorService.sensors$;
    this.filteredSensors$ = this.sensors$;

    // חישוב מספר החיישנים הכולל, התקינים והתקולים
    this.totalSensors$ = this.sensors$.pipe(map(sensors => sensors.length));
    this.workingSensors$ = this.sensors$.pipe(map(sensors => sensors.filter(s => s.DeviceOK === 1).length));
    this.faultySensors$ = this.sensors$.pipe(map(sensors => sensors.filter(s => s.DeviceOK !== 1).length));

    this.filteredSensors$ = this.sensors$;
 // אתחול deviceNames עם שמות ההתקנים הייחודיים
 this.sensors$.subscribe(sensors => {
  this.deviceNames = Array.from(new Set(sensors.map(sensor => sensor.WebSiteDeviceName)));
});

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
  // applyFilters() {
  //   this.filteredSensors$ = this.sensors$.pipe(
  //     map(sensors => sensors.filter(sensor => {
  //       const matchesName = this.filter.deviceName ? sensor.WebSiteDeviceName === this.filter.deviceName : true;
  //       const matchesDate = this.filter.dateRange ? this.checkDateRange(sensor.LastReportDate) : true;
  //       return matchesName && matchesDate;
  //     }))
  //   );
  // }
  onFilterApplied(criteria: { deviceName: string; dateRange: string }) {
    this.filter = criteria;
    this.filterApplied({ deviceName: 'exampleName', dateRange: 'exampleRange' });
  }
  
  onFilterCleared() {
    this.filter = { deviceName: '', dateRange: '' };
    this.applyFilters();
  }
  
  
  filterApplied(criteria: { deviceName: string; dateRange: string }) {
    this.filter = criteria;
    this.applyFilters();
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


  clearFilter() {
    this.filteredSensors$ = this.sensors$;
  }
  toggleStatus(sensor: Sensor) {
    this.sensorService.toggleStatus(sensor);
  }
  navigateToAdd() {
    this.router.navigate(['/add-sensor']);
  }

}
