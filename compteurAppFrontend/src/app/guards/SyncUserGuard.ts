import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { WebApiService } from '../_services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class SyncUserGuard implements CanActivate {

  constructor(private webApiService: WebApiService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.webApiService.syncUser().toPromise().then(() => {
      return true;
    });
  }
}
