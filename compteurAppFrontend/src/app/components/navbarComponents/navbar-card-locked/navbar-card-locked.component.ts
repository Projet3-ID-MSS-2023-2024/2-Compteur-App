import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-card-locked',
  templateUrl: './navbar-card-locked.component.html',
  styleUrls: ['./navbar-card-locked.component.css']
})
export class NavbarCardLockedComponent {

  @Input() icone!: string;
  @Input() title!: string;

}
