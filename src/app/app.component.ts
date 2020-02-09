import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  myControl = new FormControl();
  options: string[] = ['Luminous Keyboard', 'Emoji Screenreader', 'Multisensory Audio', 'Automatic Reminders', 'Amplified Renderings', 'Colorblind Touchscreen', 'Microphone Viewer', 'Monitor Detection', 'Submliminal Messages', 'Magnified GIFs'];
  filteredOptions: Observable<string[]>;
  selected = [];
   @ViewChild('input') input: ElementRef;
   @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;



  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filter(value))
      );
  }

  hasSubstr(str1, str2){
    var i = 0;
    var j = 0;
    while(i < str1.length && j<str2.length){
      if(str1[i] == str2[j]){
        i++;
        j++;
      }
      else {
        i++;
      }
    }
    if(j == str2.length) return true;
    return false;
  
  }

  select(event){
    this.selected = [event.option.value];
    this.input.nativeElement.value = "";
    this.input.nativeElement.blur();
  }

  clearChips(event){
    //this.selected = []
    this.input.nativeElement.value = "";
    this.myControl.setValue("");
  }

  selectChips(event){
    this.selected = this.filter(event.target.value);
    this.input.nativeElement.value = "";
    this.input.nativeElement.blur();
    this.autocomplete.closePanel();
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => this.hasSubstr(option.toLowerCase(), filterValue));
  }
}
