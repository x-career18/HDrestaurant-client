import { useNavigate } from "react-router-dom";
import { useForm } from "../../context/bookingContext/FormContext.jsx";
import { fetchCreateBooking } from "../../services/bookingService.jsx";
import { useEffect } from "react";
import { useState } from "react";
import { Image, Modal } from "antd";
import './Message.css'

const Message = () => {
  const navigate = useNavigate();
  const { formData, dispatch } = useForm();
  const [isSuccessModal, setIsSuccessModal] = useState(false)

  const showModal = () => {
    setIsSuccessModal(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Dispatch action để cập nhật formData
    dispatch({
      type: 'update',
      payload: { [name]: value },
    });
  };

  useEffect(() => {
    // Lấy thông tin biểu mẫu đã lưu trong localStorage (nếu có)
    const savedFormData = JSON.parse(localStorage.getItem('formData')) || {};

    if (Object.keys(savedFormData).length > 0) {
      dispatch({ type: 'update', payload: savedFormData });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lấy thông tin từ formData
    const {
      fullName,
      bookingDate,
      bookingTime,
      numberOfPeople,
      phoneNumber,
      email,
      message,
      restaurantId,
    } = formData;

    // Tạo đối tượng dữ liệu để gửi lên API
    const formDataToSend = {
      fullName,
      bookingDate,
      bookingTime,
      numberOfPeople: parseInt(numberOfPeople),
      phoneNumber,
      email,
      message,
      restaurantId,
    };

    try {
      // Gửi dữ liệu biểu mẫu đến API bằng phương thức fetch hoặc axios
      const response = await fetchCreateBooking(formDataToSend);

      if (response.status === 200) {
        // Xử lý thành công, ví dụ: chuyển hướng đến trang "Success"
        localStorage.removeItem('formData');
        showModal()
      } else {
        // Xử lý khi có lỗi
      }
    } catch (error) {
      console.error('Lỗi khi gửi biểu mẫu:', error);
    }
  };

  return (
    <div className="bg-center bg-contain bg-[#010302]">
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
                navigate("/book");
              }}
              className="RestaurantBtn p-4 bg-white 
                rounded-full justify-start items-start 
                gap-2.5 flex 
                hover:bg-slate-700 hover:text-gray-100 
                transistion duration-200 
                text-zinc-950 text-base font-normal font-beVietnam leading-none"
            >
              Back
            </button>
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
          </div>
        </div>
      </div>
      <div className="RightContainer xl:h-screen xl:mr-8 2xl:mr-40 flex flex-col xl:items-end items-center justify-center">
        <form className="MsgForm w-[600px] md:max-xl:w-[800px] flex-col gap-12 inline-flex px-32 py-5 lg:py-0 lg:px-0">
          <div className="flex flex-col gap-4">
            <div className="text-white text-opacity-80 text-lg font-normal font-beVietnam leading-loose">
              Volutpat maecenas volutpat blandit aliquam etiam erat velit
              scelerisque. Arcu non odio euismod lacinia. Tortor aliquam nulla
              facilisi cras fermentum odio eu.
            </div>
          </div>
          <div className="h-24 flex-col gap-4 flex">
            <p className="text-white text-opacity-80 text-base font-normal font-beVietnam leading-relaxed">
              Your Phone Number
            </p>
            <div className="h-14 px-6 py-4 rounded-lg border border-white border-opacity-10 inline-flex">
              <input
                type="number"
                name="phoneNumber"
                onChange={handleInputChange}
                value={formData.phoneNumber}
                placeholder="Enter your phone number"
                className="w-full bg-transparent outline-none text-white text-lg font-normal font-beVietnam leading-7"
              />
            </div>
          </div>
          <div className="h-24 flex-col gap-4 flex">
            <p className="text-white text-opacity-80 text-base font-normal font-beVietnam leading-relaxed">
              Email
            </p>
            <div className="h-14 px-6 py-4 rounded-lg border border-white border-opacity-10 inline-flex">
              <input
                type="email"
                name="email"
                onChange={handleInputChange}
                value={formData.email}
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none text-white text-lg font-normal font-beVietnam leading-7"
              />
            </div>
          </div>
          <div className="h-60 flex-col gap-4 flex">
            <p className="text-white text-opacity-80 text-base font-normal font-beVietnam leading-relaxed">
              Message
            </p>
            <div className="h-48 px-6 py-4 rounded-lg border border-white border-opacity-10 justify-start items-start inline-flex">
              <textarea
                placeholder="Leave us your message"
                name="message"
                onChange={handleInputChange}
                value={formData.message}
                className="w-full h-full bg-transparent outline-none resize-none text-white text-lg font-normal font-beVietnam leading-7"
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
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
      <Modal
        width="358px"
        open={isSuccessModal}
        footer={null}
        closable={false}
        onCancel={() => {
          setIsSuccessModal(false)
        }}
        centered
      >
        <div className="common-modal modal-register-success">
          <Image
            src="/images/success.png"
            alt="phone"
            width={294}
            height={155}
          />
          <div className="title">
            Booking bàn thành công
          </div>
          <div className="content">
            <div>
              Cảm ơn bạn đã book bàn tại đây. Xin vui lòng đợi nhân viên bộ phận Chăm sóc khách hàng liên hệ lại để hỗ trợ. Xin cảm ơn!
            </div>
          </div>
          <button
            className="cancel-btn"
            onClick={() => {
              setIsSuccessModal(false)
              navigate("/")
              window.location.reload();
            }}
          >
            Đóng
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Message;
