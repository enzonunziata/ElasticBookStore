import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss'],
})
export class StarsComponent {
  private readonly EMPTY = 'bi-star';
  private readonly HALF = 'bi-star-half';
  private readonly FILL = 'bi-star-fill';

  private _value: number = 0;
  classes: string[] = new Array(5).fill(this.EMPTY);

  @Input()
  get value() {
    return this._value;
  }
  set value(val: number) {
    this._value = parseFloat(val.toFixed(1));
    let lastIndex = Math.floor(this._value);
    for (let i = 0; i < lastIndex; i++) {
      this.classes[i] = this.FILL;
    }

    let decimal = this._value % 1;
    if (decimal >= 0.2 && decimal <= 0.8) {
      this.classes[lastIndex] = this.HALF;
    } else if (decimal > 0.8) {
      this.classes[lastIndex] = this.FILL;
    }
  }

  @Input() count: number = 0;
}
