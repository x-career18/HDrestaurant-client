import axios from './customizeAxios.jsx';

const fetchAllBookings = () => {
    return axios.get('/api/v1/bookings');
};

const fetchCreateBooking = (booking) => {
    return axios.post('/api/v1/bookings', booking);
};

export {
    fetchAllBookings,
    fetchCreateBooking,
};