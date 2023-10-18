import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";
import { AppState } from "./reducers";
import { isLoggedIn, isLoggedOut } from "./auth/auth.selectors";
import { login, logout } from "./auth/auth.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loading = true;
  isLoggedIn$: Observable<boolean>; // these obseravables should always emit new values only if state is changed
  isLoggedOut$: Observable<boolean>; // these obseravables should always emit new values only if state is changed

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {

    const userProfile = localStorage.getItem('user');
    if (userProfile) {
      this.store.dispatch(login({ user: JSON.parse(userProfile) }));
    }

    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    // this.store.subscribe((store) => {
    //   console.log("store value: ", store);
    // });

    this.isLoggedIn$ = this.store.pipe(
      //map((state) => !!state["auth"].user)  // Returns true if logged in. Two nugget for Yes there is login information

      //select(state => !!state["auth"].user)
      select(isLoggedIn) // this is same functionality as above but in a more optimal way.
      // here state is the input and => expression is the output or provide a value after evaluation.
      // If there is no change in state then evaluate the expression should not be run.
      // It should select the values only if the new or updated value available in State.
      // This is done by Selectors
      //If the state has same value selected from the Store then evaluation should not be performed instead of
      // this should select or use the previous value stored in memory cache.
    );

    this.isLoggedOut$ = this.store.pipe(
      // map((state) => !state["auth"].user) // Returns true if logged out. Single nugget for no login information
      // select(state => !!state["auth"].user)
      select(isLoggedOut)
    );
  }

  logout() {
    this.store.dispatch(logout());
  }
}
