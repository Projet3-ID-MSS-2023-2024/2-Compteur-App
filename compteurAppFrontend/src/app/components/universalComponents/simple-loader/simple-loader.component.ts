import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-simple-loader',
  templateUrl: './simple-loader.component.html',
  styleUrls: ['./simple-loader.component.css']
})
export class SimpleLoaderComponent {

  @Input() isLoading: boolean = false;

}
