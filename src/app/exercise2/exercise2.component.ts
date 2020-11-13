import { Component, OnInit } from '@angular/core';
import { MockService } from '../mock.service';
@Component({
  templateUrl: './exercise2.component.html',
})
export class Exercise2Component implements OnInit {
  constructor(private mockService: MockService) {}

  public values: number[];
  public range: [number, number];

  ngOnInit(): void {
    this.values = this.mockService.getFixedValuesRange().sort();
    this.range = [this.values[0], this.values[this.values.length - 1]];
  }
}
