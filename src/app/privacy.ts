import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'privacy',
  templateUrl: './privacy.html',
  styleUrls: [ './app.component.css' ]
})
export class PrivacyComponent  {
  displayedColumns = ['Title', '0', '1', '2', '3', '4', 'reset']
  stuff = ["...friends", "...family", "...acquaintances", "...strangers", "...nemeses"]
  data =  [{pos:0, name: "Likes and dislikes", 0:true, 1:true, 2:false, 3:true, 4:true}]
  dataSource = new MatTableDataSource<any>(this.data);   
  dataSource2 = [{pos:0, name: "Likes and dislikes", 0:true, 1:true, 2:false, 3:true, 4:true},
                {pos:1, name: "Known information", 0:false, 1:false, 2:true, 3:false, 4:true},
                {pos:2, name: "Wishes, thoughts, and secrets", 0:false, 1:false, 2:true, 3:true, 4:false},
                {pos:3, name: "Location at all times", 0:false, 1:false, 2:true, 3:true, 4:false}]

  propagate = [
    [[1], [2], [3], [4], []],
    [[],[0],[0,1],[0,1,2],[0,1,2,3]],
    [[1, 4], [0, 2], [1,3], [2, 4], [0, 3]],
    [[1, 2], [0, 2, 3], [0, 1, 3, 4], [1, 2, 4], [2, 3]],
  ]
  toggle(x, y){
    console.log(x);
    for(var i of this.propagate[x][y]){
      this.data[x][i] = !this.data[x][i];
    }
    this.data[x][y] = !this.data[x][y];
    for(var i in ['a','n','s','w','e']){
      
      if(this.data[x][i]) return;
    }
    if((x+1) != this.data.length || x==3) return;
    this.data.push(JSON.parse(JSON.stringify(this.dataSource2[x+1])));
    console.log(this.data);
    this.dataSource = new MatTableDataSource<any>(this.data);   

  }

  reset(x){
    
    this.data[x] = JSON.parse(JSON.stringify(this.dataSource2[x]));
    this.dataSource = new MatTableDataSource<any>(this.data);   
  }
}