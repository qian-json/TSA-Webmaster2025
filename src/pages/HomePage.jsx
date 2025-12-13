import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./home.css"

export default function HomePage() {
  return <>
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      slidesPerView={1}
      style={{ width: "100vw", height: "67vh" }}
    >
      <SwiperSlide style={{ background: "#ddd" }}>Slide 1</SwiperSlide>
      <SwiperSlide style={{ background: "#bbb" }}>Slide 2</SwiperSlide>
      <SwiperSlide style={{ background: "#999" }}>Slide 3</SwiperSlide>
    </Swiper>

    
    <section className="card">
      <h2>Our Location</h2>
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55400.42401818665!2d-95.8984600616569!3d29.79133016309543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640dff9ae358adf%3A0x17966e0d7c2b1125!2sKaty%2C%20TX!5e0!3m2!1sen!2sus!4v1765663225217!5m2!1sen!2sus"
        className="iframe"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>



  </>
}