import "./home.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleBtnHover = () => setIsHovered(true);
  const handleBtnLeave = () => setIsHovered(false);

  return (
    <div className="WelcomeText bg-home bg-center bg-cover h-screen flex flex-col items-center">
      <div className="flex-col items-center inline-flex mt-48 mb-6">
        <div className="text-amber-200 text-4xl sm:text-5xl md:text-6xl font-normal font-waterBrush">
          The pure taste of
        </div>

        <div className="text-white text-7xl sm:text-8xl md:text-9xl font-normal font-beVietnam">
          Viet Nam
        </div>
      </div>
      <div className="w-96 px-1 md:w-[490px] h-auto text-center text-white text-sm md:text-lg font-normal font-beVietnam leading-10 md:mb-20 lg:mb-36">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore.
      </div>
      <div
        className={`OpeningHours w-60 h-auto mb-8 px-6 py-4 bg-white rounded-lg flex-col justify-start items-start gap-2 inline-flex transition-opacity duration-200 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="text-zinc-950 text-base font-normal font-beVietnam leading-7">
          Opening Hours
        </div>
        <div className="self-stretch h-auto flex-col justify-start items-start gap-2 flex">
          <div className="self-stretch justify-between items-start inline-flex">
            <div className="text-zinc-950 text-sm font-normal font-beVietnam leading-relaxed">
              Mon
            </div>
            <div className="text-zinc-950 text-sm font-normal font-beVietnam leading-relaxed">
              closed
            </div>
          </div>
          <div className="self-stretch justify-between items-start inline-flex">
            <div className="text-zinc-950 text-sm font-normal font-beVietnam leading-relaxed">
              Tue - Fri
            </div>
            <div className="text-zinc-950 text-sm font-normal font-beVietnam leading-relaxed">
              4pm - 8pm
            </div>
          </div>
          <div className="self-stretch justify-between items-start inline-flex">
            <div className="text-zinc-950 text-sm font-normal font-beVietnam leading-relaxed">
              Sat- Sun
            </div>
            <div className="text-zinc-950 text-sm font-normal font-beVietnam leading-relaxed">
              5pm - 11pm
            </div>
          </div>
        </div>
      </div>
      <div className="Navbar w-auto h-16 p-2.5 bg-white rounded-full justify-start items-center gap-8 inline-flex">
        <div className="justify-start items-center gap-0.5 flex">
          <div className="justify-start items-center flex">
            <button
              onClick={() => {
                navigate("/restaurants");
              }}
              className="RestaurantBtn p-4 bg-white 
                rounded-full justify-start items-start 
                gap-2.5 flex 
                hover:bg-slate-700 hover:text-gray-100 
                transistion duration-200 
                text-zinc-950 text-base font-normal font-beVietnam leading-none"
            >
              Restaurants
            </button>
          </div>
          <button
            onClick={() => {
              navigate("/book");
            }}
            onMouseEnter={handleBtnHover}
            onMouseLeave={handleBtnLeave}
            className="BookBtn flex px-6 py-4
            bg-neutral-900 
            rounded-full justify-start gap-2.5
            text-white text-sm font-normal font-beVietnam 
            uppercase leading-none tracking-wide 
            hover:bg-slate-700
            hover:text-gray-100 
            transistion duration-200"
          >
            <div className="text-white text-sm font-normal font-beVietnam uppercase leading-none tracking-wide">
              Book a Table
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
