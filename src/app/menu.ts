import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatMenu} from '@angular/material/menu';

@Component({
  selector: 'menu',
  templateUrl: './menu.html',
  styleUrls: [ './app.component.css' ]
})
export class MenuComponent  {
  nexts = {
    'lookpit':['There\'s the code 917 written on the wall.', 'You have no way to escape this pit'],
    'intopit':['You\'re at the bottom of a pit, you can\'t get out', ['Look around.', 'lookpit']],
    'fallpit':['Oof, that was quite a fall.', 'You landed on the bottom of the pit, and you\'re lying down', ['Get up.', 'intopit']],
    'pit':['You can almost see to the bottom of the pit', 'it looks like there\'s something written down there.','But it\'s too deep to get out of once you get in', ['Jump into pit', 'fallpit'], ['Return', 'rightwall']],
    'frontwall': ['In front of you, you see a stack of hay', ['Examine hay stack', 'haystack'],['Turn left', 'leftwall'], ['Turn right', 'rightwall']],
    'haystack': ['There\'s a lot of hay...'],
    'safe':['There\'s a safe with a three digit combination lock', 'There\'s also a sticky note on the safe', ['Try combination', 'safecombo'], ['Examine sticky note', 'sticky'], ['Return', 'rightwall']],
    'safecombo':[['0','a0'], ['1','a1'], ['2','a2'], ['3','a3'], ['4','a4'], ['5','a5'], ['6','a6'], ['7','a7'], ['8','a8'], ['9','x9']],
    'a0':[['0','b0'], ['1','b1'], ['2','b2'], ['3','b3'], ['4','b4'], ['5','b5'], ['6','b6'], ['7','b7'], ['8','b8'], ['9','b9']],
    'a1':[['0','b0'], ['1','b1'], ['2','b2'], ['3','b3'], ['4','b4'], ['5','b5'], ['6','b6'], ['7','b7'], ['8','b8'], ['9','b9']],
    'a2':[['0','b0'], ['1','b1'], ['2','b2'], ['3','b3'], ['4','b4'], ['5','b5'], ['6','b6'], ['7','b7'], ['8','b8'], ['9','b9']],
    'a3':[['0','b0'], ['1','b1'], ['2','b2'], ['3','b3'], ['4','b4'], ['5','b5'], ['6','b6'], ['7','b7'], ['8','b8'], ['9','b9']],
    'a4':[['0','b0'], ['1','b1'], ['2','b2'], ['3','b3'], ['4','b4'], ['5','b5'], ['6','b6'], ['7','b7'], ['8','b8'], ['9','b9']],
    'a5':[['0','b0'], ['1','b1'], ['2','b2'], ['3','b3'], ['4','b4'], ['5','b5'], ['6','b6'], ['7','b7'], ['8','b8'], ['9','b9']],
    'a6':[['0','b0'], ['1','b1'], ['2','b2'], ['3','b3'], ['4','b4'], ['5','b5'], ['6','b6'], ['7','b7'], ['8','b8'], ['9','b9']],
    'a7':[['0','b0'], ['1','b1'], ['2','b2'], ['3','b3'], ['4','b4'], ['5','b5'], ['6','b6'], ['7','b7'], ['8','b8'], ['9','b9']],
    'a8':[['0','b0'], ['1','b1'], ['2','b2'], ['3','b3'], ['4','b4'], ['5','b5'], ['6','b6'], ['7','b7'], ['8','b8'], ['9','b9']],
    'x9':[['0','b0'], ['1','x1'], ['2','b2'], ['3','b3'], ['4','b4'], ['5','b5'], ['6','b6'], ['7','b7'], ['8','b8'], ['9','b9']],
    'b0':[['0','c0'], ['1','c1'], ['2','c2'], ['3','c3'], ['4','c4'], ['5','c5'], ['6','c6'], ['7','c7'], ['8','c8'], ['9','c9']],
    'b1':[['0','c0'], ['1','c1'], ['2','c2'], ['3','c3'], ['4','c4'], ['5','c5'], ['6','c6'], ['7','c7'], ['8','c8'], ['9','c9']],
    'b2':[['0','c0'], ['1','c1'], ['2','c2'], ['3','c3'], ['4','c4'], ['5','c5'], ['6','c6'], ['7','c7'], ['8','c8'], ['9','c9']],
    'b3':[['0','c0'], ['1','c1'], ['2','c2'], ['3','c3'], ['4','c4'], ['5','c5'], ['6','c6'], ['7','c7'], ['8','c8'], ['9','c9']],
    'b4':[['0','c0'], ['1','c1'], ['2','c2'], ['3','c3'], ['4','c4'], ['5','c5'], ['6','c6'], ['7','c7'], ['8','c8'], ['9','c9']],
    'b5':[['0','c0'], ['1','c1'], ['2','c2'], ['3','c3'], ['4','c4'], ['5','c5'], ['6','c6'], ['7','c7'], ['8','c8'], ['9','c9']],
    'b6':[['0','c0'], ['1','c1'], ['2','c2'], ['3','c3'], ['4','c4'], ['5','c5'], ['6','c6'], ['7','c7'], ['8','c8'], ['9','c9']],
    'b7':[['0','c0'], ['1','c1'], ['2','c2'], ['3','c3'], ['4','c4'], ['5','c5'], ['6','c6'], ['7','c7'], ['8','c8'], ['9','c9']],
    'b8':[['0','c0'], ['1','c1'], ['2','c2'], ['3','c3'], ['4','c4'], ['5','c5'], ['6','c6'], ['7','c7'], ['8','c8'], ['9','c9']],
    'b9':[['0','c0'], ['1','c1'], ['2','c2'], ['3','c3'], ['4','c4'], ['5','c5'], ['6','c6'], ['7','c7'], ['8','c8'], ['9','c9']],
    'x1':[['0','c0'], ['1','c1'], ['2','c2'], ['3','c3'], ['4','c4'], ['5','c5'], ['6','c6'], ['7','x7'], ['8','c8'], ['9','c9']],
    'c0':['Nothing happens. Dang', ['Return', 'rightwall'], ['Try again', 'safecombo']],
    'c1':['Nothing happens. Dang', ['Return', 'rightwall'], ['Try again', 'safecombo']],
    'c2':['Nothing happens. Dang', ['Return', 'rightwall'], ['Try again', 'safecombo']],
    'c3':['Nothing happens. Dang', ['Return', 'rightwall'], ['Try again', 'safecombo']],
    'c4':['Nothing happens. Dang', ['Return', 'rightwall'], ['Try again', 'safecombo']],
    'c5':['Nothing happens. Dang', ['Return', 'rightwall'], ['Try again', 'safecombo']],
    'c6':['Nothing happens. Dang', ['Return', 'rightwall'], ['Try again', 'safecombo']],
    'c7':['Nothing happens. Dang', ['Return', 'rightwall'], ['Try again', 'safecombo']],
    'c8':['Nothing happens. Dang', ['Return', 'rightwall'], ['Try again', 'safecombo']],
    'c9':['Nothing happens. Dang', ['Return', 'rightwall'], ['Try again', 'safecombo']],
    'x7':['The safe dings and then the door pops open!', 'Awesome!', 'You\'re not sure how you knew the code, but you had a really good feeling about it', 'Inside the safe there\'s a paper that says "R4" on it.', ['Return', 'rightwall']],
    'sticky': ['The sticky note reads:',  '"NOTE TO SELF: Don\'t forget to hide the ladder in the room somewhere! Don\'t want a repeat of what happened last time!', 'Uh oh...', ['Return', 'safe']],
    'topdrawer':['Nothing'],
    'bottomdrawer':['There\'s a drawing of an eyeball scribbled out.', ['Return', 'cabinet']],
    'bottomdraweralt':['There\'s text that glows in the dark written on the inside of the drawer', 'It reads P2', 'It\'s also luckily glowing brightly enough that you can see everything again', ['Return', 'cabinet']],
    'cabinet': ['The cabinet has two drawers', ['Open top drawer', 'topdrawer'], ['Open bottom drawer', 'bottomdrawer'], ['Return', 'leftwall']],
    'lightswitch':['It looks like a normal light switch', ['Toggle the lights', 'lightswitch'], ['Return', 'backwall']],
    'rightwall': ['In front of you, you see a safe with a three digit lock, and a deep pit in the floor', ['Examine the pit', 'pit'], ['Examine the safe', 'safe'], ['Turn left', 'frontwall'], ['Turn right', 'backwall']],
    'backwall': ['In front of you, you see a light switch', ['Examine the light switch', 'lightswitch'], ['Turn left', 'rightwall'], ['Turn right', 'leftwall']],
    'leftwall': ['In front of you, you see a cabinet', ['Examine the cabinet', 'cabinet'],['Turn left', 'backwall'], ['Turn right', 'frontwall']],
    'zap': ['When you awake, you find yourself in a small room.', ['Get up.', 'leftwall']],
    'confront': ['You ask the wizard for help with your computer issues', '"FIRST YOU WAKE ME,"', '"THEN YOU TELL ME WHAT TO DO!?"', '"YOUR ARROGANCE SHALL BE PUNISHED"', ['The wizard takes out his wand and strikes you with a powerful ZAP!', 'zap']],
    'run': ['"COWARD!"', '"NAME YOURSELF! WHO SENT YOU?"', 'You continue running as you hear the wizard take out his wand, and then a loud', ['ZAP!','zap']],
    'adventure':[['Run away', 'run'], ['Confront the wizard', 'confront']],
    'wizard': ['Connecting...', 'Querying wizard...', 'The wizard shouts "WHO DARES AWAKE ME FROM MY SLUMBER?"', ['What do you do?','adventure']],
    'loading..': [['loading...', '0000000000start']],
    'options': [['Reload menu', 'loading..'], ['Query diagnostics wizard', 'wizard']],
    '0000000000start': ['FATAL ERROR', 'Failed to load resource:', 'entities.country_list', ['Diagnostic Options', 'options']],
    'hay': ['Just a normal piece of hay', ['Return', 'haystack']],
    'needle': ['There\'s a needle with a little piece of paper on it', ['Examine paper', 'lilpaper']],
    'lilpaper': ['It has 3 circles on it', ['Return', 'haystack']]
  }
  namesT = []
  names = [['0000000000start']]
  menus = {}
  ready = {}

