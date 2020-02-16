import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';

@Component({
  selector: 'interests',
  templateUrl: './interests.html',
  styleUrls: [ './app.component.css' ]
})
export class InterestsComponent  {
}