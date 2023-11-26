import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
    private readonly keycloak: KeycloakService
  ) {}

  create(name: string) {
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post<any>('api/addCategory', { name }, { headers });
  }

  getAll() {
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any[]>('api/getCategories', { headers });
  }

  get(id: number) {
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(`api/getCategory/${id}`, { headers });
  }

  delete(id: number) {
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.delete<any>(`api/deleteCategory/${id}`, { headers });
  }


  deleteByName(name: string) {
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.delete<any>(`api/deleteCategoryByName/${name}`, { headers });
  }
}
