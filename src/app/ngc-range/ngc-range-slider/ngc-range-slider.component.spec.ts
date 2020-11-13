import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgcRangeSliderComponent } from './ngc-range-slider.component';

describe('NgcRangeSliderComponent', () => {
  let component: NgcRangeSliderComponent;
  let fixture: ComponentFixture<NgcRangeSliderComponent>;
  let ngcRangeDimensions: any;
  // Creates a mouse event given a percentage of the range.
  const createMouseEvent = (perc: number) => {
    return {
      clientX: perc * ngcRangeDimensions.width + ngcRangeDimensions.left,
      preventDefault: () => {},
    } as MouseEvent;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgcRangeSliderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgcRangeSliderComponent);
    component = fixture.componentInstance;
    component.min = 0;
    component.max = 100;
    component.range = [10, 80];
    fixture.detectChanges();
    // @ts-ignore
    ngcRangeDimensions = component.ngcRangeDimensions;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Normal Range Tests', () => {
    it('#onMouseMove should update min bullet', () => {
      const value = 50;
      component.onMouseDownMinBullet();
      const event = createMouseEvent(value / 100);
      component.onMouseMove(event);
      expect(component.range[0]).toBe(50);
    });

    it('#onMouseMove should update min bullet and set to the max value', () => {
      const value = 90;
      component.range[1] = 20;
      component.onMouseDownMinBullet();
      const event = createMouseEvent(value / 100);
      component.onMouseMove(event);
      expect(component.range[0]).toBe(20);
    });

    it('#onMouseMove should update min bullet and set to the min valid value', () => {
      component.onMouseDownMinBullet();
      const event = createMouseEvent(-0.1);
      component.onMouseMove(event);
      expect(component.range[0]).toBe(component.min);
    });

    it('#onMouseMove should update min bullet when both have the same value', () => {
      const value = 20;
      component.range = [50, 50];
      component.onMouseDownMaxBullet();
      const event = createMouseEvent(value / 100);
      component.onMouseMove(event);
      expect(component.range[0]).toBe(value);
      expect(component.range[1]).toBe(50);
    });

    it('#onMouseMove should update max bullet', () => {
      const value = 50;
      component.onMouseDownMaxBullet();
      const event = createMouseEvent(value / 100);
      component.onMouseMove(event);
      expect(component.range[1]).toBe(50);
    });

    it('#onMouseMove should update max bullet and set to the min bullet value', () => {
      const value = 2;
      component.range[0] = 20;
      component.onMouseDownMaxBullet();
      const event = createMouseEvent(value / 100);
      component.onMouseMove(event);
      expect(component.range[1]).toBe(20);
    });

    it('#onMouseMove should update max bullet and set to the max valid value', () => {
      component.onMouseDownMaxBullet();
      const event = createMouseEvent(1.1);
      component.onMouseMove(event);
      expect(component.range[1]).toBe(component.max);
    });

    it('#onMouseMove should update max bullet when both have the same value', () => {
      const value = 70;
      component.range = [50, 50];
      component.onMouseDownMinBullet();
      const event = createMouseEvent(value / 100);
      component.onMouseMove(event);
      expect(component.range[0]).toBe(50);
      expect(component.range[1]).toBe(value);
    });
  });

  describe('Fixed Values Range Tests', () => {
    beforeEach(() => {
      component.min = 0;
      component.max = 100;
      component.values = [0, 25, 50, 99, 100];
      component.range = [25, 99];
      component.isFixedType = true;
    });

    it('#onMouseMove should update min bullet with the nearest value', () => {
      const value = 60;
      component.onMouseDownMinBullet();
      const event = createMouseEvent(value / 100);
      component.onMouseMove(event);
      expect(component.range[0]).toBe(50); // 50 is the nearest value of 60
    });

    it('#onMouseMove should update min bullet and set to the max value', () => {
      const value = 90;
      component.range[1] = 50;
      component.onMouseDownMinBullet();
      const event = createMouseEvent(value / 100);
      component.onMouseMove(event);
      expect(component.range[0]).toBe(50);
    });

    it('#onMouseMove should update min bullet and set to the min valid value', () => {
      component.onMouseDownMinBullet();
      const event = createMouseEvent(-0.1);
      component.onMouseMove(event);
      expect(component.range[0]).toBe(component.min);
    });

    it('#onMouseMove should update min bullet when both have the same value', () => {
      const value = 20;
      component.range = [50, 50];
      component.onMouseDownMaxBullet();
      const event = createMouseEvent(value / 100);
      component.onMouseMove(event);
      expect(component.range[0]).toBe(25);
      expect(component.range[1]).toBe(50);
    });

    it('#onMouseMove should update max bullet with the nearest value', () => {
      const value = 98;
      component.onMouseDownMaxBullet();
      const event = createMouseEvent(value / 100);
      component.onMouseMove(event);
      expect(component.range[1]).toBe(99);
    });

    it('#onMouseMove should update max bullet and set to the min bullet value', () => {
      const value = 2;
      component.range[0] = 25;
      component.onMouseDownMaxBullet();
      const event = createMouseEvent(value / 100);
      component.onMouseMove(event);
      expect(component.range[1]).toBe(25);
    });

    it('#onMouseMove should update max bullet and set to the max valid value', () => {
      component.onMouseDownMaxBullet();
      const event = createMouseEvent(1.1);
      component.onMouseMove(event);
      expect(component.range[1]).toBe(component.max);
    });

    it('#onMouseMove should update max bullet when both have the same value', () => {
      const value = 80;
      component.range = [50, 50];
      component.onMouseDownMinBullet();
      const event = createMouseEvent(value / 100);
      component.onMouseMove(event);
      expect(component.range[0]).toBe(50);
      expect(component.range[1]).toBe(99);
    });
  });

  it('#onMouseMove should do nothing', () => {
    // onMouseDownMinBullet or onMouseDownMaxBullet is needed to update the range
    const event = createMouseEvent(0.5);
    component.onMouseMove(event);
    expect(component.range[0]).toBe(10);
    expect(component.range[1]).toBe(80);
  });

  it('#getBulletMinStyles should return a transformation', () => {
    component.range = [25, 50];
    const style = component.getBulletMinStyles();
    expect(style).not.toBeNull();
    expect(style.transform).toBe(
      `translateX(-${100 - component.range[0]}%)`
    );
  });

  it('#getBulletMaxStyles should return a transformation', () => {
    component.range = [30, 75];
    const style = component.getBulletMaxStyles();
    expect(style).not.toBeNull();
    expect(style.transform).toBe(
      `translateX(-${100 - component.range[1]}%)`
    );
  });
});
