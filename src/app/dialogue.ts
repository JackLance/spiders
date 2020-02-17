import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'dialogue',
  templateUrl: './dialogue.html',
  styleUrls: [ './app.component.css' ]
})
export class DialogueComponent  {
  constructor(public dialogRef: MatDialogRef<DialogueComponent>){}


  //I know i know ok stop judging my code dude
  arr = [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[5,0],[5,1],[5,2],[5,3],[5,4],[5,5]];
  vals = [[{},{},{},{},{},{}],[{},{},{},{},{},{}],[{},{},{},{},{},{}],[{},{},{},{},{},{}],[{},{},{},{},{},{}],[{},{},{},{},{},{}]]
  srcs=[
  ["https://i.imgur.com/9Xdvv8P.png","https://i.imgur.com/nOvrnAZ.png","https://i.imgur.com/PPKY5x0.png","https://i.imgur.com/iBvNlMn.png","https://i.imgur.com/0XesJ9N.png","https://i.imgur.com/R5ciihW.png"],
  ["https://i.imgur.com/0XesJ9N.png","https://i.imgur.com/PPKY5x0.png","https://i.imgur.com/zAVjKxg.png","https://i.imgur.com/PPKY5x0.png","https://i.imgur.com/LbAy6RO.png","https://i.imgur.com/3ew4gOf.png" ],
  ["https://i.imgur.com/am7QVsB.png","https://i.imgur.com/nOvrnAZ.png","https://i.imgur.com/N6SASYc.png","https://i.imgur.com/SabBB37.png","https://i.imgur.com/29hlLo2.png","https://i.imgur.com/N6SASYc.png"],
  ["https://i.imgur.com/0XesJ9N.png","https://i.imgur.com/vUGcwSZ.png","https://i.imgur.com/0XesJ9N.png","https://i.imgur.com/nOvrnAZ.png","https://i.imgur.com/hNNoZ3y.png","https://i.imgur.com/9Xdvv8P.png"],
  ["https://i.imgur.com/FIuR4ox.png","https://i.imgur.com/LbAy6RO.png","https://i.imgur.com/N6SASYc.png","https://i.imgur.com/nOvrnAZ.png","https://i.imgur.com/0XesJ9N.png","https://i.imgur.com/FIuR4ox.png" ],
  ["https://i.imgur.com/PPKY5x0.png","https://i.imgur.com/SabBB37.png","https://i.imgur.com/Co81hnW.png","https://i.imgur.com/PPKY5x0.png","https://i.imgur.com/VFHwpbd.png","https://i.imgur.com/0XesJ9N.png"]]

  curx = undefined;
  cury = undefined;
  adj(b, c){
    return this.curx==undefined || (Math.abs(this.curx-b) + Math.abs(this.cury-c) == 1);
  }

  process(a, b, c){
    console.log(a);
    if(this.adj(b, c)){
      this.curx = b;
      this.cury = c;
      this.vals[b][c].ok = true;
    }
    
  }

  check(){
    var bad = [3, 11, 12, 19, 22];
    this.dialogRef.close();
    let asdf = true;
    for(var i=0; i<36; i++){
      
      if(bad.includes(i)){
        if(this.vals[this.arr[i][0]][this.arr[i][1]].ok){
          
          asdf=false;
        }
      }
      else{
        if(!this.vals[this.arr[i][0]][this.arr[i][1]].ok){
         asdf=false;
        }
      } 
    }
    
     this.dialogRef.close(asdf);
  }
}