import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgcRangeComponent } from './ngc-range.component';

describe('NgcRangeComponent', () => {
  let component: NgcRangeComponent;
  let fixture: ComponentFixture<NgcRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgcRangeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgcRangeComponent);
    component = fixture.componentInstance;
    component.min = 20;
    component.max = 100;
    component.range = [50, 80];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#isFixedType should return true', () => {
    component.type = 'fixed';
    expect(component.isFixedType).toBeTrue();
  });

  it('#isFixedType should return false', () => {
    component.type = 'normal';
    expect(component.isFixedType).toBeFalse();
  });

  it('#onMinValueChange should update min value', () => {
    const value = 30;
    component.onMinValueChange(value);
    expect(component.range[0]).toBe(value);
  });

  it('#onMinValueChange should emit changes', () => {
    spyOn(component.rangeChange, 'emit');
    fixture.detectChanges();
    component.onMinValueChange(30);
    expect(component.rangeChange.emit).toHaveBeenCalled();
  });

  it('#onMinValueChange should update min value and set to min valid value', () => {
    const value = -10;
    component.onMinValueChange(value);
    expect(component.range[0]).toBe(component.min);
  });

  it('#onMinValueChange should update min value and set to the max range value', () => {
    const value = 100;
    component.onMinValueChange(value);
    expect(component.range[0]).toBe(component.range[1]);
  });

  it('#onMaxValueChange should update max value', () => {
    const value = 90;
    component.onMaxValueChange(value);
    expect(component.range[1]).toBe(value);
  });

  it('#onMaxValueChange should emit changes', () => {
    spyOn(component.rangeChange, 'emit');
    fixture.detectChanges();
    component.onMaxValueChange(30);
    expect(component.rangeChange.emit).toHaveBeenCalled();
  });

  it('#onMaxValueChange should update max value and set to max valid value', () => {
    const value = 1000;
    component.onMaxValueChange(value);
    expect(component.range[1]).toBe(component.max);
  });

  it('#onMaxValueChange should update max value and set to the min range value', () => {
    const value = 0;
    component.onMaxValueChange(value);
    expect(component.range[1]).toBe(component.range[0]);
  });

  it('#onRangeChange should update range values', () => {
    component.onRangeChange([30, 50]);
    expect(component.range[0]).toBe(30);
    expect(component.range[1]).toBe(50);
  });

  it('#onRangeChange should emit changes', () => {
    spyOn(component.rangeChange, 'emit');
    fixture.detectChanges();
    component.onRangeChange([30, 50]);
    expect(component.rangeChange.emit).toHaveBeenCalled();
  });

  it('#writeValue should update range values', () => {
    component.writeValue([30, 50]);
    expect(component.range[0]).toBe(30);
    expect(component.range[1]).toBe(50);
  });

  it('#writeValue with invalid format', () => {
    component.writeValue('hello');
    expect(component.range[0]).toBe(component.min);
    expect(component.range[1]).toBe(component.max);
  });

  it('#writeValue should emit changes', () => {
    spyOn(component.rangeChange, 'emit');
    fixture.detectChanges();
    component.writeValue([30, 50]);
    expect(component.rangeChange.emit).toHaveBeenCalled();
  });
});
