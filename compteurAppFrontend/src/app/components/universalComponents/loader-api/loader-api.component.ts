import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-loader-api',
  templateUrl: './loader-api.component.html',
  styleUrls: ['./loader-api.component.css'],
})
export class LoaderAPIComponent {
  loading: string = 'hide';
  @ViewChild('loader') loader!: ElementRef;
  @ViewChild('response') response!: ElementRef;
  @ViewChild('loaderBG') loaderBG!: ElementRef;

  ngAfterViewInit() {
    this.loadingView();
    setTimeout(() => {
      this.responseView();
    },3000);
  }

  loadingView() {
    this.loader.nativeElement.style.transform = 'translateY(-0%)';
  }

  responseView() {
    this.loader.nativeElement.style.transform = 'translateY(-120%)';
    setTimeout(() => {
      this.response.nativeElement.style.transform = 'translateY(-0%)';
      this.loaderBG.nativeElement.style.transform = 'translateX(-0%)';
      setTimeout(() => {
        this.response.nativeElement.style.transform = 'translateY(-120%)';
        this.loaderBG.nativeElement.style.transform = 'translateX(-100%)';
      },5000)
    }, 300);
  }
}
