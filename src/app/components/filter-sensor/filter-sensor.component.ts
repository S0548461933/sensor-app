import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-filter-sensor',
  templateUrl: './filter-sensor.component.html',
  styleUrls: ['./filter-sensor.component.css']
})
export class FilterSensorComponent {

  @Input() deviceNames: string[] = [];
  @Input() availableDates: string[] = ['היום', 'שבוע אחרון', 'חודש אחרון'];
// משתנים שישמשו לשמירת ערכי הסינון
  filter = { deviceName: '', dateRange: '' };

  @Output() filterApplied = new EventEmitter<{ deviceName: string; dateRange: string }>();
  @Output() filterCleared = new EventEmitter<void>();


  applyFilter() {
    this.filterApplied.emit(this.filter);
  }

  clearFilter() {
    // איפוס הקריטריונים המקומיים
    this.filter = { deviceName: '', dateRange: '' };
    this.filterCleared.emit();
  }
}