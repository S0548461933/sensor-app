import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sensor, SensorService } from 'src/app/services/sensor.service';

@Component({
  selector: 'app-add-sensor',
  templateUrl: './add-sensor.component.html',
  styleUrls: ['./add-sensor.component.css']
})
export class AddSensorComponent {

  newSensor: Sensor = {
    InstallDate: new Date().toISOString().split("T")[0], // תאריך נוכחי
    DeviceOK: 1,
    DeviceTypeHebrew: '',
    DeviceId: Math.random().toString(36).substr(2, 9), // יצירת מזהה ייחודי
    DeviceType: '',
    WebSiteDeviceName: '',
    LastReportDate: new Date().toISOString().replace("T", " ").split(".")[0],
    Picture: 'default' // ניתן לשנות לתמונה קיימת
  };
  imageNames = [{ value: 'boiler_mco_rect', viewValue: 'תמונה 1' },
  { value: 'camera_viv', viewValue: 'תמונה 2' },
  { value: 'contact_hanxi', viewValue: 'תמונה 3' },
  { value: 'motion_hanxi', viewValue: 'תמונה 4' },
  { value: 'motion_philio', viewValue: 'תמונה 5' },
  { value: 'water_philio', viewValue: 'תמונה 6' },
  { value: 'zwavelight_mcohome_rect', viewValue: 'תמונה 7' }
  ]


  constructor(private sensorService: SensorService, private router: Router, private snackBar: MatSnackBar) { }

  allowOnlyEnglishLetters(event: KeyboardEvent): void {
    // מאפשר שימוש במקשים מיוחדים כמו Backspace, Delete, חצים וכו'
    if (event.key.length > 1) return;

    const englishLetterPattern = /^[A-Za-z]$/;
    if (!englishLetterPattern.test(event.key)) {
      event.preventDefault();
      this.snackBar.open('נא להקיש אותיות באנגלית', 'סגור', { duration: 2000 });

    }
  }

  saveSensor() {
    if (!this.newSensor.WebSiteDeviceName || !this.newSensor.DeviceType) {
      alert('נא למלא את כל השדות');
      return;
    }

    this.sensorService.addSensor(this.newSensor);
    this.router.navigate(['/sensor-list']); // חזרה לרשימת החיישנים
  }

  onCancel() {
    this.router.navigate(['/sensor-list']); // ביטול וחזרה לרשימה
  }
}
