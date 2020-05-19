import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LogInService } from '../services/log-in.service';

@Injectable({
  providedIn: 'root'
})
export class LogInGuard implements CanActivate {

  constructor(private logIn:LogInService,private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.checkLogin();
    }
  
    checkLogin(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user !== null && user.role === 'admin') {
        return true;
      } else {
        console.log(user.role)
        this.router.navigateByUrl('log-in');
        return false;
      }
    }
}
