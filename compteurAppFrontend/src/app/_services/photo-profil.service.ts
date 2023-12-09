import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotoProfilService {
  constructor(
    private http: HttpClient,
    private readonly keycloak: KeycloakService
  ) {}

  uploadPhotoProfil(file: File | null,id: string | undefined): Observable<any> {
    if (file && id) {
      let formData = new FormData();
      formData.append('file', file);
      const token = this.keycloak.getKeycloakInstance().token;
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.post(`/api/AddphotoProfile/${id}`, formData, { headers });
    } else {
      return new Observable();
    }
  }

  getPhotoProfil(id: string | undefined): Observable<any> {
    if (id) {
      const token = this.keycloak.getKeycloakInstance().token;
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`/api/GetphotoProfile/${id}`, { headers });
    } else {
      return new Observable();
    }
  }

  deletePhotoProfil(id: string | undefined): Observable<any> {
    if (id) {
      const token = this.keycloak.getKeycloakInstance().token;
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.delete(`/api/DeletephotoProfile/${id}`, { headers });
    } else {
      return new Observable();
    }
  }

  updatePhotoProfil(file: File | null,id: string | undefined): Observable<any> {
    if (file && id) {
      let formData = new FormData();
      formData.append('file', file);
      const token = this.keycloak.getKeycloakInstance().token;
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.put(`/api/UpdatephotoProfile/${id}`, formData, { headers });
    } else {
      return new Observable();
    }
  }
}
