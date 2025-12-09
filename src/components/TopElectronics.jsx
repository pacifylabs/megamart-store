import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { brandSlides } from "../data/data";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
export default function TopElectronics() {
  return (
    <div className="max-w-[95%] mx-auto px-4 sm:px-6 mt-8 mb-12">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-semibold">
          Top <span className="text-blue-600">Electronics Brands</span>
          <div className="w-40 h-1 bg-blue-400 rounded mt-1"></div>
        </h3>
        <Link
          to="/listing"
          className="text-blue-600 text-sm hover:underline hover:text-blue-800 transition"
        >
          View All →
        </Link>
      </div>
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={12}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {brandSlides.map((b, i) => (
          <SwiperSlide key={i}>
            <div
              className="rounded-lg overflow-hidden relative h-[160px] sm:h-[200px]"
              style={{ backgroundColor: b.bg }}
            >
              <div className="flex flex-col justify-between h-full p-4 sm:p-6">
                <div className="text-xs sm:text-sm" style={{ color: b.color }}>
                  {b.title}
                </div>
                <div
                  className="text-sm sm:text-lg font-bold"
                  style={{ color: b.color }}
                >
                  {b.subtitle}
                </div>
              </div>
              <div className="absolute bottom-2 right-2 w-28 sm:w-35">
                <img
                  src={b.img}
                  alt={b.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
