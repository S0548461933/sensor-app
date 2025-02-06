import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-filter-sensor',
  templateUrl: './filter-sensor.component.html',
  styleUrls: ['./filter-sensor.component.css']
})
export class FilterSensorComponent {
  @Input() deviceNames: string[] = [];
  @Input() availableDates: string[] = ['היום', 'שבוע אחרון', 'חודש אחרון'];

  // משתנים לשמירת ערכי הסינון
  filter = { deviceName: '', dateRange: '' };

  @Output() filterApplied = new EventEmitter<{ deviceName: string; dateRange: string }>();
  @Output() filterCleared = new EventEmitter<void>();

  // הפעלת הסינון
  applyFilter(): void {
    this.filterApplied.emit(this.filter);
  }

  // ניקוי הסינון
  clearFilter(): void {
    this.filter = { deviceName: '', dateRange: '' };
    this.filterCleared.emit();
  }
}

