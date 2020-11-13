import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Exercise1Component } from './exercise1.component';

describe('Exercise1Component', () => {
  let component: Exercise1Component;
  let fixture: ComponentFixture<Exercise1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Exercise1Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Exercise1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Only tests exercise1 features

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize parameters for Exercise 1', () => {
    fixture.detectChanges();
    expect(component.min).toBe(1);
    expect(component.max).toBe(100);
    expect(component.range[0]).toBe(component.min);
    expect(component.range[1]).toBe(component.max);
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('EXERCISE 1');
  });
});
