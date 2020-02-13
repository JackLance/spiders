import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';

@Component({
  selector: 'password',
  templateUrl: './password.html',
  styleUrls: [ './app.component.css' ]
})
export class PasswordComponent  {
  control = new FormControl();
  
  constructor(){
    this.control.setValidators(this.validate)
  }

  validate(val){
    const dict = ["executive"]

    val = val.value as string;
    if(val == undefined) return {z:true};
    if(!(val.length > 6 && val.length < 12)){
      return {a:true};
    }
    let first = false;
    let  second = false;
    for(var i=0; i<val.length; i++){
      if(val[i] == val[i].toLowerCase() && val[i] != val[i].toUpperCase()) first = true;
      if(val[i] != val[i].toLowerCase() && val[i] == val[i].toUpperCase()) second = true;
    }
    if(!first || !second) return {b:true};

    if(!dict.includes(val.toLowerCase())) return {c:true};
    //c
    let lt = ['l','e','t','r','s'];
    let nm = ['n','u','m','b','e','r','s'] ;
    let ltcount = 0;
    let nmcount = 0;
    for(let letter of lt){
      if(val.toLowerCase().includes(letter)) ltcount++;
    }
    for(let letter of nm){
      if(val.toLowerCase().includes(letter)) nmcount++;
    }
    if(ltcount<2 || nmcount<2) return {d:true}
    let lines = {A:3, a:1, B:1, b:1, C:0, c:0, D:1, d:1, E:4, e:1, F:3, f:1, G:1, g:0, H:3, h:1, I:1, i:1, J:1, j:0, K:3, k:3, L:2, l:1, M:4, m:1, N:3, n:1, O:0, o:0, P:1, p:1, Q:1, q:1, R:2, r:1, S:0, s:0, T:2, t:2, U:0, u:1, V:2, v:2, W:4, w:4, X:2, x:2, Y:3, y:2, Z:3, z:3};
    let total = 0;
    for(var i=0; i<val.length; i++){
      total+=lines[val[i]];
    }
    if(total<18) return {e:true};
    if(val[0] != val[val.length-1]) return {f:true}
    for(var i=1; i<val.length; i++){
      let x = val[i].toLowerCase();
      let y = val[i-1].toLowerCase();
      let vw = ['a','e','i','o','u'];
      if(x!='y' && y!='y' && vw.includes(x)==vw.includes(y)) return {g:true}
    }
    lines = {a:1, b:3, c:3, d:2, e:1, f:4, g:2, h:4, i:1, j:10, k:5, l:1, m:3, n:1, o:1, p:3, q:10, r:1, s:1, t:1, u:1, v:4, w:4, x:8, y:4, z:10};
     total = 0;
    for(var i=0; i<val.length; i++){
      total+=lines[val[i].toLowerCase()];
    }
    if(total<18) return {h:true};
    let row = ['a','s','d','f','g','h','j','k','l'];
    for(let ltr of row){
      if(val.toLowerCase().includes(ltr)) return {i:true};
    }
    return undefined;
  }

  
}