import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Navigation } from 'swiper';

export default function PostSwiper() {
  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation]}
        className="post_mySwiper"
      >
        <SwiperSlide>
          <img alt="" src="https://picsum.photos/200/300?random1"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img alt="" src="https://picsum.photos/200/300?random2"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img alt="" src="https://picsum.photos/200/300?random3"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img alt="" src="https://picsum.photos/200/300?random4"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img alt="" src="https://picsum.photos/200/300?random5"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img alt="" src="https://picsum.photos/200/300?random6"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img alt="" src="https://picsum.photos/200/300?random7"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img alt="" src="https://picsum.photos/200/300?random8"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img alt="" src="https://picsum.photos/200/300?random9"></img>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
