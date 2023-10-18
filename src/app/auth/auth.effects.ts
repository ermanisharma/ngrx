import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "./action-types";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

///side-effects : its something needs to be done in response to a given action. First action gets
// dispatched and then it's reducer is executed and then we want to do something else then we needs
// to use Effects. eg. Saving user profile in local storage after a successful login
@Injectable()
export class AuthEffects { // these classes are only needs to use by ngrx, dont use directly other places
    constructor(private actions$: Actions, private router: Router) {
        //Just a simple example of Effect
        // No type safety checks here 
        // No Error handling here
        /*actions$.subscribe(action => {
            if (action.type === '[Login Page] User Login') {
                localStorage.setItem('user',
                    JSON.stringify(action['user']));
            }
        })*/
    }

    /// Better way to implement an Effect
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            tap(action => localStorage.setItem('user', JSON.stringify(action.user))
            )
        ),
        { dispatch: false });

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            tap(action => {
                localStorage.removeItem('user');
                this.router.navigateByUrl('/login');
            })
        ),
        { dispatch: false }
    );
}