import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllRestaurants } from "../../services/RestaurantService.jsx";

const Restaurants = () => {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);

  const [selectedLocationCode, setSelectedLocationCode] = useState(null);

  const getRestaurants = async () => {
    const res = await fetchAllRestaurants();
    if (res && res.data) {
      setRestaurants(res.data);
    }
  };

  useEffect(() => {
    getRestaurants();

  }, []);

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    const date = new Date(dateString);

    if (isNaN(date)) {
      return "Invalid Date";
    }

    return date.toLocaleDateString('en-US', options);
  }
  const truncateText = (text) => {
    if (text.length <= 110) {
      return text;
    }
    return text.slice(0, 110) + '...';
  }

  return (
    <div className="bg-center bg-contain bg-[#010302] h-screen">
      <div className="LeftContainer xl:w-1/2 xl:fixed left-0 top-0 bg-cover bg-restaurant w-full h-screen items-center z-10">
        <div className="WelcomeSect xl:ml-48 lg:top-0 flex flex-col items-center">
          <div className="mt-60 text-amber-200 text-5xl md:text-6xl font-normal font-waterBrush">
            Check Out
          </div>
          <div className="text-white text-4xl md:text-7xl font-normal font-beVietnam">
            Our Restaurants
          </div>
          <div className="IntroText md:px-20 my-5 text-center text-white text-base md:text-lg font-normal font-beVietnam">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.
          </div>
          <div className="Navbar mt-20 md:mt-60 h-16 p-2.5 bg-white rounded-full justify-start items-center gap-8 inline-flex">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="RestaurantBtn p-4 bg-white 
                rounded-full justify-start items-start 
                gap-2.5 flex 
                hover:bg-slate-700 hover:text-gray-100 
                transistion duration-200 
                text-zinc-950 text-base font-normal font-beVietnam leading-none"
            >
              Home
            </button>
            <button
              onClick={() => {
                navigate("/book");
              }}
              className="Button flex
              px-6 py-4 bg-neutral-900 
              rounded-full justify-start
              gap-2.5
              text-white text-sm font-normal font-beVietnam 
              uppercase leading-none tracking-wide 
              hover:bg-slate-700
              hover:text-gray-100 
              transistion duration-200"
            >
              Book a Table
            </button>
          </div>
        </div>
      </div>
      <div className="RightContainer flex flex-col items-center xl:items-end justify-center xl:mr-5 2xl:mr-40">
        <div className="ContentContainer flex flex-col gap-10 p-5 lg:p-0">
          <div className="ContentList mt-7 flex flex-col items-start gap-5">
            <div className="Location text-white text-xl font-normal font-beVietnam leading-10">
              Location
            </div>
            <Dropdown
              className="LocationSelect flex w-72 h-12 px-7 bg-white rounded-3xl font-beVietnam cursor-pointer"
              overlay={
                <div style={{ background: '#FFF', borderRadius: '5px' }}>
                  {restaurants
                    .reduce((uniqueRestaurants, restaurant) => {
                      // Sử dụng mảng duy nhất để lưu trữ các nhà hàng duy nhất dựa trên tên
                      const isUnique = !uniqueRestaurants.some((unique) => unique.locationName === restaurant.locationName);
                      if (isUnique) {
                        uniqueRestaurants.push(restaurant);
                      }
                      return uniqueRestaurants;
                    }, [])
                    .map((uniqueRestaurant) => (
                      <div
                        key={uniqueRestaurant.locationCode}
                        onClick={() => setSelectedLocationCode(uniqueRestaurant.locationCode)}
                      >
                        {uniqueRestaurant.locationName}
                      </div>
                    ))
                  }
                </div>
              }
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space className="inline-flex w-full justify-between">
                  <span>
                    {selectedLocationCode
                      ? restaurants.find((restaurant) => restaurant.locationCode === selectedLocationCode).locationName
                      : "Chọn vị trí"}
                  </span>
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
          <div className="flex flex-col gap-8">
            <div
              className="Content w-full md:w-[600px] cursor-pointer"
            >
              {restaurants.filter((restaurant) => {
                if (selectedLocationCode) {
                  // Lọc dựa trên selectedLocationCode
                  return restaurant.locationCode === selectedLocationCode;
                } else {
                  return true; // Hiển thị tất cả nhà hàng nếu không có locationCode được chọn
                }
              }).map((restaurant) => (
                <div key={restaurant?._id} className="w-full flex flex-col items-start md:flex-row md:inline-flex md:items-center gap-8">
                  <div className="ContentImg">
                    <img
                      className="w-96 md:w-[700px] rounded-lg"
                      alt="restaurant"
                      src={restaurant?.image}
                    />
                  </div>
                  <div className="Content flex-col justify-start items-start gap-2 inline-flex">
                    <div className="flex-col justify-start items-start flex">
                      <div className="text-amber-200 text-base font-normal font-beVietnam leading-relaxed">
                        {formatDate(restaurant?.createdAt)}
                      </div>
                      <div className="text-white text-lg font-normal font-beVietnam leading-10">
                        <Link to={`/menu/${restaurant?._id}`}>{restaurant?.name}</Link>
                      </div>
                    </div>
                    <div title={restaurant?.description} className="ContentText opacity-60 text-white text-base font-normal font-beVietnam leading-relaxed">
                      {truncateText(restaurant?.description)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
