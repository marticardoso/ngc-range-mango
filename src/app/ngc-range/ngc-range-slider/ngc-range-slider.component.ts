import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'ngc-range-slider',
  templateUrl: './ngc-range-slider.component.html',
  styleUrls: ['./ngc-range-slider.component.scss'],
})
export class NgcRangeSliderComponent implements OnInit {
  @Input()
  public min: number;

  @Input()
  public max: number;

  @Input()
  public range: [number, number];

  @Output()
  public rangeChange = new EventEmitter<[number, number]>();

  @Input()
  public values: number[] = [];

  @Input()
  public isFixedType: boolean = false;

  @ViewChild('ngcRangeWrapper') private ngcRange: ElementRef;

  private get ngcRangeDimensions() {
    return this.ngcRange
      ? this.ngcRange.nativeElement.getBoundingClientRect()
      : null;
  }

  ngOnInit(): void {
    if (!this.range) {
      this.range = [this.min, this.max];
    }
  }

  private isSlidingMin: boolean = false;
  private isSlidingMax: boolean = false;

  //Field used when both bullets have the same value,
  // then the move direction will decide the sliding bullet (min or max).
  private bothBulletsHadSameValueWhenClicked: boolean = false;

  // When sliding a bullet, the editingRange is used in order to show more fluidity in animations
  // (especially for the fixed case)
  private editingRange: [number, number];

  public onMouseDownMinBullet() {
    this.isSlidingMin = true;
    this.editingRange = [...this.range];
    this.bothBulletsHadSameValueWhenClicked = this.range[0] == this.range[1];
  }

  public onMouseDownMaxBullet() {
    this.isSlidingMax = true;
    this.editingRange = [...this.range];
    this.bothBulletsHadSameValueWhenClicked = this.range[0] == this.range[1];
  }

  public onMouseMove(event: MouseEvent): void {
    if (this.isSlidingMin || this.isSlidingMax) {
      this.updateValueFromPosition({ x: event.clientX, y: event.clientY });
      event.preventDefault();
    }
  }

  public onMouseUp(): void {
    this.isSlidingMax = false;
    this.isSlidingMin = false;
  }

  private updateValueFromPosition(pos: { x: number; y: number }) {
    if (!this.ngcRangeDimensions) {
      return;
    }

    // Value calculated from click position and wrapper dimensions.
    let percent =
      (pos.x - this.ngcRangeDimensions.left) / this.ngcRangeDimensions.width;

    let newValue: number;
    if (percent <= 0) {
      newValue = this.min;
    } else if (percent >= 1) {
      newValue = this.max;
    } else {
      // From percentage to range values
      newValue = this.calculateRangeValue(percent);
    }

    //Case when both bullets had the same range value when clicked.
    if (this.bothBulletsHadSameValueWhenClicked) {
      this.bothBulletsHadSameValueWhenClicked = false;
      this.isSlidingMin = newValue < this.range[0];
      this.isSlidingMax = !this.isSlidingMin;
    }

    const validValue = this.mapToValidRangeValue(newValue);

    if (this.isSlidingMin) {
      this.range[0] = Math.min(validValue, this.range[1]);
      this.editingRange[0] = Math.min(newValue, this.editingRange[1]);
    } else if (this.isSlidingMax) {
      this.range[1] = Math.max(validValue, this.range[0]);
      this.editingRange[1] = Math.max(newValue, this.editingRange[0]);
    }
    this.rangeChange.emit(this.range);
  }

  private mapToValidRangeValue(rangeValue: number): number {
    if (this.isFixedType) {
      //Fixed type => Find the nearest value
      return this.values.reduce(
        (nearest, value) =>
          Math.abs(nearest - rangeValue) > Math.abs(value - rangeValue)
            ? value
            : nearest,
        Infinity
      );
    } else {
      //Normal type => round to integer
      return Math.round(rangeValue);
    }
  }

  /** Calculates the range value [min,max] given a percentage [0,1]. */
  private calculateRangeValue(percentage: number) {
    return this.min + percentage * (this.max - this.min);
  }

  /** Calculates the percentage [0,1] given a range value [min,max]. */
  private calculatePercentage(value: number) {
    return (value - this.min) / (this.max - this.min);
  }

  public getBulletMinStyles(): { [key: string]: string } {
    let minValue =
      this.isSlidingMin && this.editingRange
        ? this.editingRange[0]
        : this.range[0];
    let offset = (1 - this.calculatePercentage(minValue)) * 100;
    return {
      transform: `translateX(-${offset}%)`,
    };
  }

  public getBulletMaxStyles(): { [key: string]: string } {
    let maxValue =
      this.isSlidingMax && this.editingRange
        ? this.editingRange[1]
        : this.range[1];
    let offset = (1 - this.calculatePercentage(maxValue)) * 100;
    return {
      transform: `translateX(-${offset}%)`,
    };
  }
}
