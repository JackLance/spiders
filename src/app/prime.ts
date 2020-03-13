import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'prime',
  templateUrl: './prime.html',
  styleUrls: [ './app.component.css' ]
})
export class PrimeComponent  {
  control = new FormControl();

  toppingList = [
    {val:5, txt:"Animated Account Avatar"},
    {val:13, txt:"Custom Character Creation"},
    {val:2, txt:"Discounted Data Downloads"},
    {val:23, txt:"Enable Email Emoji"},
    {val:19, txt:"Free First-class Features"},
    {val:11, txt:"Improved Internet Interface"},
    {val:37, txt:"Key Knowledge Kilobytes"},
    {val:17, txt:"Low Latency Livestreaming"},
    {val:31, txt:"Personalized Profile Pic"},
    {val:3, txt:"Substantial Storage Space"},
    {val:7, txt:"Top Tier Texting"},
    {val:29, txt:"Unlimited User Uploads"},
  ];
  
  tiers = [
    {txt:"Basic account", min:1, },
    {txt:"Bronze account", min:11},
    {txt:"Mega bronze plus account", min:55},
    {txt:"Silver account", min:111},
    {txt:"Mega silver plus account", min:222},
    {txt:"Gold account", min:555},
    {txt:"Mega gold plus account", min:1111},
    {txt:"Platinum account", min:5555},
    {txt:"Mega platinum plus account", min:11111},
    {txt:"Platinum diamond account", min:55555},
    {txt:"Mega platinum diamond plus account", min:111111},
    {txt:"Max account", min:111112},   
    {txt:"Mega max plus account", min:1111111},
  ]

  compute(selection){
    if(selection){
      let a = 1;
      for(let i of selection){a*=i.val}
      for(var i=0; i<this.tiers.length-1; i++){
        if(a >= this.tiers[i].min &&  a<this.tiers[i+1].min){
          return this.tiers[i].txt + " (" + this.tiers[i].min+"$ - " + (this.tiers[i+1].min-1) + "$)"
        }
      }
      return "Max Plus Account ($1111111 & up)";
    }
  }
}

