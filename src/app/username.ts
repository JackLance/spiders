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
  "Shift+C: Copy        Shift+P: Preview\n"+
  "Shift+D: Duplicate   Shift+Q: Close All\n"+
  "Shift+E: Center      Shift+R: Rotate\n"+
  "Shift+F: Find        Shift+S: Shift\n"+
  "Shift+G: Go to       Shift+T: New tab\n"+
  "Shift+H: Replace     Shift+U: Underline\n"+
  "Shift+I: Insert      Shift+V: Paste\n"+
  "Shift+J: Justify     Shift+W: Close tab\n"+
  "Shift+K: Hyperlink   Shift+X: Cut\n"+
  "Shift+L: Left-align  Shift+Y: Redo\n"+
  "Shift+M: Minimize    Shift+Z: Undo\n";
  
  shift(letter, val){
    var code = letter.charCodeAt(0);

			if ((code >= 65) && (code <= 90))
				return String.fromCharCode(((code - 65 + val + 26) % 26) + 65);

			else if ((code >= 97) && (code <= 122))
				return String.fromCharCode(((code - 97 + val + 26) % 26) + 97);
  }

  func(cas, val){
    let val2 = "";
    switch(cas){
      case 65: //alternates
        let ch = 14
        let ah = [0, 4, 8, 14, 20];
        let bh = true;
        for(var i=val.length-1; i>=0; i--){
          let code = val.charCodeAt(i);
          if(code >= 65 && code <= 90){
            if(ah.includes(code-65)){
              if(bh){
                val2 += String.fromCharCode(65 + ch);
                ch = code-65;
              }
              else{
                val2 += val[i];
              }
              bh = !bh;
            }else{
              val2 += val[i];
            }
          }else{
            if(ah.includes(code-97)){
              if(bh){
                val2 += String.fromCharCode(97 + ch);
                ch = code-97;
              }
              else{
                val2 += val[i];
              }
              bh = !bh;
            }else{
              val2 += val[i];
            }
          }
        }
        return val2.split('').reverse().join('');
      case 66: //back
        return val.split('').reverse().join('');
      case 67: //copy
        for(var i=0; i<val.length; i++){
          val2 += val[i];
          if(i%4==2) val2 += val[i];
        }
        return val2;
      case 68: //duplicate
        if(val.length < 4) return val.slice(0,val.length-2)+val;
        return val.slice(0,val.length-1) + val.slice(0, 3);
      case 69: //center
        if(val.length<3) return val;
        if(val.length%2 == 0){
          return val.slice(1, val.length/2) + val[0] + val[val.length-1] + val.slice(val.length/2, val.length-1)
        } else{
          return val.slice(1, (val.length-1)/2) + val[0] + val[(val.length-1)/2] + val[val.length-1] + val.slice((val.length+1)/2, val.length-1)
        }
      case 70: //find
        let all = [];
        for(var i=0; i<val.length; i++){
          if(!all.includes(val[i])){
            val2+=val[i];
            all.push(val[i]);
          }else{
            val2+=this.shift(val[i],-1);
          }
        }
        return val2;
      case 71: //go to
        let ind = 0;
        for(var j = val.length-1; j>0; j--){
          if(val.charCodeAt(j)>=65 && val.charCodeAt(j)<=90){
            ind = j;
          }
        }
        return val.slice(ind, val.length) + val.slice(0, ind);
      case 72: //replace
        return val.replace(/e/ig, 'o');
      case 73: //insert
        return val[0] + val[val.length-2] + val.slice(1, val.length);
      case 74: //justify
         while(val.length < 20){val += val[val.length-1]};
         return val;
      case 75: //Hyperlink
        for(var i=0; i<val.length; i++){
          if(i%3==0){
            let cd = val.charCodeAt(i);
            if(cd >= 65 && cd <= 95){
              val2+=String.fromCharCode(cd+32)
            }else{
              val2+=String.fromCharCode(cd-32)
            }
          }else{
            val2+=val[i];
          }
          
        }
        return val2;
      case 76: //Left
        if(val.length %2 == 0) return val.slice(0, val.length/2);
        else return val.slice(0, (val.length+1)/2)
      case 77: //Minimize
        let ar = [];
        for(var i=0; i<val.length; i++){
          if(!ar.includes(val[i])) ar.push(val[i]);
        }
        return ar.sort().join('');
      case 78: //create New
        return val + 'new';
      case 79: //Open
        for(var i=0; i<val.length; i++){
          if(i%2 ==0 ) val2+=val[i]
          else val2+=val[i-1];
        }
        return val2;
      case 80: //preview
        return val.slice(val.length-3, val.length) + val.slice(0, val.length-3)
      case 81: //close all
        let cnt = {};
        let mxi = 0;
        for(var i=0; i<val.length; i++){
          if(!cnt[val[i]]) cnt[val[i]]=0;
          cnt[val[i]]++;
          if(cnt[val[i]]>mxi) mxi = cnt[val[i]];
        }
        for(var i=0; i<val.length; i++){
          if(cnt[val[i]] != mxi) val2+=val[i];
        }
        return val2;
      case 82: //refresh
        for(var i=0; i<val.length; i++){
          val2+=this.shift(val[i], 13);
        }
        return val2;
      case 83: //shift
        return this.shift(val[0], 1) + val.slice(1)
      case 84: //new Tab
        return 'tab' + val;
      case 85: //Underline
        for(var i=0; i<val.length; i++){

            let cd = val.charCodeAt(i);
            if(!(cd >= 65 && cd <= 95)){
              if(i==0 || !(val.charCodeAt(i-1)>=65 && val.charCodeAt(i-1)<=95)){
                val2+=val[i];
              }
            }else{
              val2+=String.fromCharCode(cd+32)
            }
          
        }
        return val2;
      case 86: //Paste
        return val+val;
      case 87: //close tab
        let ary = [0, 1, 19];
        for(var i=0; i<val.length; i++){
          let code = val.charCodeAt(i);
          if(code >= 65 && code <= 90){
            if(!ary.includes(code-65)){
              val2 += val[i];
            }
          }else{
            if(!ary.includes(code-97)){
              val2 += val[i];
            }
          }
        }
        return val2;
      case 88: //Cut
        return val.slice(1, val.length-1)
      case 89: //Redo
        if(val.length%3==0){
          let tr = val.length/3;
          return val.slice(2*tr, val.length)+val.slice(tr, 2*tr)+val.slice(0, tr)
        }
        if(val.length%3==1){
          let tr = (val.length-1)/3;
          return val.slice(2*tr+1, val.length)+val.slice(tr, 2*tr+1)+val.slice(0, tr)
        }
        if(val.length%3==2){
          let tr = (val.length+1)/3;
          return val.slice(2*tr-1, val.length)+val.slice(tr, 2*tr-1)+val.slice(0, tr)
        }
      case 90: //undo
        let id = 0;
        for(var i=1; i<val.length; i++){
          if(val.charCodeAt(i) <=90){
            id = i;
            break;
          }
        }
        if(id == 0) id = val.length;
        return val.slice(0, id).split('').reverse().join('') + val.slice(id, val.length);
    }
  }

  press(event){

    if(event.keyCode >= 65 && event.keyCode <= 90){
      this.control.setValue(this.func(event.keyCode,this.control.value))
      event.preventDefault();
    }
    //if ( event.keyCode == 97 ) {
    event.preventDefault();
    //}
  }

  click(){
    this.control.setValue('MemberUsername')
  }

  
}