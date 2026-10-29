import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BigPlayButton, Player } from "video-react";
import "video-react/dist/video-react.css";

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import IconBtn from "../../common/IconBtn";

export const VideoDetails = () => {
    const { courseId, sectionId, subSectionId } = useParams();

    const navigate = useNavigate();
    const location = useLocation();
    const playerRef = useRef(null);
    const dispatch = useDispatch();

    const { token } = useSelector((state) => state.auth);

    const {
        courseSectionData = [],
        courseEntireData = {},
        completedLectures = [],
    } = useSelector((state) => state.viewCourse || {});

    const [videoData, setVideoData] = useState(null);
    const [previewSource, setPreviewSource] = useState("");
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);

    // Always work with an array of completed lecture IDs.
    const completedLectureIds = Array.isArray(completedLectures)
        ? completedLectures
        : [];

    // Find the current section and lecture safely.
    const currentSectionIndex = courseSectionData.findIndex(
        (section) => section._id === sectionId
    );

    const currentSection =
        currentSectionIndex >= 0
            ? courseSectionData[currentSectionIndex]
            : null;

    const currentSubSectionIndex =
        currentSection?.subSection?.findIndex(
            (subSection) => subSection._id === subSectionId
        ) ?? -1;

    const currentSubSection =
        currentSubSectionIndex >= 0
            ? currentSection.subSection[currentSubSectionIndex]
            : null;

    const isCompleted = completedLectureIds.includes(subSectionId);

    // Load the selected lecture whenever the route or course data changes.
    useEffect(() => {
        if (!courseId || !sectionId || !subSectionId) {
            navigate("/dashboard/enrolled-courses", { replace: true });
            return;
        }

        if (!courseSectionData.length) {
            return;
        }

        if (!currentSubSection) {
            console.error("Could not find the selected lecture.", {
                sectionId,
                subSectionId,
            });
            return;
        }

        setVideoData(currentSubSection);
        setPreviewSource(courseEntireData?.thumbnail || "");
        setVideoEnded(false);
        setLoading(false);
    }, [
        courseId,
        sectionId,
        subSectionId,
        courseSectionData,
        courseEntireData,
        currentSubSection,
        navigate,
    ]);

    // Check whether this is the first lecture in the course.
    const isFirstVideo = () => {
        return (
            currentSectionIndex === 0 &&
            currentSubSectionIndex === 0
        );
    };

    // Check whether this is the last lecture in the course.
    const isLastVideo = () => {
        if (currentSectionIndex < 0 || !currentSection) {
            return true;
        }

        const isLastSection =
            currentSectionIndex === courseSectionData.length - 1;

        const isLastSubSection =
            currentSubSectionIndex ===
            currentSection.subSection.length - 1;

        return isLastSection && isLastSubSection;
    };

    // Navigate to the next lecture.
    const goToNextVideo = () => {
        if (!currentSection || currentSubSectionIndex < 0) {
            return;
        }

        const subSections = currentSection.subSection || [];

        // Move to the next lecture in the current section.
        if (currentSubSectionIndex < subSections.length - 1) {
            const nextSubSectionId =
                subSections[currentSubSectionIndex + 1]._id;

            navigate(
                `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
            );

            return;
        }

        // Otherwise, move to the first lecture of the next non-empty section.
        for (
            let i = currentSectionIndex + 1;
            i < courseSectionData.length;
            i++
        ) {
            const nextSection = courseSectionData[i];

            if (nextSection.subSection?.length > 0) {
                navigate(
                    `/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextSection.subSection[0]._id}`
                );
                return;
            }
        }
    };

    // Navigate to the previous lecture.
    const goToPrevVideo = () => {
        if (!currentSection || currentSubSectionIndex < 0) {
            return;
        }

        // Move to the previous lecture in the current section.
        if (currentSubSectionIndex > 0) {
            const previousSubSectionId =
                currentSection.subSection[currentSubSectionIndex - 1]._id;

            navigate(
                `/view-course/${courseId}/section/${sectionId}/sub-section/${previousSubSectionId}`
            );

            return;
        }

        // Otherwise, find the last lecture in the previous non-empty section.
        for (
            let i = currentSectionIndex - 1;
            i >= 0;
            i--
        ) {
            const previousSection = courseSectionData[i];

            if (previousSection.subSection?.length > 0) {
                const lastSubSection =
                    previousSection.subSection[
                        previousSection.subSection.length - 1
                    ];

                navigate(
                    `/view-course/${courseId}/section/${previousSection._id}/sub-section/${lastSubSection._id}`
                );
                return;
            }
        }
    };

    // Mark the current lecture as completed.
    const handleLectureCompletion = async () => {
        if (loading || isCompleted) {
            return;
        }

        if (!token) {
            console.error("Cannot complete lecture: authentication token is missing.");
            return;
        }

        setLoading(true);

        try {
            const result = await markLectureAsComplete(
                {
                    courseId,
                    subSectionId,
                },
                token
            );

            if (result) {
                dispatch(updateCompletedLectures(subSectionId));
            }
        } catch (error) {
            console.error("Lecture completion failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-5 text-white">
            {!videoData ? (
                <img
                    src={previewSource}
                    alt="Course preview"
                    className="h-full w-full rounded-md object-cover"
                />
            ) : (
                <div className="relative aspect-video w-full">
                    <Player
                        ref={playerRef}
                        controls
                        playsInline
                        onEnded={() => setVideoEnded(true)}
                        src={videoData.videoUrl}
                    >
                        <BigPlayButton position="center" />

                        {videoEnded && (
                            <div
                                className="absolute inset-0 z-[100] grid h-full place-content-center font-inter"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1))",
                                }}
                            >
                                {!isCompleted && (
                                    <IconBtn
                                        disabled={loading}
                                        onclick={handleLectureCompletion}
                                        text={
                                            loading
                                                ? "Loading..."
                                                : "Mark as Completed"
                                        }
                                        customClasses="mx-auto max-w-max px-4 text-xl"
                                    />
                                )}

                                <IconBtn
                                    disabled={loading}
                                    onclick={() => {
                                        if (playerRef.current) {
                                            playerRef.current.seek(0);
                                            setVideoEnded(false);
                                        }
                                    }}
                                    text="Rewatch"
                                    customClasses="mx-auto mt-2 max-w-max px-4 text-xl"
                                />

                                <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                                    {!isFirstVideo() && (
                                        <button
                                            type="button"
                                            disabled={loading}
                                            onClick={goToPrevVideo}
                                            className="blackButton"
                                        >
                                            Prev
                                        </button>
                                    )}

                                    {!isLastVideo() && (
                                        <button
                                            type="button"
                                            disabled={loading}
                                            onClick={goToNextVideo}
                                            className="blackButton"
                                        >
                                            Next
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </Player>
                </div>
            )}

            <h1 className="mt-4 text-3xl font-semibold">
                {videoData?.title}
            </h1>

            <p className="pb-6 pt-2">
                {videoData?.description}
            </p>
        </div>
    );
};

export default VideoDetails;
