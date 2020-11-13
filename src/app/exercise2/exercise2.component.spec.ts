import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Exercise2Component } from './exercise2.component';

describe('Exercise2Component', () => {
  let component: Exercise2Component;
  let fixture: ComponentFixture<Exercise2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Exercise2Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Exercise2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Only tests exercise2 features

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize parameters for Exercise 2', () => {
    fixture.detectChanges();
    expect(component.values).not.toBeNull;
    expect(component.values.length).toBe(6);
    expect(component.values[0]).toBe(1.99);
    expect(component.values[5]).toBe(70.99);
    expect(component.range[0]).toBe(1.99);
    expect(component.range[1]).toBe(70.99);
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('EXERCISE 2');
  });
});
