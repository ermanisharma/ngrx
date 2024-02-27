import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Course, compareCourses } from "../model/course";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../action-types";

//state link to the courses module
// export interface CoursesState {
//     //courses: Course[];
//     // this entities, ids format is defined as Entity Format
//         entities: { [key: number]: Course; }, // dictionary whose key is identifies i.e. id in courses
//     ids: number[];  //for order create an auxilary id of identifiers

//     //Above format is most powerful to store entities instore but is not convinient to handle, more time consuming
//     //to handle we need to write the reducers
//     //better use Ngrx entity model- easy, efficient, can define our state  in a much more efficient way

// }


export interface CoursesState extends EntityState<Course> {
    allCoursesLoaded: boolean; //To check whether the courses has been loaded or not 
}

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses,
    //selectId: course => course.id // uniquely identifies the entity, 
    //use this only if your data doesn't have 'id' property and 
    //instead have seomthing like courseId or something else as identifier property
});

export const {
    selectAll
} = adapter.getSelectors();
export const initialCoursesState = adapter.getInitialState({
    allCoursesLoaded: false
});

export const coursesReducer = createReducer(
    initialCoursesState,
    on(CourseActions.allCoursesLoaded,
        (state, action) => adapter.addAll(
            action.courses,
            { ...state, allCoursesLoaded: true }) // create shallow copy of state using abbreviated syntax
    ),

    on(CourseActions.courseUpdated, (state, action) => adapter.updateOne(action.update, state))
);

