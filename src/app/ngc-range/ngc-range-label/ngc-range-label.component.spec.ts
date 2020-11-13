import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgcRangeLabelComponent } from './ngc-range-label.component';

describe('NgcRangeLabelComponent', () => {
  let component: NgcRangeLabelComponent;
  let fixture: ComponentFixture<NgcRangeLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgcRangeLabelComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgcRangeLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('label should set currency', () => {
    component.value = 10;
    expect(component.label).toBe('10€');
  });

  it('#labelDblClick() should start editing', () => {
    component.disabled = false;
    component.value = 10;
    component.labelDblClick();
    fixture.detectChanges();
    expect(component.isEditing).toBe(true);
    expect(component.editedValue).toBe(10);
    expect(fixture.nativeElement.querySelector('input')).not.toBeNull();
  });

  it('#labelDblClick() should do nothing when disabled', () => {
    component.disabled = true;
    component.value = 10;
    component.labelDblClick();
    fixture.detectChanges();
    expect(component.isEditing).toBe(false);
    expect(fixture.nativeElement.querySelector('input')).toBeNull();
  });

  it('#onKeydown() should stop editing and emit changes', () => {
    spyOn(component.valueChange, 'emit');
    fixture.detectChanges();
    component.isEditing = true;
    component.value = 10;
    component.editedValue = 15;
    component.onKeydown({ key: 'Enter' } as KeyboardEvent);
    fixture.detectChanges();
    expect(component.isEditing).toBeFalse();
    expect(component.valueChange.emit).toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('input')).toBeNull();
  });

  it('#onKeydown() should stop editing and do not emit changes', () => {
    spyOn(component.valueChange, 'emit');
    fixture.detectChanges();
    component.isEditing = true;
    component.value = component.editedValue = 10;
    component.onKeydown({ key: 'Enter' } as KeyboardEvent);
    expect(component.isEditing).toBeFalse();
    expect(component.valueChange.emit).not.toHaveBeenCalled();
  });

  it('#onKeydown() should keep editing', () => {
    spyOn(component.valueChange, 'emit');
    fixture.detectChanges();
    component.isEditing = true;
    component.onKeydown({ key: 'A' } as KeyboardEvent);
    expect(component.isEditing).toBeTrue();
  });

  it('#emitChanges() should emit changes', () => {
    spyOn(component.valueChange, 'emit');
    fixture.detectChanges();
    component.isEditing = true;
    component.value = 10;
    component.editedValue = 15;
    component.emitChanges();
    expect(component.isEditing).toBeFalse();
    expect(component.valueChange.emit).toHaveBeenCalled();
  });

  it('#emitChanges() should not emit changes', () => {
    spyOn(component.valueChange, 'emit');
    fixture.detectChanges();
    component.isEditing = true;
    component.value = component.editedValue = 10;
    component.emitChanges();
    expect(component.isEditing).toBeFalse();
    expect(component.valueChange.emit).not.toHaveBeenCalled();
  });
});
