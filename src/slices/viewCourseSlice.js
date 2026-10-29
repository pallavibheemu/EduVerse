
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseSectionData: [],
    courseEntireData: [],
    completedLectures: [],
    totalNoOfLectures: 0,
};

const viewCourseSlice = createSlice({
    name: "viewCourse",
    initialState,
    reducers: {
        setCourseSectionData: (state, action) => {
            state.courseSectionData = action.payload;
        },

        setEntireCourseData: (state, action) => {
            state.courseEntireData = action.payload;
        },

        setTotalNoOfLectures: (state, action) => {
            state.totalNoOfLectures = action.payload;
        },

        setCompletedLectures: (state, action) => {
            state.completedLectures = Array.isArray(action.payload)
                ? action.payload.map((id) => String(id))
                : [];
        },

        updateCompletedLectures: (state, action) => {
            if (!Array.isArray(state.completedLectures)) {
                state.completedLectures = [];
            }

            const lectureId = String(action.payload);

            if (!state.completedLectures.includes(lectureId)) {
                state.completedLectures.push(lectureId);
            }
        },
    },
});

export const {
    setCourseSectionData,
    setEntireCourseData,
    setTotalNoOfLectures,
    setCompletedLectures,
    updateCompletedLectures,
} = viewCourseSlice.actions;

export default viewCourseSlice.reducer;
