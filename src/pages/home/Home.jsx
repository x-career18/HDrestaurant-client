import "./home.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { fetchAllBookings } from "../../services/BookingService";
import { fetchAllRestaurants } from "../../services/RestaurantService";
import { Button, Form, Modal, Input, Table } from "antd";
import moment from "moment/moment";
import FindInPageIcon from "@mui/icons-material/FindInPage";

const Home = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [form] = Form.useForm();
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [myBooking, setMyBooking] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleBtnHover = () => setIsHovered(true);
  const handleBtnLeave = () => setIsHovered(false);

  const [visibleModal, setVisibleModal] = useState(false);
  const showModal = () => {
    setVisibleModal(true);
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      console.log(values);
      const bookings = await fetchAllBookings();
      const matchingBooking = bookings.data.filter(
        (booking) =>
          booking.email === values.email &&
          booking.phoneNumber === values.phoneNumber
      );
      if (matchingBooking) {
        setSuccess(true);
        const restaurants = await fetchAllRestaurants();
        matchingBooking.map((booking) => {
          const matchingRestaurant = restaurants.data.find(
            (restaurant) => restaurant._id === booking.restaurantId
          );
          if (matchingRestaurant) {
            matchingBooking.forEach(
              (booking) => (booking.restaurantName = matchingRestaurant.name)
            );
            setMyBooking(matchingBooking);
          }
          console.log(myBooking);
        });
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.log("Finding failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setVisibleModal(false);
    setSuccess(false);
    formRef.current.resetFields();
  };

  const columns = [
    {
      title: "Tên thực khách",
      dataIndex: "fullName",
      key: "fullName",
      width: 100,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Ngày đặt bàn",
      dataIndex: "bookingDate",
      key: "bookingDate",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: "Giờ đặt ăn",
      dataIndex: "bookingTime",
      key: "bookingTime",
    },
    {
      title: "Tên nhà hàng",
      dataIndex: "restaurantName",
      key: "restaurantName",
    },
  ];

  useEffect(() => {
    fetchAllBookings();
  }, []);

  return (
    <div className="WelcomeText bg-home bg-center bg-cover h-screen overflow-y-auto flex flex-col items-center">
      <div className="flex-col items-center inline-flex mt-32 md:mt-48 mb-6">
        <span className="text-amber-200 text-4xl sm:text-5xl md:text-6xl font-normal font-waterBrush">
          The pure taste of
        </span>

        <span className="text-white text-7xl sm:text-8xl md:text-9xl font-normal font-beVietnam">
          Viet Nam
        </span>
      </div>
      <p className="w-96 px-1 md:w-[490px] h-auto text-center text-white text-sm md:text-lg font-normal font-beVietnam leading-10 md:mb-20 lg:mb-36">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore.
      </p>
      <div
        className={`OpeningHours w-60 h-auto mb-4 px-6 py-4 bg-white rounded-lg flex-col justify-start items-start gap-2 inline-flex transition-opacity duration-200 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="text-zinc-950 text-base font-normal font-beVietnam leading-7">
          Opening Hours
        </div>
        <section className="self-stretch h-auto flex-col justify-start items-start gap-2 flex">
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
        </section>
      </div>
      <Button
        onClick={showModal}
        className="bg-white font-beVietnam inline-flex items-center mb-2 gap-1 rounded-2xl"
      >
        <FindInPageIcon /> Check my bookings
      </Button>
      <Modal
        open={visibleModal}
        onOk={handleOk}
        onCancel={handleCancel}
        className="mt-48 font-beVietnam"
      >
        <Form form={form} ref={formRef} className="font-beVietnam text-lg">
          Check my bookings
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input
              type="text"
              placeholder="Enter email"
              className="mt-6 font-beVietnam"
            />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            rules={[
              { required: true, message: "Please enter your phone number!" },
            ]}
          >
            <Input
              type="number"
              placeholder="Enter phone number"
              className="font-beVietnam"
            />
          </Form.Item>
        </Form>
        {success && (
          <Table
            className="bg-white font-semibold text-sm leading-5 text-[#969696] drop-shadow-[0_3px_10px_rgba(119,119,119,0.10)]"
            columns={myBooking.length > 0 ? columns : null}
            dataSource={myBooking}
            loading={loading}
          />
        )}
      </Modal>
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
      <div className="my-1 font-beVietnam bg-black bg-opacity-30 text-sm text-amber-200 rounded-md p-1 drop-shadow-xl">
        Are you our employee? Go to{" "}
        <Link to="https://restaurantad.vercel.app/" className="underline underline-offset-2">Staff's Page</Link>
      </div>
    </div>
  );
};

export default Home;
