import { Component } from '@angular/core';

@Component({
  template: `
    <h3>Admin Dash</h3>
    <nav>
      <a routerLink="./" routerLinkActive="active"
         [routerLinkActiveOptions]="{ exact: true }">
        Dashboard
      </a>
      <a routerLink="./issues" routerLinkActive="active">Manage Issues</a>
      <a routerLink="./users" routerLinkActive="active">Manage Users</a>
    </nav>
    <router-outlet></router-outlet>
  `
})

export class AdminComponent { }