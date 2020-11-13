import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockService {
  public getMinAndMaxValues(): { min: number; max: number } {
    return { min: 1, max: 100 };
  }

  public getFixedValuesRange(): number[] {
    return [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];
  }
}
