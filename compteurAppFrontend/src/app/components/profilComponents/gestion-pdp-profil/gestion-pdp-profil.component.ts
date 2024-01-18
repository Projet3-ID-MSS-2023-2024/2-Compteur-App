import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { PhotoProfilService } from 'src/app/_services/photo-profil.service';

@Component({
  selector: 'app-gestion-pdp-profil',
  templateUrl: './gestion-pdp-profil.component.html',
  styleUrls: ['./gestion-pdp-profil.component.css'],
})
export class GestionPdpProfilComponent implements OnInit {
  constructor(private photoProfilService: PhotoProfilService) {}

  // Données photo de profil
  photoUrl!: string;
  photoNull: boolean = true;
  editPdp: boolean = false;
  deleteHover: boolean = false;
  @Input() idUser!: string;
  isLoading: boolean = false;
  editHover: boolean = false;

  ngOnInit(): void {
    this.initPdp(this.idUser);
  }

  deletePhotoProfil() {
    this.isLoading = true;
    this.photoProfilService
      .deletePhotoProfil(this.idUser)
      .pipe(take(1))
      .subscribe(
        (data) => {
          console.log(data);
          this.photoNull = true;
          this.isLoading = false;
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
        }
      );
    this.deleteHover = false;
    this.editPdp = false;
  }
  onFileChangeAdd(event: Event) {
    console.log('add');
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    if (files[0].type.match(/image\/*/) == null) {
      return;
    }
    this.isLoading = true;
    this.photoProfilService.uploadPhotoProfil(files[0], this.idUser).subscribe(
      (data) => {
        console.log(data);
        this.photoNull = false;
        this.initPdp(this.idUser);
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
    this.editPdp = false;
  }
  onFileChange(event: Event) {
    console.log('change');
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    if (files[0].type.match(/image\/*/) == null) {
      alert('Seules les images sont supportées');
      return;
    }
    this.isLoading = true;
    this.photoProfilService
      .updatePhotoProfil(files[0], this.idUser)
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.photoUrl = data.path;
          this.photoNull = false;
          this.initPdp(this.idUser);
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
        }
      );
    this.editPdp = false;
  }
  @ViewChild('fileInput') fileInput!: ElementRef;
  onFileSelect(event: Event) {
    this.fileInput.nativeElement.click();
  }
  initPdp(id: any) {
    this.photoProfilService
      .getPhotoProfil(id)
      .pipe(take(1))
      .subscribe(
        (response) => {
          if (response) {
            this.photoUrl = response.path;
            console.log(response.path);
            this.photoNull = false;
          } else {
            this.photoNull = true;
          }
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
        }
      );
  }
  editPdpButton() {
    this.editPdp = !this.editPdp;
  }
}
