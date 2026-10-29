
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { apiConnector } from "../../services/apiconnector";
import { ratingEndpoints } from "../../services/apis";
import ReactStars from "react-stars";
import { FaStar } from "react-icons/fa";

export default function ReviewSlider() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const truncateWords = 15;

    useEffect(() => {
        let cancelled = false;

        const fetchReviews = async () => {
            try {
                const response = await apiConnector(
                    "GET",
                    ratingEndpoints.REVIEWS_DETAILS_API
                );

                if (!cancelled && response.data?.success) {
                    setReviews(
                        Array.isArray(response.data.data)
                            ? response.data.data
                            : []
                    );
                }
            } catch (err) {
                console.error("Failed to fetch reviews:", err);

                if (!cancelled) {
                    setError(true);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchReviews();

        return () => {
            cancelled = true;
        };
    }, []);

    const truncateReview = (review) => {
        if (!review) return "";

        const words = review.trim().split(/\s+/);

        if (words.length <= truncateWords) {
            return review;
        }

        return `${words.slice(0, truncateWords).join(" ")}...`;
    };

    if (loading) {
        return (
            <div className="py-10 text-center text-richblack-25">
                Loading reviews...
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-10 text-center text-richblack-25">
                Unable to load reviews. Please try again later.
            </div>
        );
    }

    if (reviews.length === 0) {
        return (
            <div className="py-10 text-center text-richblack-25">
                No reviews available yet.
            </div>
        );
    }

    return (
        <div className="w-full text-white">
            <div className="my-[60px] w-full max-w-maxContentTab lg:max-w-maxContent">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={16}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    breakpoints={{
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 16,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 25,
                        },
                    }}
                    modules={[Pagination]}
                    className="w-full"
                >
                    {reviews.map((review) => (
                        <SwiperSlide key={review._id} className="">
                           
                            <div className="flex flex-col gap-3 h-full rounded-md bg-richblack-800 p-4 text-[14px] text-richblack-25">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={
                                            review?.user?.image ||
                                            `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
                                                `${review?.user?.firstName || ""} ${review?.user?.lastName || ""}`.trim()
                                            )}`
                                        }
                                        alt={`${review?.user?.firstName || "User"}'s profile`}
                                        className="h-9 w-9 shrink-0 rounded-full object-cover"
                                    />

                                    <div className="min-w-0">
                                        <h2 className="truncate font-semibold text-richblack-5">
                                            {review?.user?.firstName}{" "}
                                            {review?.user?.lastName}
                                        </h2>

                                        <p className="truncate text-[12px] font-medium text-richblack-300">
                                            {review?.course?.courseName}
                                        </p>
                                    </div>
                                </div>
                                 <div className="mt-auto flex items-center gap-2">
                                    <span className="font-semibold text-yellow-100">
                                        {Number(review?.rating || 0).toFixed(1)}
                                    </span>

                                    <ReactStars
                                        count={5}
                                        value={Number(review?.rating) || 0}
                                        size={20}
                                        edit={false}
                                        activeColor="#ffd700"
                                        emptyIcon={<FaStar />}
                                        fullIcon={<FaStar />}
                                    />
                                </div>

                                <p className="break-words font-medium text-richblack-25">
                                    {truncateReview(review?.review)}
                                </p>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
