import { useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import { useForm } from "../../context/bookingContext/FormContext.jsx";
import { useEffect, useState } from "react";
import { fetchAllRestaurants } from "../../services/RestaurantService.jsx";

const Book = () => {
  const navigate = useNavigate();
  const { formData, dispatch } = useForm();
  const [restaurants, setRestaurants] = useState([]);

  const getRestaurants = async () => {
    try {
      const res = await fetchAllRestaurants();
      if (res && res.data) {
        setRestaurants(res.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu nhà hàng:', error);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'update', payload: { [name]: value } });
  };

  const handleRestaurantSelect = ({ key }) => {
    dispatch({ type: 'update', payload: { restaurantId: key } });
  };

  const dropdownMenu = (
    <Menu onClick={handleRestaurantSelect}>
      {restaurants.map((restaurant) => (
        <Menu.Item key={restaurant._id}>{restaurant.name}</Menu.Item>
      ))}
    </Menu>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lưu thông tin vào localStorage
    localStorage.setItem('formData', JSON.stringify(formData));

    // Chuyển hướng đến trang "Message"
    navigate("/message");
  };

  return (
    <div className="bg-center bg-cover bg-[#010302]">
      <div className="LeftContainer xl:w-1/2 xl:fixed left-0 top-0 bg-cover bg-restaurant w-full h-screen items-center z-10">
        <div className="WelcomeSect xl:ml-48 lg:top-0 flex flex-col items-center">
          <div className="mt-60 text-amber-200 text-5xl md:text-6xl font-normal font-waterBrush">
            Check Out
          </div>
          <div className="text-white text-6xl md:text-7xl font-normal font-beVietnam">
            Our Menus
          </div>
          <div className="IntroText md:px-20 my-5 text-center text-white text-base md:text-lg font-normal font-beVietnam">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.
          </div>
          <div className="Navbar mt-20 md:mt-60 h-16 p-2.5 bg-white rounded-full justify-start items-center gap-2 inline-flex">
            <button
              onClick={() => {
                navigate("/restaurants");
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
              Browse restaurants
            </button>
            <button
              onClick={() => {
                navigate("/message");
              }}
              className="RestaurantBtn p-4 bg-white 
                rounded-full justify-start items-start 
                gap-2.5 flex 
                hover:bg-slate-700 hover:text-gray-100 
                transistion duration-200 
                text-zinc-950 text-base font-normal font-beVietnam leading-none"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="RightContainer xl:h-screen xl:mr-8 2xl:mr-40 flex flex-col xl:items-end items-center justify-center">
        <form onSubmit={handleSubmit} className="BookForm w-[600px] md:max-xl:w-[800px] flex-col gap-12 inline-flex px-32 py-5 lg:py-0 lg:px-0">
          <div className="flex flex-col gap-4">
            <div className="text-white text-4xl font-normal font-beVietnam leading-10">
              Book a table
            </div>
            <div className="text-white text-opacity-80 text-lg font-normal font-beVietnam leading-loose">
              Our dining atmosphere is casual and comfortable. To reflect this
              environment, we maintain a formal dresscode.
            </div>
          </div>
          <div className="h-24 flex-col gap-4 flex">
            <p className="text-white text-opacity-80 text-base font-normal font-beVietnam leading-relaxed">
              Pick a restaurant near you
            </p>
            <Dropdown
              className="LocationSelect flex w-full h-12 px-7 bg-white rounded-3xl font-beVietnam cursor-pointer"
              overlay={dropdownMenu}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space className="inline-flex w-full justify-between">
                  <span>{formData.restaurantId ? restaurants.find(restaurant => restaurant._id === formData.restaurantId).name : "Select a restaurant"}</span>
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
          <div className="h-24 flex-col gap-4 flex">
            <p className="text-white text-opacity-80 text-base font-normal font-beVietnam leading-relaxed">
              Name
            </p>
            <div className="h-14 px-6 py-4 rounded-lg border border-white border-opacity-10 inline-flex">
              <input
                type="text"
                placeholder="Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full bg-transparent outline-none text-white text-lg font-normal font-beVietnam leading-7"
              />
            </div>
          </div>
          <div className="h-24 flex-col gap-4 flex">
            <p className="text-white text-opacity-80 text-base font-normal font-beVietnam leading-relaxed">
              Number of guests
            </p>
            <div className="h-14 px-6 py-4 rounded-lg border border-white border-opacity-10 inline-flex">
              <input
                type="number"
                min="1"
                max="30"
                placeholder="1 - 30"
                name="numberOfPeople"
                value={formData.numberOfPeople}
                onChange={handleInputChange}
                className="w-full bg-transparent outline-none text-white text-lg font-normal font-beVietnam leading-7"
              />
            </div>
          </div>
          <div className="gap-8 inline-flex">
            <div className="grow shrink basis-0 flex-col justify-start gap-4 inline-flex">
              <p className="text-white text-opacity-80 text-base font-normal font-beVietnam leading-relaxed">
                Date
              </p>
              <div className="h-14 pl-2 md:px-6 py-4 rounded-lg border border-white border-opacity-10 items-center inline-flex">
                <input
                  type="date"
                  name="bookingDate"
                  value={formData.bookingDate}
                  onChange={handleInputChange}
                  className="w-full bg-transparent outline-none text-white text-lg font-normal font-beVietnam leading-7"
                />
              </div>
            </div>
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
              <p className="text-white text-opacity-80 text-base font-normal font-beVietnam leading-relaxed">
                Time
              </p>
              <div className="h-14 pl-2 md:px-6 py-4 rounded-lg border border-white border-opacity-10 items-center inline-flex">
                <input
                  type="time"
                  name="bookingTime"
                  value={formData.bookingTime}
                  onChange={handleInputChange}
                  className="w-full bg-transparent outline-none text-white text-lg font-normal font-beVietnam leading-7"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="h-14 px-6 py-4
            bg-orange-200 rounded-full
              justify-center border-none
              items-center inline-flex 
              w-full text-zinc-950 text-base 
              font-normal font-beVietnam 
              uppercase leading-none tracking-wide
              hover:bg-orange-300
              hover:text-white
              transistion duration-200"
          >
            Book now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Book;
