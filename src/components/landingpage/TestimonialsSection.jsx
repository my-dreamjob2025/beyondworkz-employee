import { useState } from "react";
import Sarahjenkins from "../../assets/images/common/userimage.svg";

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Product Manager @ InnovateTech",
      text: "I found my ideal role within two weeks of signing up. The platform is incredibly intuitive, and the matching algorithm is spot on. I've never had a smoother job search experience.",
      image: Sarahjenkins,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Engineer @ DevCore",
      text: "Beyond Workz completely transformed my job hunt. The recommendations were accurate and the process felt effortless.",
      image: Sarahjenkins,
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "UI Designer @ Creatify",
      text: "The interface is beautiful and easy to use. I landed interviews within days of applying!",
      image: Sarahjenkins,
    },
  ];

  const [active, setActive] = useState(1);

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActive((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const slideOffset = 320;

  return (
    <section className="w-full flex justify-center bg-white py-12 sm:py-16 lg:py-24 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Slider Container */}
        <div className="relative flex items-center justify-center min-h-[320px] sm:min-h-[380px] lg:min-h-[420px] w-full">
          {testimonials.map((item, index) => {
            const isActive = index === active;

            return (
              <div
                key={item.id}
                className={`absolute transition-all duration-500 ease-in-out w-[90vw] max-w-[800px]
                  ${isActive ? "z-20 scale-100 opacity-100" : "z-10 scale-90 opacity-40"}`}
                style={{
                  transform: `translateX(${(index - active) * slideOffset}px)`,
                }}
              >
                <div
                  className="w-full min-h-[320px] sm:min-h-[380px] lg:min-h-[439px]
                  rounded-2xl lg:rounded-[24px] border border-slate-200
                  bg-white shadow-lg
                  px-6 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-14
                  flex flex-col gap-6 sm:gap-8
                  text-center"
                >
                  {/* Stars */}
                  <div className="text-yellow-400 text-base sm:text-lg">⭐⭐⭐⭐⭐</div>

                  {/* Testimonial Text */}
                  <p className="font-['Inter'] font-medium text-base sm:text-lg lg:text-[24px] leading-relaxed tracking-[-0.24px] text-center text-slate-700 max-w-full mx-auto text-[#0F172A]">
                    "{item.text}"
                  </p>

                  {/* Profile Section */}
                  <div
                    className="flex flex-col items-center pt-2 gap-4 mx-auto"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />

                    <p className="font-semibold text-slate-900">{item.name}</p>

                    <p className="text-sm text-slate-500">{item.role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controller */}
        <div className="mt-8 sm:mt-12 flex justify-center">
          <div
            className="w-[184px] h-[40px] 
            bg-[#FFFFFF] 
            rounded-[20px] 
            flex items-center justify-between 
            px-4 shadow-sm"
          >
            <button
              onClick={prevSlide}
              className="text-gray-600 text-lg leading-none"
            >
              ‹
            </button>

            <div className="relative w-[80px] h-[4px] bg-[#DDDDDD] rounded-[99px] overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-blue-600 rounded-[99px] transition-all duration-300"
                style={{
                  width: `${((active + 1) / testimonials.length) * 100}%`,
                }}
              />
            </div>

            <button
              onClick={nextSlide}
              className="text-gray-600 text-lg leading-none"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
