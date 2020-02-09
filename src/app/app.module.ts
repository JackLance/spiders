import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { UsernameComponent } from './username';
import {MatInputModule} from '@angular/material/input';
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
  ],
  declarations: [ AppComponent, UsernameComponent ],
  bootstrap:    [ AppComponent, UsernameComponent ]
})
export class AppModule { }
