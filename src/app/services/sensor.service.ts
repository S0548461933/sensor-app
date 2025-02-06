import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

export interface Sensor {
  InstallDate: string;
  DeviceOK: number;
  DeviceTypeHebrew: string;
  DeviceId: string;
  DeviceType: string;
  WebSiteDeviceName: string;
  LastReportDate: string;
  Picture: string;
}

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  private sensorsUrl = 'assets/sensors.json';
  private sensorsSubject = new BehaviorSubject<Sensor[]>([]);
  sensors$ = this.sensorsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadSensors().subscribe();
  }

  private loadSensors(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(this.sensorsUrl).pipe(
      tap(data => this.sensorsSubject.next(data))
    );
  }

  addSensor(newSensor: Sensor): void {
    newSensor.DeviceId = (this.getHighestDeviceId() + 1).toString();
    this.sensorsSubject.next([...this.sensorsSubject.value, newSensor]);
    console.log(this.getJsonString());
  }

  private getHighestDeviceId(): number {
    const ids = this.sensorsSubject.value.map(sensor => Number(sensor.DeviceId));
    return ids.length ? Math.max(...ids) : 0;
  }

  private getJsonString(): string {
    return JSON.stringify(this.sensorsSubject.value);
  }

  toggleStatus(sensor: Sensor): void {
    const updatedSensors = this.sensorsSubject.value.map(s => 
      s.DeviceId === sensor.DeviceId
        ? { ...s, DeviceOK: s.DeviceOK === 1 ? 0 : 1, LastReportDate: this.getIsraelTime() }
        : s
    );
    this.sensorsSubject.next(updatedSensors);
  }

  private getIsraelTime(): string {
    const now = new Date();
    const israelOffset = 60 * 60 * 1000; // Israel time offset (1 hour)
    const israelTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000 + israelOffset);
    return israelTime.toISOString().replace("T", " ").split(".")[0];
  }
}
