import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../reducers";
import { filter, finalize, first, tap } from "rxjs/operators";
import { loadAllCourses } from "./course.actions";
import { areCoursesLoaded } from "./courses.selectors";

@Injectable()
export class CoursesResolver implements Resolve<any>{
    loading = false;
    constructor(private store: Store<AppState>) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        //access the store
        //Query it's data if the courses are there or not
        // if courses are not there then dispatch the loadAllCourses action method to load data in store
        // if data is already in the store then not going to dispatch anything and we will let the resolver to complete it's transaction

        return this.store
            .pipe(
                select(areCoursesLoaded),
                // tap is a recommended operator for side effect / dispatch the actions
                tap(coursesloaded => {
                    if (!this.loading && !coursesloaded) { // dispatch this action only if courses data is not loaded yet
                        this.loading = true;
                        this.store.dispatch(loadAllCourses()); // this will get call multiple time, everytime we come on the screen(Home)
                    }
                }),
                filter(coursesloaded => coursesloaded), // filter on courseLoaded=true, becuase observable needs to terminate on first() not before that

                // load first() only when the coursesloaded is true.
                //in order to return the response/observable needs to emit the value
                //(to ensure observable completion we are using first here)
                first(),
                finalize(() => this.loading = false)
            );

    }
}