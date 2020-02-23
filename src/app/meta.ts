import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';

@Component({
  selector: 'metasdf',
  templateUrl: './meta.html',
  styleUrls: [ './different.css' ]
})
export class MetaComponent  {
  a = new FormControl();
  b = new FormControl();
  c = new FormControl();
  d = new FormControl();
  e = new FormControl();
  f = new FormControl();
  g = new FormControl();
  h = new FormControl();
  i = new FormControl();
  makeCap(fc, i){
    i--;
    let s = '';
    let t = fc.value;
    for(var j=0; j<t.length; j++){
      if(j!=i){
        s+=t[j].toLowerCase();
      }else{
         s+=t[j].toUpperCase();
      }
    }
    fc.setValue(s);
  }
  makeAllCap(fc){
    let s = '';
    let t = fc.value;
    let b = true;
    for(var j=0; j<t.length; j++){
      if(b)
         s+=t[j].toUpperCase();
      if(!b)
         s+=t[j].toLowerCase();
      if(t[j].toLowerCase() === t[j].toUpperCase()){
        b = false;
      }
        
    }
    fc.setValue(s);
  }
}

