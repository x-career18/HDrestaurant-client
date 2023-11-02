import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRestaurantById } from "../../services/RestaurantService.jsx";
import { useParams } from "react-router-dom";


const Menu = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState([]);
  useEffect(() => {
    getRestaurant();
  }, [id]);

  const getRestaurant = async () => {
    const res = await fetchRestaurantById(id);
    if (res && res.data) {
      setRestaurant(res.data);
    }
  };

  return (
    <div className="bg-center bg-contain bg-[#010302]">
      <div className="LeftContainer xl:w-1/2 xl:fixed left-0 top-0 bg-cover bg-menu w-full h-screen items-center">
        <div className="WelcomeSect xl:ml-20 flex flex-col items-center">
          <div className="mt-20 text-amber-200 text-5xl md:text-6xl font-normal font-waterBrush">
            Check Out
          </div>
          <div className="text-white text-6xl md:text-7xl font-normal font-beVietnam">
            Our Menus
          </div>
          <div className="Navbar mt-96 md:mt-[500px] h-16 p-2.5 bg-white rounded-full justify-start items-center gap-8 inline-flex">
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
              Browse Restaurants
            </button>
          </div>
          <button
            onClick={() => {
              navigate("/book");
            }}
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
      </div>
      {restaurant && (
        <div className="RightContainer flex flex-col items-center xl:items-end justify-center xl:pt-24 xl:mr-5 2xl:mr-40">
          <div className="ContentContainer w-full md:w-[600px] flex-col gap-10 inline-flex p-5 lg:p-0">
            <div className="flex-col gap-4 flex">
              <p className="text-white text-opacity-80 text-xl font-normal font-beVietnam leading-relaxed">
                {restaurant?.name}
              </p>
              <div className="text-white text-opacity-60 text-base font-normal font-beVietnam leading-loose">
                {restaurant?.address}
              </div>
            </div>
            <img
              className="rounded-lg"
              src={restaurant?.image}
              alt="restaurant event"
            />
            <div className="flex-col gap-4 flex">
              <p className="text-white text-opacity-80 text-xl font-normal font-beVietnam leading-relaxed">
                Giới thiệu sơ lược
              </p>
              <div className="text-white text-opacity-60 text-base font-normal font-beVietnam leading-loose">
                {restaurant?.description}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
