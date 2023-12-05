import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoProfilService {

  constructor(private http: HttpClient) { }

  uploadPhotoProfil(file: File | null, id: string | undefined): Observable<any> {
    if (file && id) {
      let formData = new FormData();
      formData.append("file", file);
      return this.http.post(`/api/AddphotoProfile/${id}`, formData);
    } else {
      return new Observable();
    }
  }

  getPhotoProfil(id: string | undefined): Observable<any> {
    if (id) {
      return this.http.get(`/api/GetphotoProfile/${id}`);
    } else {
      return new Observable();
    }
  }

  deletePhotoProfil(id: string | undefined): Observable<any> {
    if (id) {
      return this.http.delete(`/api/DeletephotoProfile/${id}`);
    } else {
      return new Observable();
    }
  }

  updatePhotoProfil(file: File | null, id: string | undefined): Observable<any> {
    if (file && id) {
      let formData = new FormData();
      formData.append("file", file);
      return this.http.put(`/api/UpdatephotoProfile/${id}`, formData);
    } else {
      return new Observable();
    }
  }


}
