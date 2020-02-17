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
  a = 1;
  b = 1;
  c = 1;

  bb(e){
    console.log(e);
  }

  dayLabel(val){
    if(val==0) return '';
    if(val == 1 || val == 21 || val==31) return val + 'st';
    if(val == 2 || val == 22) return val + 'nd';
    if(val == 3 || val == 23) return val + 'rd';
    this.c = 5;
    return val+'th';

  }

  monthLabel(val){
    return ['',"Jan", 'Feb', 'Mar', "Apr", 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][val];
  }

  yearLabel(val){
    if(val==0) return '';
    if(val<10) return "'0" + val;
    else return "'" + val;
  }
}
