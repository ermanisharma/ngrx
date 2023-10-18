import { createAction, props } from "@ngrx/store";
import { User } from "./model/user.model";

export const login = createAction(
  "[Login Page] User Login", //"[Source of Action] Event/Command"
  props<{ user: User }>() // payload for login
);

export const logout = createAction(
    "[Top Menu] Logout",
);