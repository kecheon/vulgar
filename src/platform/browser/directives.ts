import {provide, PLATFORM_DIRECTIVES} from 'angular2/core';

// Angular 2 Router
import {ROUTER_DIRECTIVES} from 'angular2/router';

// Angular 2 Material
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdRadioButton} from '@angular2-material/radio';
import {MdSpinner} from '@angular2-material/progress-circle';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';

// App/directives
import {RouterActive} from '../app/directives/router-active';

// application_directives: directives that are global through out the application
export const APPLICATION_DIRECTIVES = [

  ...ROUTER_DIRECTIVES,

  ...MD_SIDENAV_DIRECTIVES,
  ...[ MdToolbar, MdButton, MdCheckbox, MdRadioButton, MdSpinner ],
  ...MD_CARD_DIRECTIVES,

  RouterActive
];

export const DIRECTIVES = [
  
  provide(PLATFORM_DIRECTIVES, {useValue: APPLICATION_DIRECTIVES, multi: true})
];
