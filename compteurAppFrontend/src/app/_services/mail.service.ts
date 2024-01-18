import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient,
  private readonly keycloak: KeycloakService
) { }

  sendMail(email: string, obj: string, message: string): Observable<String> {
    const token = this.keycloak.getKeycloakInstance().token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log(email);
    console.log(obj);
    console.log(message);

    const body = {
      object: obj,
      message: message
    };
    console.log(body);
    return this.http.post<String>(`/api/sendMail/${email}`, body, { headers });
  }
}
