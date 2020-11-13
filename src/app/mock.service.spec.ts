import { TestBed } from '@angular/core/testing';
import { MockService } from './mock.service';

describe('MockService', () => {
  let service: MockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getMinAndMaxValues should return 1 and 100', () => {
    const res = service.getMinAndMaxValues();
    expect(res).toBeDefined();
    expect(res.min).toBe(1);
    expect(res.max).toBe(100);
  });

  it('getFixedValuesRange should return an array of values', () => {
    const res = service.getFixedValuesRange();
    expect(res).toBeDefined();
    expect(res.length).toBe(6);
  });
});
