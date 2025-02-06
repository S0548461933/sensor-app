import { Component, OnInit } from '@angular/core';
import { SensorService, Sensor } from '../../services/sensor.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, combineLatest } from 'rxjs';

@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.css'],
})
export class SensorListComponent implements OnInit {
  sensors$: Observable<Sensor[]> = this.sensorService.sensors$;
  filteredSensors$: Observable<Sensor[]> = this.sensors$;
  totalSensors$: Observable<number> = this.getSensorCount();
  workingSensors$: Observable<number> = this.getWorkingSensorsCount();
  faultySensors$: Observable<number> = this.getFaultySensorsCount();

  filter = { deviceName: '', dateRange: '' };
  availableDates = ['היום', 'שבוע אחרון', 'חודש אחרון'];
  deviceNames: string[] = [];

  constructor(private sensorService: SensorService, private router: Router) {}

  ngOnInit(): void {
    this.initDeviceNames();
  }

  private initDeviceNames(): void {
    this.sensors$.subscribe(sensors => {
      this.deviceNames = Array.from(new Set(sensors.map(sensor => sensor.WebSiteDeviceName)));
    });
  }

  private getSensorCount(): Observable<number> {
    return this.sensors$.pipe(map(sensors => sensors.length));
  }

  private getWorkingSensorsCount(): Observable<number> {
    return this.sensors$.pipe(map(sensors => sensors.filter(s => s.DeviceOK === 1).length));
  }

  private getFaultySensorsCount(): Observable<number> {
    return this.sensors$.pipe(map(sensors => sensors.filter(s => s.DeviceOK !== 1).length));
  }

  applyFilters(): void {
    this.filteredSensors$ = this.sensors$.pipe(
      map(sensors => sensors.filter(sensor => this.filterSensor(sensor)))
    );
  }

  private filterSensor(sensor: Sensor): boolean {
    const matchesName = this.filter.deviceName ? sensor.WebSiteDeviceName === this.filter.deviceName : true;
    const matchesDate = this.filter.dateRange ? this.checkDateRange(sensor.LastReportDate) : true;
    return matchesName && matchesDate;
  }

  onFilterApplied(criteria: { deviceName: string; dateRange: string }): void {
    this.filter = criteria;
    this.applyFilters();
  }

  onFilterCleared(): void {
    this.filter = { deviceName: '', dateRange: '' };
    this.applyFilters();
  }

  clearFilter(): void {
    this.filteredSensors$ = this.sensors$;
  }

  private checkDateRange(date: string): boolean {
    const currentDate = new Date();
    const sensorDate = new Date(date);

    switch (this.filter.dateRange) {
      case 'היום':
        return sensorDate.toDateString() === currentDate.toDateString();
      case 'שבוע אחרון':
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(currentDate.getDate() - 7);
        return sensorDate >= oneWeekAgo;
      case 'חודש אחרון':
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(currentDate.getMonth() - 1);
        return sensorDate >= oneMonthAgo;
      default:
        return true;
    }
  }

  toggleStatus(sensor: Sensor): void {
    this.sensorService.toggleStatus(sensor);
  }

  navigateToAdd(): void {
    this.router.navigate(['/add-sensor']);
  }
}
