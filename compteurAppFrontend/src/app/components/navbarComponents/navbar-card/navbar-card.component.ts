import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-card',
  templateUrl: './navbar-card.component.html',
  styleUrls: ['./navbar-card.component.css']
})
export class NavbarCardComponent {

  @Input() icone!: string;
  @Input() title!: string;
  @Input() path!: string;

  constructor(private router: Router) { }

  routerLink() {
    this.router.navigate([this.path]);
  }

}
