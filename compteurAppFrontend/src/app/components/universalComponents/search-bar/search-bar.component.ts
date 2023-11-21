import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  @Output() searchData: EventEmitter<any> = new EventEmitter<any>();

  searchForm = new FormGroup({
    search: new FormControl('', Validators.required),
  });

  sendData(){
    if(this.searchForm.valid){
      this.searchData.emit(this.searchForm.value);
    }
  }

}
