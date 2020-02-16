import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogueComponent} from './dialogue'
@Component({
  selector: 'captcha',
  templateUrl: './captcha.html',
  styleUrls: [ './app.component.css' ]
})
export class CaptchaComponent  {
  asdf='check'

  constructor(public dialog: MatDialog) {}

  toLoad(){
    this.asdf='loading'
    setTimeout(()=>{
        const dialogRef = this.dialog.open(DialogueComponent, {
          width: '250px',
        });
        dialogRef.afterClosed().subscribe(result => {
          this.asdf = 'check';
        });
    }, 1000);
  }
}