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
  a = 0;
  b = 0;
  c = 0;
  slideA;
  slideB;
  slideC;

  init(x, y, z){
    this.slideA = x;
    this.slideB = y;
    this.slideC = z;
  }
  aa(e){
    let del = e.value - (this.a + 2*this.b - 0.5 * this.c);
    this.a += del;
    this.recalc();
  }

  bb(e){
    let del = e.value - (-this.a+this.b+this.c);
    this.b += del;
        this.recalc();

  }

  cc (e){
    let del = e.value - (2*this.a + 4*this.b + this.c);
    this.c += del;
        this.recalc();

  }

  recalc(){
    this.slideA.value = this.a + 2*this.b - 0.5 * this.c;
    this.slideB.value = (-this.a+this.b+this.c);
    this.slideC.value = 2*this.a + 4*this.b + this.c;

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
