import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../reducers";
import { isLoggedIn } from "./auth.selectors";
import { tap } from "rxjs/operators";
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot // this is current state
  ): Observable<boolean> {
    return this.store
      .pipe(
        select(isLoggedIn),
        tap((loggedIn) => { // tap is used as side effect
          if (!loggedIn) {
            this.router.navigateByUrl("/login");
          }
        })
      );
  }
}
