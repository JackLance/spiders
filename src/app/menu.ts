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
    'chest': ['There is a chest here with a lock', ['Examine directional lock', 'directional'], ['Try a combination', 'chestcombo'], ['Return', 'frontwall']],
    'chestcombo':[['NW', 'NW1'], ['NE', 'NE1'], ['SW', 'SW1'], ['SE', 'SE1X']],
    'NW1':[['NW', 'NW2'], ['NE', 'NE2'], ['SW', 'SW2'], ['SE', 'SE2']],
    'NE1':[['NW', 'NW2'], ['NE', 'NE2'], ['SW', 'SW2'], ['SE', 'SE2']],
    'SW1':[['NW', 'NW2'], ['NE', 'NE2'], ['SW', 'SW2'], ['SE', 'SE2']],
    'SE1':[['NW', 'NW2'], ['NE', 'NE2'], ['SW', 'SW2'], ['SE', 'SE2']],
    'SE1X':[['NW', 'NW2'], ['NE', 'NE2X'], ['SW', 'SW2'], ['SE', 'SE2']],
    'NW2':[['NW', 'NW3'], ['NE', 'NE3'], ['SW', 'SW3'], ['SE', 'SE3']],
    'SW2':[['NW', 'NW3'], ['NE', 'NE3'], ['SW', 'SW3'], ['SE', 'SE3']],
    'NE2':[['NW', 'NW3'], ['NE', 'NE3'], ['SW', 'SW3'], ['SE', 'SE3']],
    'SE2':[['NW', 'NW3'], ['NE', 'NE3'], ['SW', 'SW3'], ['SE', 'SE3']],
    'NE2X':[['NW', 'NW3'], ['NE', 'NE3'], ['SW', 'SW3'], ['SE', 'SE3X']],
    'NW3':[['NW', 'NW4'], ['NE', 'NE4'], ['SW', 'SW4'], ['SE', 'SE4']],
    'NE3':[['NW', 'NW4'], ['NE', 'NE4'], ['SW', 'SW4'], ['SE', 'SE4']],
    'SE3':[['NW', 'NW4'], ['NE', 'NE4'], ['SW', 'SW4'], ['SE', 'SE4']],
    'SW3':[['NW', 'NW4'], ['NE', 'NE4'], ['SW', 'SW4'], ['SE', 'SE4']],
    'SE3X':[['NW', 'NW4'], ['NE', 'NE4'], ['SW', 'SW4X'], ['SE', 'SE4']],
    'NW4':[['NW', 'NW5'], ['NE', 'NE5'], ['SW', 'SW5'], ['SE', 'SE5']],
    'NE4':[['NW', 'NW5'], ['NE', 'NE5'], ['SW', 'SW5'], ['SE', 'SE5']],
    'SE4':[['NW', 'NW5'], ['NE', 'NE5'], ['SW', 'SW5'], ['SE', 'SE5']],
    'SW4':[['NW', 'NW5'], ['NE', 'NE5'], ['SW', 'SW5'], ['SE', 'SE5']],
    'SW4X':[['NW', 'NW5X'], ['NE', 'NE5'], ['SW', 'SW5'], ['SE', 'SE5']],
    'NW5X': ['The chest opened!', 'It has 5 Ts written inside', ['Return', 'chest']],
    'NW5': ['Looks like that wasn\'t it', 'The lock reset', ['Return', 'chest']],
    'NE5': ['Looks like that wasn\'t it', 'The lock reset', ['Return', 'chest']],
    'SE5': ['Looks like that wasn\'t it', 'The lock reset', ['Return', 'chest']],
    'SW5': ['Looks like that wasn\'t it', 'The lock reset', ['Return', 'chest']],
    'directional': [['Upon closer examination','directional1'], 'You notice 5 things about the lock', 'You make a mental note of them'],
    'directional1': ['1) The lock appears to take a 5 direction combination and resets', [ 'automatically', 'directional2']],
    'directional2': [['2)', 'directional3'], 'The lock is rotated by 45 degrees, so the directions are NE, NW, SE, and SW'],
    'directional3': ['3) The lock is placed around the chest\'s clasp tightly so you cannot open the', ['chest', 'directional4']],
    'directional4': ['4) Unlike a normal directional lock, the central piece is a square instead of a', ['circle', 'directional5']],
    'directional5': [['5)', 'chest'], 'You have no clue what the combination is!'],
    'frontwall': ['In front of you, you see a small locked chest and a stack of hay',  ['Examine hay stack', 'haystack'],['Examine small chest', 'chest'],['Turn left', 'leftwall'], ['Turn right', 'rightwall']],
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
    'x7':['The safe dings and then the door pops open!', 'Awesome!', 'You\'re not sure how you knew the code, but you had a really good feeling about it', 'Inside the safe there\'s a paper that says "R R R R" on it.', ['Return', 'rightwall']],
    'sticky': ['The sticky note reads:',  '"NOTE TO SELF: Don\'t forget to hide the ladder in the room somewhere! Don\'t want a repeat of what happened last time!', 'Uh oh...', ['Return', 'safe']],
    'topdrawer':['Nothing'],
    'bottomdrawer':['There\'s a drawing of an eyeball scribbled out.', ['Return', 'desk']],
    'bottomdraweralt':['There\'s text that glows in the dark written on the inside of the drawer', 'It looks like the letter P, written twice', 'It\'s also luckily glowing brightly enough that you can see everything again', ['Return', 'desk']],
    'desk': ['The desk has two drawers', ['Open top drawer', 'topdrawer'], ['Open bottom drawer', 'bottomdrawer'], ['Return', 'leftwall']],
    'lightswitch':['It looks like a normal light switch', ['Toggle the lights', 'lightswitch'], ['Return', 'backwall']],
    'rightwall': ['In front of you, you see a safe with a three digit lock, and a deep pit in the floor', ['Examine the pit', 'pit'], ['Examine the safe', 'safe'], ['Turn left', 'frontwall'], ['Turn right', 'backwall']],
    'door': ['The door leads outside, and has a 5 letter comination', ['Try comination', 'doorcombo'], ['Return', 'leftwall']],
    'doorcombo':[],
    'move': [['You move the cabinet', 'cabinet']],
    'key': ['The key is shiny and red', ['Return', 'cabinet']],
    'drawer0': ['The drawer is locked',  'The keyhole is red', ['Return', 'cabinet']],
    'drawer2': ['You\'ve already opened the drawer', ['Return', 'cabinet']],
    'drawer1': ['The drawer is locked',  'The keyhole is red', ['Unlock it with the key', 'unlock'], ['Return', 'cabinet']],
    'unlock': ['There\'s a screwdriver inside', ['Take the screwdriver', 'screwdriver'], ['Return', 'cabinet']],
    'screwdriver': ['You take the screwdriver and put it in your pocket', ['Return', 'cabinet']],
    'climb0': ['There\'s a vent on the ceiling that you can reach now', 'You have no way to unfasten the cover, but it looks like there\'s a piece of paper on the other side', ['Return', 'cabinet']],
    'climb2': ['There\'s a vent on the ceiling that you can reach now', ['Unscrew the cover from the ceiling', 'unscrew'], ['Return', 'cabinet']],
    'climb3': ['You\'ve already unscrewed the vent cover', ['Return', 'cabinet']],
    'unscrew': ['The piece of paper falls from the ceiling, but lands behind the desk, so you can\'t get to it.', ['Return', 'cabinet']],
    
    'fellpaper':['It\'s got a little squiggle on it', 'Could be an S?', ['Return', 'cabinet']],
    'cabinet00':['The cabinet is on your left, with the drawer facing right', ['Examine the drawer', 'drawer0'],['Move the cabinet to the right', 'move'], ['Return', 'backwall']],
    'cabinet10':['There\'s a key where the cabinet was. The drawer is facing the wall now so you can\'t open it', ['Take the key', 'key'], ['Climb on the cabinet', 'climb0'], ['Move the cabinet to the left', 'move'], ['Return', 'backwall']],
    'cabinet01':['The cabinet is on your left, with the drawer facing right', ['Examine the drawer', 'drawer1'],['Move the cabinet to the right', 'move'], ['Return', 'backwall']],
    'cabinet11':['The drawer is facing the wall now so you can\'t open it', ['Climb on the cabinet', 'climb0'], ['Move the cabinet to the left', 'move'], ['Return', 'backwall']],
    'cabinet02':['The cabinet is on your left, with the drawer facing right', ['Examine the drawer', 'drawer2'],['Move the cabinet to the right', 'move'], ['Return', 'backwall']],
    'cabinet12':['The drawer is facing the wall now so you can\'t open it', ['Climb on the cabinet', 'climb2'], ['Move the cabinet to the left', 'move'], ['Return', 'backwall']],
    'cabinet03':['The cabinet is on your left, with the drawer facing right', 'You can get to the piece of paper now', ['Examine the paper', 'fellpaper'], ['Examine the drawer', 'drawer2'],['Move the cabinet to the right', 'move'], ['Return', 'backwall']],
    'cabinet13':['The drawer is facing the wall now so you can\'t open it', ['Climb on the cabinet', 'climb3'], ['Move the cabinet to the left', 'move'], ['Return', 'backwall']],
    'backwall': ['In front of you, you see a light switch, and a cabinet. There is also a vent on the right, but it\'s too high to reach', ['Examine the light switch', 'lightswitch'], ['Examine the cabinet', 'cabinet'], ['Turn left', 'rightwall'], ['Turn right', 'leftwall']],
    'leftwall': ['In front of you, you see a desk and the door to the room', ['Examine the desk', 'desk'], ['Examine the door', 'door'], ['Turn left', 'backwall'], ['Turn right', 'frontwall']],
    'zap': ['When you awake, you find yourself in a small room.', ['Get up.', 'leftwall']],
    'confront': ['You ask the wizard for help with your computer issues', '"FIRST YOU WAKE ME,"', '"THEN YOU TELL ME WHAT TO DO!?"', '"YOUR ARROGANCE SHALL BE PUNISHED"', ['The wizard takes out his wand and strikes you with a powerful ZAP!', 'zap']],
    'run': ['"COWARD!"', '"NAME YOURSELF! WHO SENT YOU?"', 'You continue running as you hear the wizard take out his wand, and then a loud', ['ZAP!','zap']],
    'adventure':[['Run away', 'run'], ['Confront the wizard', 'confront']],
    'wizard': ['Connecting...', 'Querying wizard...', 'The wizard shouts "WHO DARES AWAKE ME FROM MY SLUMBER?"', ['What do you do?','adventure']],
    'loading..': ['Attempting to reload menu.', ['Continue', '0000000000start']],
    'options': [['Reload menu', 'loading..'], ['Query diagnostics wizard', 'wizard']],
    '0000000000start': ['FATAL ERROR', 'Failed to load resource:', 'entities.country_list', ['Diagnostic Options', 'options']],
    'hay': ['Just a normal piece of hay', ['Return', 'frontwall']],
    'needle': ['There\'s a needle with a little piece of paper on it', ['Examine paper', 'lilpaper']],
    'lilpaper': ['It has 3 circles on it.', 'You feel confident that was the only thing to find in the haystack. Phew.', ['Return', 'frontwall']],
    'escape': ['The wizard (me) says', 'YEAH OKAY I DONT REALLY KNOW WHY I DID ALL THAT', 'IT WAS FUN THOUGH', ['ANYWAY, YOUR FINAL ANSWER IS THE NATIONAL SPORT OF THE', 'usa']],
    'usa':['USA'],
    'cabinet':[]
  }
  //0 1 lights
  //0 1 cabinet
  //0 1 2 3 4 5 6
  
  namesT = []
  names = [['0000000000start']]
  menus = {}
  ready = {}
  country = "Select country"

  pressed(){
    this.country = "Country: USA"
  }

  constructor(){
    for(var i=0; i<1000; i++){
      if(i!=763){
        this.nexts['haystack'].push(['Examine hay #' + i, 'hayx' + i]);
        this.nexts['hayx' + i] = this.nexts['hay'].slice()
      }
      else {
        this.nexts['haystack'].push(['Examine needle', 'needle']);
      }
    }
    const al = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const ph = 'abcde';
    for(var i =0; i<26; i++){
      if(i%4 != 2 || i%7 != 4)
        this.nexts['doorcombo'].push([al[i], 'a'+al[i]]);
      else
        this.nexts['doorcombo'].push([al[i], 'x'+al[i]])
      this.nexts['e' + al[i]] = ['Nope...', ['Return', 'leftwall']];
    }
    this.nexts['xT'] = ['It worked!',['Leave', 'escape']];
    for(var j=0; j<4; j++){
    for(var k =0; k<26; k++){
      this.nexts[ph[j] + al[k]] = [];
      for(var i =0; i<26; i++){
        this.nexts[ph[j] + al[k]].push([al[i], ph[j+1]+al[i]]);
      }
    }
    }
    this.nexts['xO'] = this.nexts['cO'];
    this.nexts['xO'][17][1] = 'xR';
    this.nexts['xP'] = this.nexts['bP'];
    this.nexts['xP'][14][1] = 'xO';
    this.nexts['xQ'] = this.nexts['cQ'];
    this.nexts['xQ'][16][1] = 'xP';
    this.nexts['xR'] = this.nexts['dR'];
    this.nexts['xR'][19][1] = 'xT';
    this.nexts['xS'] = this.nexts['aS'];
    this.nexts['xS'][15][1] = 'xP';

  }

  setChar(str, i, c){
    return str.substr(0, i) + c + str.substr(i+1, str.length)
  }

  init(a, s){
    this.menus[s.join('')] = a;
    if(s.length>2 && s[s.length-2].startsWith('directional') ){
      return 'square';
    }
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

    if(sub[1] === 'move'){
      x[0] = this.setChar(x[0], 1, x[0][1]=='0'?'1':'0');
    }
    if(sub[1] === 'key'){
      x[0] = this.setChar(x[0], 2, '1');
    }
    if(sub[1] === 'screwdriver'){
      x[0] = this.setChar(x[0], 2, '2');
    }
    if(sub[1] === 'unscrew'){
      x[0] = this.setChar(x[0], 2, '3');
    }
    
    
    return x;
  }

  getNexts(s){
    if(s[s.length-1]=='bottomdrawer'){
      if(s[0][0] == '0'){
        return this.nexts['bottomdrawer'];
      } else{
         return this.nexts['bottomdraweralt'];
      }
    }
    if(s[s.length-1]=='cabinet'){
      return this.nexts['cabinet' + s[0][1] + s[0][2]];
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
    let x = menu[menu.length-1];
    if(x=='directional1' ||x=='chest' || x=='directional') return 'above'
    if(x=='directional2') return 'below'
    if(x=='directional3') return 'above'
    if(x=='directional4') return 'below'
    if(x=='directional5') return 'below'
     
    if(x=='rightwall') return 'above';
    return (menu.length%4==1||menu.length%4==2)?'above':'below';
  }
  //SSSNN  1 3
  //EEWEW   2 4
  //       3 5

  idk2(a, menu){
    let x = menu[menu.length-1];
    if(x=='directional1' ||x=='directional' || x=='chest') return 'before'
    if(x=='directional2') return 'after'
    if(x=='directional3') return 'after'
    if(x=='directional4') return 'after'
    if(x=='directional5') return 'before'
    if(x=='rightwall') return 'before';
    return (menu.length%4>1)?'after':'before';
  }
}