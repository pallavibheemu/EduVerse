
import React, { useEffect, useState } from "react";
import GetAvgRating from "../../../utils/avgRating";
import RatingStars from "../../common/RatingStars";
import { Link } from "react-router-dom";

export const Course_Card = ({ course, Height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews || []);
    setAvgReviewCount(count);
  }, [course?.ratingAndReviews]);

  return (
    <Link
      to={`/courses/${course._id}`}
      className="block w-full"
    >
      <div className="w-full">
        <div className="rounded-lg">
          <img
            src={course?.thumbnail}
            alt="Course thumbnail"
            draggable={false}
            className={`${Height} w-full rounded-xl object-cover`}
          />
        </div>

        <div className="flex flex-col gap-2 px-1 py-3">
          <p className="text-xl text-richblack-5">
            {course?.courseName}
          </p>

          <p className="text-sm text-richblack-50">
            {course?.instructor?.firstName}{" "}
            {course?.instructor?.lastName}
          </p>

          <div className="flex items-center gap-2">
            <span className="text-yellow-5">
              {avgReviewCount || 0}
              <RatingStars Review_Count={avgReviewCount} />
            </span>

            <span className="text-richblack-400">
              {course?.ratingAndReviews?.length || 0} Ratings
            </span>
          </div>

          <p className="text-xl text-richblack-5">
            {course?.price}
          </p>
        </div>
      </div>
    </Link>
  );
};
