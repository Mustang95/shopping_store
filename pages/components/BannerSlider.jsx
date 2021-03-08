import React from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
SwiperCore.use([Navigation, Pagination]);
export default function BannerSlider() {
  const { height, width } = useWindowDimensions();
  // console.log(height, width);
  const slides = [];
  for (let i = 0; i < 5; i += 1) {
    slides.push(
      <SwiperSlide key={`slide-${i}`} tag="li">
        <img
          src={`https://picsum.photos/id/${i + 1}/${width}/${height - 50}`}
          style={{ listStyle: "none" }}
          alt={`Slide ${i}`}
        />
      </SwiperSlide>
    );
  }

  return (
    <React.Fragment>
      <Swiper
        id="main"
        tag="section"
        wrapperTag="ul"
        navigation
        pagination
        spaceBetween={0}
        slidesPerView={1}
      >
        {slides}
      </Swiper>
    </React.Fragment>
  );
}
