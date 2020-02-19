import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatMenu} from '@angular/material/menu';

@Component({
  selector: 'menu',
  templateUrl: './menu.html',
  styleUrls: [ './app.component.css' ]
})
export class MenuComponent  {
  
  nexts = {
    'a': ['s', 'd'],
    's': ['a', 'd'],
    'd': ['a', 's'],
    'start': ['a', 's', 'd', 'asdfasdf']
  }
  namesT = []
  names = [['start']]
  menus = {}
  ready = {}
  init(a, s){
    this.menus[s.join('')] = a;
  }

  init2(a, s){
    let end = s[s.length-1];
    for(let next of this.nexts[end]){
      let newone = s.slice();
      if(!tnexts[next]) continue;
      newone.push(next);
      if(this.namesT.includes(newone.join())) return;
      this.names.push(newone);
      this.namesT.push(newone.join())
      //this.menus[newone] = new MatMenu();
    }
    setTimeout(()=>{this.ready[s] = true}, 10);
  }


  asdf(x){
    return x;
  }

  idk(menu){
    return (menu.length%4==1||menu.length%4==2)?'above':'below';
  }

  idk2(menu){
    return (menu.length%4>1)?'after':'before';
  }
}