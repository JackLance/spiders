import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select'; 
import { AppComponent } from './app.component';
import { UsernameComponent } from './username';
import { PrivacyComponent } from './privacy';
import { PrimeComponent } from './prime';

import { BirthdayComponent } from './birthday';

import {MatTableModule} from '@angular/material/table'; 
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button'; 


import {MatSliderModule} from '@angular/material/slider'; 
@NgModule({
  imports:      [ 
    BrowserModule, 
  FormsModule, 
  ReactiveFormsModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatChipsModule,
  MatSlideToggleModule,
  MatCardModule,
  MatInputModule,
  BrowserAnimationsModule,
  MatTableModule,
  MatButtonModule,
  MatSliderModule,
  MatSelectModule,
  ],
  declarations: [ 
    AppComponent, 
    UsernameComponent, 
    PrivacyComponent, 
    BirthdayComponent,  
    PrimeComponent,
 ],
  bootstrap:    [ 
   AppComponent,
   UsernameComponent , 
   PrivacyComponent, 
   BirthdayComponent,  
   PrimeComponent,
]
})
export class AppModule { }
