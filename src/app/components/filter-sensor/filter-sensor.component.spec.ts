import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSensorComponent } from './filter-sensor.component';

describe('FilterSensorComponent', () => {
  let component: FilterSensorComponent;
  let fixture: ComponentFixture<FilterSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterSensorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
