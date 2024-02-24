import { createAction, props } from "@ngrx/store";
import { Course } from "./model/course";
import { Update } from "@ngrx/entity";

export const loadAllCourses = createAction(
    "[Courses Resolver] Load All Courses"
);

export const allCoursesLoaded = createAction(
    "[Load Courses Effect] All Courses Loaded",
    props<{ courses: Course[]; }>()
);

export const courseUpdated = createAction(
    "[Edit Course Dialog] Course Updated",
    props<{ update: Update<Course>; }>()
);

// let update: Update<Course>;
// update.changes // partial course is course entity but the object of all mandatory properties not the optional (nullable)