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
    let del = e.value - (this.a + this.b+1);
    if(this.inBd(this.a+del, this.b, this.c)) 
      this.a += del;
    this.recalc();
    
  }

  bb(e){
    let del = e.value - (-this.a+this.b+this.c+1);
    if(this.inBd(this.a, this.b+del, this.c)) 
    this.b += del;
        this.recalc();

  }

  cc (e){
    let del = e.value - (this.a-this.b + this.c+1);
    if(this.inBd(this.a, this.b, this.c+del)) 
    this.c += del;
        this.recalc();

  }

  inBd(m, n, o){
    if(m+n < -1) return console.log('fals1e');
    if(m+n > 30) return console.log('fals2e');
    if(-m + n + o < -1) return console.log('fa3lse');
    if(-m + n + o > 11) return console.log('fa4lse');
    if(m-n + o < -1) return console.log('fal5se');
    if(m-n + o > 99) return console.log('fal6se');
    return true;
  }

  recalc(){
    this.slideA.value = this.a + this.b+1;
    this.slideB.value = (-this.a+this.b+this.c+1);
    this.slideC.value = this.a-this.b + this.c+1;

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
    return ['',"jan", 'feb', 'mar', "apr", 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'][val];
  }

  yearLabel(val){
    if(val==0) return '';
    if(val<10) return "'0" + val;
    else return "'" + val;
  }
}
