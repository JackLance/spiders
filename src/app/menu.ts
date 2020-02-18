import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'menu',
  templateUrl: './menu.html',
  styleUrls: [ './app.component.css' ]
})
export class MenuComponent  {
  
  names=[['a', ['as', 'ad']],['s', ['sa', 'sd']],['d', ['da', 'ds']]];
  menus = {}
  init(a, s){
    this.menus[s] = a;
  }

  asdf(x){
    return x;
  }

  addChildren(){

  }
}