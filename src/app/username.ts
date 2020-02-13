import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';

@Component({
  selector: 'username',
  templateUrl: './username.html',
  styleUrls: [ './app.component.css' ]
})
export class UsernameComponent  {
  control = new FormControl();
  
  constructor(){
  }

  info="Keyboard shortcuts are enabled:\n\n" + 
  "(WARNING: You don't need to press Crtl or Alt\n"+
  "and you may refresh or close the page if you do)\n\n"+
  "Shift+A: Alternates  Shift+N: Create new\n"+
  "Shift+B: Back        Shift+O: Open\n"+
  "Shift+C: Copy        Shift+P: Print\n"+
  "Shift+D: Duplicate   Shift+Q: Close All\n"+
  "Shift+E: Center      Shift+R: Refresh\n"+
  "Shift+F: Search      Shift+S: Shift\n"+
  "Shift+G: Go to       Shift+T: New tab\n"+
  "Shift+H: Replace     Shift+U: Underline\n"+
  "Shift+I: Insert      Shift+V: Paste\n"+
  "Shift+J: Justify     Shift+W: Close\n"+
  "Shift+K: Hyperlink   Shift+X: Cut\n"+
  "Shift+L: Left        Shift+Y: Redo\n"+
  "Shift+M: Minimize    Shift+Z: Undo\n";
  
  func(cas, val){
    switch(cas){
      case 65: //alternates

        break;
      case 66: //back
        return val.split('').reverse().join('');
        break;
      case 67: //copy
        let val2 = "";
        for(var i=0; i<val.length; i++){
          val2 += val[i];
          if(i%3==2) val2 += val[i];
        }
        return val2;
      case 68: //duplicate
        if(val.length < 4) return val.slice(0,val.length-2)+val;
        return val.slice(0,val.length-1) + val.slice(0, 3);
      case 
    }
  }

  press(event){

    console.log(event)
    if(event.keyCode >= 65 && event.keyCode <= 80){
      this.control.setValue(this.func(event.keyCode,this.control.value))
      event.preventDefault();
    }
    //if ( event.keyCode == 97 ) {
    //     event.preventDefault();
    //}
  }

  click(){
    this.control.setValue('MemberUsername')
  }

  
}