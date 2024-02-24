import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { allCoursesLoaded, loadAllCourses } from "./course.actions";
import { CourseActions } from "./action-types";
import { CoursesHttpService } from "./services/courses-http.service";
import { concatMap, map } from "rxjs/operators";

@Injectable()
export class CoursesEffects {

    constructor(private actions$: Actions,
        private coursesHttpService: CoursesHttpService) {

    }
    loadCourses$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(CourseActions.loadAllCourses),
                concatMap(action => this.coursesHttpService.findAllCourses()), //only send one request at a time
                map(courses => allCoursesLoaded({ courses })) //needs  reducer to store these response data from API into our in-memory Store. 
            )
    );

    saveCourse$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(CourseActions.courseUpdated),
                concatMap(action => this.coursesHttpService.saveCourse(
                    action.update.id,
                    action.update.changes
                ))
            ),
        { dispatch: false }
    );

}