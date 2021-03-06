import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatStepperModule} from '@angular/material/stepper';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select'; 
import {MatTooltipModule} from '@angular/material/tooltip'; 
import { AppComponent } from './app.component';
import { UsernameComponent } from './username';
import { InterestsComponent } from './interests';
import { PrivacyComponent } from './privacy';
import {MatMenuModule} from '@angular/material/menu'; 
import { CaptchaComponent } from './captcha';
import { PrimeComponent } from './prime';
import { PasswordComponent } from './password';
import { DialogueComponent } from './dialogue';
import { MenuComponent } from './menu';
import { MetaComponent } from './meta';
import { PageComponent } from './page';

import { BirthdayComponent } from './birthday';

import {MatTableModule} from '@angular/material/table'; 
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider'; 
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports:      [ 
    BrowserModule, 
  FormsModule, 
  ReactiveFormsModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatChipsModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatRadioModule,
  MatDialogModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatMenuModule,
  BrowserAnimationsModule,
  MatTableModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatStepperModule,
  MatSliderModule,
  MatGridListModule,
  MatSelectModule,
  MatTooltipModule,
  ],
  entryComponents: [CaptchaComponent, DialogueComponent],
  declarations: [ 
    AppComponent, 
    UsernameComponent, 
    PrivacyComponent, 
    BirthdayComponent,  
    PrimeComponent,
    InterestsComponent,
    PageComponent,
    PasswordComponent,
    CaptchaComponent,
    DialogueComponent,
    MenuComponent,
    MetaComponent,
 ],
  bootstrap:    [ 

   PageComponent,

]
})
export class AppModule { }
