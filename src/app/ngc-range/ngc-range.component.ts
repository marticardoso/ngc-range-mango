import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ngc-range',
  templateUrl: './ngc-range.component.html',
  styleUrls: ['./ngc-range.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgcRangeComponent),
      multi: true,
    },
  ],
})
export class NgcRangeComponent implements OnInit, ControlValueAccessor {
  constructor() {}

  ngOnInit(): void {
    if (this.isFixedType) {
      this.values = this.values.sort();
      this.min = this.values[0];
      this.max = this.values[this.values.length - 1];
    }
    //Initialize range
    if (!this.range) {
      this.range = [this.min, this.max];
      this.emitChanges();
    }
  }

  @Input()
  public min: number = 0;

  @Input()
  public max: number = 100;

  // Range is an array of length 2: [Min, Max]
  public range: [number, number];

  @Output()
  public rangeChange = new EventEmitter<number[]>();

  @Input()
  public type: string = 'normal'; //values: "normal" or "fixed"

  @Input()
  public values: number[] = [1, 100]; // Only used for fixed type

  public get isFixedType() {
    return this.type == 'fixed';
  }

  public onMinValueChange(value: number): void {
    // Range.Min has to be lower than Range.Max and larger than Min input
    if (this.min > value) {
      this.range[0] = this.min;
    } else if (value < this.range[1]) {
      this.range[0] = value;
    } else {
      this.range[0] = this.range[1];
    }
    this.emitChanges();
  }

  public onMaxValueChange(value: number): void {
    // Range.Max has to be larger than Range.Min and lower than Max input
    if (this.max < value) {
      this.range[1] = this.max;
    } else if (value > this.range[0]) {
      this.range[1] = value;
    } else {
      this.range[1] = this.range[0];
    }
    this.emitChanges();
  }

  public onRangeChange(range: [number, number]): void {
    this.range = range;
    this.emitChanges();
  }

  private emitChanges(): void {
    this.onChange(this.range);
    this.rangeChange.emit(this.range);
  }

  //NgModel
  onChange = (_: any) => {};
  onTouch = () => {};

  writeValue(value: any): void {
    if (this.isValidRange(value)) {
      this.range = value;
    } else {
      this.range = [this.min, this.max]; //Default values
    }
    this.rangeChange.emit(this.range);
  }

  private isValidRange(value: any) {
    return (
      value &&
      Array.isArray(value) &&
      value.length == 2 &&
      value.every((v) => typeof v == 'number')
    );
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
