import { AuthState } from './reducers/index';
import { createFeatureSelector, createSelector } from "@ngrx/store";

// these selector functions are known as Memorise function as it keeps the state (previous state) before it's evaluated
// mapping function with memory
// this will evaluate only if previous state is changed

//Feature Selector / Type safe selector function
export const selectAuthState = createFeatureSelector<AuthState>("auth");

export const isLoggedIn = createSelector(
    // //global application state => slice of global application state that we need
    // (state) => state["auth"], // here its not a typesafe, see another one for typesafe feature selectors
    // // use OF property to select the slices. This is a projecter function.
    // (auth) => !!auth.user


    // using feature selectors
    selectAuthState,
    auth => !!auth.user
);

// combine multiple selectors here
//
export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => !loggedIn);

