import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-card-navbar',
  templateUrl: './user-card-navbar.component.html',
  styleUrls: ['./user-card-navbar.component.css']
})
export class UserCardNavbarComponent {

  @Input() profilPicture!: string;

}
