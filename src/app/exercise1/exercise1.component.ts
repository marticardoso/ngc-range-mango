import { Component, OnInit } from '@angular/core';
import { MockService } from '../mock.service';

@Component({
  templateUrl: './exercise1.component.html',
})
export class Exercise1Component implements OnInit {
  constructor(private mockService: MockService) {}

  public min: number;
  public max: number;
  public range: [number, number];

  ngOnInit(): void {
    const minMax = this.mockService.getMinAndMaxValues();
    this.min = minMax.min;
    this.max = minMax.max;
    this.range = [this.min, this.max];
  }
}
