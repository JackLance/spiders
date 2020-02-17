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

  get asdf(){
    return JSON.stringify(this.groups.map(x=>x.value);
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