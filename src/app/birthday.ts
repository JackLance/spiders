import {Component} from '@angular/core';

/**
 * @title Slider with custom thumb label formatting.
 */
@Component({
  selector: 'birthday',
  templateUrl: 'birthday.html',
  styleUrls: ['./app.component.css'],
})
export class BirthdayComponent {
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'asdk';
    }

    return value;
  }
}
