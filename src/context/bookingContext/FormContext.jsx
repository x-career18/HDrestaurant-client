import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const initialState = {
        fullName: '',
        bookingDate: '',
        bookingTime: '',
        numberOfPeople: '',
        phoneNumber: '',
        email: '',
        message: '',
        restaurantId: '',
    };

    const [formData, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'update':
                return { ...state, ...action.payload };
            default:
                return state;
        }
    }, initialState);

    return (
        <FormContext.Provider value={{ formData, dispatch }}>
            {children}
        </FormContext.Provider>
    );
};

FormProvider.propTypes = {
    children: PropTypes.node,
};

export const useForm = () => {
    return useContext(FormContext);
};
