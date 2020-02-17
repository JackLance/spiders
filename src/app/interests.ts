import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'interests',
  templateUrl: './interests.html',
  styleUrls: [ './app.component.css' ]
})
export class InterestsComponent  {
  options = [
    'Bluebirds',
    'Greenpeace',
    'Orange juice',
    'Pink Floyd',
    'Purple heart',
    'Redshank',
    'Yellowstone',]
  code = [0,3,1,6,5]
  get asdf(){
    let guess = this.groups.map(x=>x.value.ctrl);
    let zero = 0;
    let one = 0;
    for(var i=0; i<4; i++){
      if(guess[i] == this.code[i]){
        zero++;
      }
      else if(guess.includes(this.code[i])){
        one++;
      }
    }
    let zeroes = [1,2,3,4,5];
    let ones = [6,7,8,9,10];
    let twos = [11,12,13,14,15];
    let three = []
    let two = 5-zero-one;
    while(zero>0){
      let ind = Math.floor(Math.random() * zeroes.length);
      three.push(zeroes[ind]);
      zeroes.splice(ind, 1);
      zero--;
    }
    while(one>0){
      let ind = Math.floor(Math.random() * ones.length);
      three.push(zeroes[ind]);
      ones.splice(ind, 1);
      one--;
    }
    while(two>0){
      let ind = Math.floor(Math.random() * twos.length);
      three.push(zeroes[ind]);
      twos.splice(ind, 1);
      two--;
    }
    return JSON.stringify(three)
  }
  groups = [
    new FormGroup({ctrl:new FormControl()}),
    new FormGroup({ctrl:new FormControl()}),
    new FormGroup({ctrl:new FormControl()}),
    new FormGroup({ctrl:new FormControl()}),
    new FormGroup({ctrl:new FormControl()})];
  constructor(){
    for(let group of this.groups){
      group.controls['ctrl'].setValidators(Validators.required)
    }
  }

  goForward(stepper: MatStepper){
    setTimeout(()=>stepper.next(),300);
}
}