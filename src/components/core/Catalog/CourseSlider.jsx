
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { Course_Card } from "./Course_Card";

export const CourseSlider = ({ Courses = [] }) => {
  if (Courses.length === 0) {
    return <p>No Course Found</p>;
  }

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={25}
      loop={true}
      modules={[FreeMode, Pagination]}
     breakpoints={{
        1024: {
            slidesPerView:3,
        },
     }}
      className="w-full pb-10"
    >
      {Courses.map((course, i) => (
        <SwiperSlide key={i}>
          <Course_Card
            course={course}
            Height={"h-[250px]"}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

