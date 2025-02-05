import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject, tap } from 'rxjs';

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
  private sensors: Sensor[] = [];  
  private sensorsSubject = new BehaviorSubject<Sensor[]>([]);
  sensors$ = this.sensorsSubject.asObservable();


  constructor(private http: HttpClient) {
        this.loadSensors().subscribe();

   }

  loadSensors(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(this.sensorsUrl).pipe(
      tap(data => {
        this.sensors = data;
        this.sensorsSubject.next(data);
      })
    );
  }

  addSensor(newSensor: Sensor) {
    const maxId = this.getHighestDeviceId();
    newSensor.DeviceId = (maxId + 1).toString();
    this.sensors.push(newSensor);
    this.sensorsSubject.next(this.sensors);
    // הדפסה של מחרוזת JSON לבדיקות במידה ונדרש
    console.log(this.getJsonString());
  }

  getHighestDeviceId(): number {
    const sensors = this.sensorsSubject.value;
    if (!sensors || sensors.length === 0) {
      return 0;
    }
    // המרה ממחרוזת למספר ובחירת המספר הגבוה ביותר
    const ids = sensors.map(sensor => Number(sensor.DeviceId));
    return Math.max(...ids);
  }
  
  getJsonString(): string {
    return JSON.stringify(this.sensors);
  }

  
  toggleStatus(sensor: Sensor) {
    const now = new Date();
  
    const offset = now.getTimezoneOffset() * 60000;
    
    // חישוב השעה לפי שעון ישראל 
    const israelTime = new Date(now.getTime() - offset + ( 60 * 60));
  
    const sensors = this.sensorsSubject.value.map(s =>
      s.DeviceId === sensor.DeviceId
        ? { 
            ...s, 
            DeviceOK: s.DeviceOK === 1 ? 0 : 1, 
            LastReportDate: israelTime.toISOString().replace("T", " ").split(".")[0] 
          }
        : s
    );
  
    this.sensorsSubject.next(sensors);
  }
 
}
