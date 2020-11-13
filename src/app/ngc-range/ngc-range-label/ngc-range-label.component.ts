import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ngc-range-label',
  templateUrl: './ngc-range-label.component.html',
  styleUrls: ['./ngc-range-label.component.scss'],
})
export class NgcRangeLabelComponent {
  @Input()
  public value: number;

  @Output()
  public valueChange = new EventEmitter<number>();

  @Input()
  public disabled: boolean = false;

  public get label(): string {
    return (this.value ?? 0) + '€';
  }

  public editedValue: number;
  public isEditing: boolean = false;

  public labelDblClick(): void {
    if (!this.disabled) {
      this.isEditing = true;
      this.editedValue = this.value;
    }
  }

  public onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.emitChanges();
    }
  }

  public emitChanges(): void {
    this.isEditing = false;
    if (this.editedValue != this.value) {
      this.valueChange.emit(this.editedValue);
    }
  }
}
