import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profil-card-navbar',
  templateUrl: './profil-card-navbar.component.html',
  styleUrls: ['./profil-card-navbar.component.css']
})
export class ProfilCardNavbarComponent {

  @Input() profilPicture!: string;
  @Input() name!: string;
  @Input() surname!: string;
  @Input() lock!: string;

}
