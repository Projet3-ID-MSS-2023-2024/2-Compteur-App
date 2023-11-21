import { Component, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.css']
})
export class MobileNavbarComponent {

  role: string = 'fournisseur';

  @ViewChild('navbar') navbar!: ElementRef;
  @ViewChildren('items') items!: QueryList<ElementRef>;
  open: boolean = false;
  showHideImg:string = "show.svg";

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

}
