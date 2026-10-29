
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
    setCompletedLectures,
    setCourseSectionData,
    setEntireCourseData,
    setTotalNoOfLectures,
} from "../slices/viewCourseSlice";

import { CourseReviewModal } from "../components/core/ViewCourse/CourseReviewModal";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";

export default function ViewCourse() {
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [reviewModal, setReviewModal] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const fetchCourseDetails = async () => {
            try {
                const response = await getFullDetailsOfCourse(
                    courseId,
                    token
                );

                if (cancelled || !response?.courseDetails) {
                    return;
                }

                const courseDetails = response.courseDetails;
                const courseContent = Array.isArray(
                    courseDetails.courseContent
                )
                    ? courseDetails.courseContent
                    : [];

                dispatch(setCourseSectionData(courseContent));
                dispatch(setEntireCourseData(courseDetails));

                // The backend returns these IDs as completedVideos.
                const completedVideos = Array.isArray(
                    response.completedVideos
                )
                    ? response.completedVideos.map((video) =>
                          String(video?._id ?? video)
                      )
                    : [];

                dispatch(setCompletedLectures(completedVideos));

                const totalLectures = courseContent.reduce(
                    (total, section) =>
                        total +
                        (Array.isArray(section.subSection)
                            ? section.subSection.length
                            : 0),
                    0
                );

                dispatch(setTotalNoOfLectures(totalLectures));
            } catch (error) {
                console.error("Failed to load course details:", error);
            }
        };

        if (courseId && token) {
            fetchCourseDetails();
        }

        return () => {
            cancelled = true;
        };
    }, [courseId, token, dispatch]);

    return (
        <>
            <div className="relative flex min-h-[calc(100vh-3.5rem)]">
                <VideoDetailsSidebar setReviewModal={setReviewModal} />

                <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                    <div className="mx-6">
                        <Outlet />
                    </div>
                </div>
            </div>

            {reviewModal && (
                <CourseReviewModal setReviewModal={setReviewModal} />
            )}
        </>
    );
}
