import { isDevMode } from "@angular/core";
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";
import { environment } from "../../environments/environment";
import { routerReducer } from "@ngrx/router-store";
import { act } from "@ngrx/effects";

export const appFeatureKey = "app";

export interface AppState { }

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};

//Metareducers are performed before any other reducers in the application
// these are execcuted in a specific order
// other normal reducers will be executed once all the metareducers are done execution
export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log("State before: ", state);
    console.log("action: ", action)

    return reducer(state, action);
  }
}
//added above metareducer in MetaReducerMap
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : [];