import { PhotoProvider, PhotoView } from 'react-photo-view';

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Navigation } from 'swiper';
const imgArr = [
  'https://picsum.photos/200/300?random1',
  'https://picsum.photos/200/300?random2',
  'https://picsum.photos/200/300?random3',
  'https://picsum.photos/200/300?random4',
  'https://picsum.photos/200/300?random5',
  'https://picsum.photos/200/300?random6',
  'https://picsum.photos/200/300?random7',
  'https://picsum.photos/200/300?random8',
  'https://picsum.photos/200/300?random9',
  'https://picsum.photos/200/300?random10',
  'https://picsum.photos/200/300?random11',
  'https://picsum.photos/200/300?random12',
];

const imgArr2 = [
  'https://picsum.photos/200/300?random1',
  'https://picsum.photos/200/300?random2',
  'https://picsum.photos/200/300?random3',
];

export default function PhotoReviewSwiperDefault() {
  const ShowSwiper = ({ data }) => {
    return (
      <Swiper
        slidesPerView={6}
        spaceBetween={1}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation]}
        className="post_mySwiper"
      >
        {data.map((v, index) => {
          return (
            <SwiperSlide key={'swiper' + index}>
              <PhotoProvider>
                {data.map((img, imgIndex) => {
                  return index === imgIndex ? (
                    <PhotoView key={'img' + imgIndex} src={img}>
                      <img src={img} alt="" />
                    </PhotoView>
                  ) : (
                    <PhotoView src={img}></PhotoView>
                  );
                })}
              </PhotoProvider>
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  };
  return (
    <>
      <ShowSwiper data={imgArr} />
    </>
  );
}
