import axios from './customizeAxios.jsx';

const fetchAllRestaurants = () => {
    return axios.get('/api/v1/restaurants');
}

const fetchRestaurantById = (id) => {
    return axios.get(`/api/v1/restaurants/${id}`);
};

export {
    fetchAllRestaurants,
    fetchRestaurantById,
};