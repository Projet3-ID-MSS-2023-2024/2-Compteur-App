import { Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/_services/loading.service';

@Component({
  selector: 'app-loader-api',
  templateUrl: './loader-api.component.html',
  styleUrls: ['./loader-api.component.css'],
})
export class LoaderAPIComponent {

  @ViewChild('loader') loader!: ElementRef;
  @ViewChild('response') response!: ElementRef;
  @ViewChild('loaderBG') loaderBG!: ElementRef;
  statement!: string;

  constructor(private loadingService: LoadingService) {}

  ngAfterViewInit(): void {
    this.loadingService.loader.subscribe((message) => {
      console.log(message);
      if (message === 'loading') {
        this.loadingView();
      }
      if(message === 'sucess' ){
        this.responseView(true, 'Success');
      }
      if(message === 'error'){
        this.responseView(false, 'Error');
      }
      if(message === 'Paiement effectué'){
        this.responseView(true, 'Paiement effectué');
      }
    });
  }


  loadingView() {
    this.response.nativeElement.style.transition = 'all 0s';
    this.loader.nativeElement.style.transform = 'translateY(-0%)';
    this.response.nativeElement.style.transform = 'translateY(-120%)';
    this.response.nativeElement.style.transition = 'all 0.3s';
  }

  responseView(color:boolean,  message: string) {
    this.loader.nativeElement.style.transform = 'translateY(-120%)';
    this.loaderBG.nativeElement.style.backgroundColor = color ? 'rgba(43, 255, 0, 0.3)' : 'rgba(255, 0, 0, 0.3)';
    this.statement = message;
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
