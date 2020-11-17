/**
 * While technically it's possible to bypass this client side authentication check by manually adding a 'currentUser'
 * object to local storage using browser dev tools, this would only give access to the client side routes/components,
 * it wouldn't give access to any real secure data from the server api because a valid authentication token (JWT)
 * is required for this.
 */

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('token')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['login']);
        return false;
    }
}
