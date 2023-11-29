import { Component, ViewChild, ElementRef, ViewChildren, QueryList, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.css']
})
export class MobileNavbarComponent implements OnInit, AfterViewInit {

  role: string = 'fournisseur';

  @ViewChild('navbar') navbar!: ElementRef;
  @ViewChildren('items') items!: QueryList<ElementRef>;
  open: boolean = false;
  showHideImg:string = "show.svg";

  isAdmin: boolean = false;
  isFournisseur: boolean = false;
  isClient: boolean = false;

  constructor(
    private keycloakService: KeycloakService,
  ) { }

  ngOnInit(): void {
    this.isFournisseur = this.keycloakService.isUserInRole('fournisseur') ? true : false;
    this.isAdmin = this.keycloakService.isUserInRole('admin') ? true : false;
    this.isClient = this.keycloakService.isUserInRole('client') ? true : false;
  }

  ngAfterViewInit(): void {
    this.items.forEach(item => {
      item.nativeElement.addEventListener('click', () => {
        if (this.open) {
          this.openClose();
        }
      });
    });
  }

  openClose(){
    this.navbar.nativeElement.style.width = this.open ? '150px' : '95%';
    this.navbar.nativeElement.style.left = this.open ? 'calc(50% - 75px)' : '2.5%';
    this.navbar.nativeElement.style.height = this.open ? '35px' : '550px';
    this.showHideImg = this.open ? "show.svg" : "hide.svg";
    this.items.forEach(item => {
      item.nativeElement.style.transition = 'opacity 0.3s ease-in-out';
      item.nativeElement.style.opacity = this.open ? '0' : '1';
    });
    this.open = !this.open;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.navbar.nativeElement.contains(event.target) && this.open) {
      this.openClose();
    }
  }

  logout() {
    this.keycloakService.logout();
  }

  isPopup: boolean = false;

  openPopupDeconnexion(){
    this.isPopup = true;
  }

  closePopup(){
    this.isPopup = false;
  }
}
