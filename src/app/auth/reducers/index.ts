import { isDevMode } from "@angular/core";
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  State,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from "@ngrx/store";
import { User } from "../model/user.model";
import { AuthActions } from "../action-types";

export const authFeatureKey = "auth";

export interface AuthState {
  user: User;
}

// Initial state always returns a new state object
export const initialAuthState: AuthState = {
  user: undefined,
};

export const authReducer = createReducer(
  initialAuthState, //initial of state is AuthState
  on(AuthActions.login, (state, action) => {
    // console.log("Calling login reducer");
    // debugger;
    return {
      user: action.user,
    }; //on acting on action what needs to respond to action
  }),

  on(AuthActions.logout, (state, action) => {
    return {
      user: undefined,
    };
  })
);

///Reducer - start
//what  a reducer is : a plane javascript function
// function authReducer(state: AppState, action: Action): State {
//   // State returned from this function is a new version of the state base on previous state and current action
//   //reduce functional programming operations
// }
// //In Javascript
// const courses = [];
// courses.reduce((acc, courses) => null);  // similar to ngrx reducers
/// Reduceer - end