  constructor(){
    for(var i=0; i<1000; i++){
      if(i!=754){
        this.nexts['haystack'].push(['Examine hay #' + i, 'hayx' + i]);
      }
      else {
        this.nexts['haystack'].push(['Examine needle', 'needle']);
      }
    }
  }

  setChar(str, i, c){
    return str.substr(0, i) + c + str.substr(i+1, str.length)
  }

  init(a, s){
    this.menus[s.join('')] = a;
    if(s[0][0] == '0'){
      return 'light';
    }
    if(s[0][0] == '1'){
      return 'dark';
    }
    if(s[0][0] == '2'){
      return 'medium';
    }
  }

  isArr(x){
    return typeof x === 'object';
  }

  follow(menu, sub){
    let x =  menu.slice();
    x.push(sub[1]);
    if(sub[0] === 'Toggle the lights'){
      x[0] = this.setChar(x[0], 0, x[0][0]=='0'?'1':'0');
    }
    if(sub[1] === 'bottomdrawer'){
      x[0] = this.setChar(x[0], 0, x[0][0]=='0'?'0':'2');
    }
    
    return x;
  }

  getNexts(s){
    if(=='bottomdrawer'){
      if(s[0][0] == '0'){
        return this.nexts['bottomdrawer'];
      } else{
         return this.nexts['bottomdraweralt'];
      }
    }
    if(s[s.length-1].startsWith('hayx')){
      return this.nexts['hay']
    }
    return this.nexts[s[s.length-1]];
  }

  init2(a, s){
    let nexts = this.getNexts(s);
    for(let next of nexts){
      if(!this.nexts[next[1]]) continue;
      let newone = this.follow(s, next);
      if(this.namesT.includes(newone.join())) return;
      this.names.push(newone);  
      this.namesT.push(newone.join())
      //this.menus[newone] = new MatMenu();
    }
    setTimeout(()=>{this.ready[s] = true}, 10);
  }


  asdf(x){
    return x;
  }

  idk(a, menu){
   
    return (menu.length%4==1||menu.length%4==2)?'above':'below';
  }

  idk2(a, menu){
    
   
    return (menu.length%4>1)?'after':'before';
  }
}