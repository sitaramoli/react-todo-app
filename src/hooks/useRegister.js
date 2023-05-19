import axios from "axios";
import { useReducer } from "react";
import { toast } from "react-hot-toast";
import { BASE_URL, REGISTER } from "../constants/api";
import { formReducer, initialState } from "./useLogin";

const useRegister = () => {
    const [state, dispatch] = useReducer(formReducer, initialState);
    const { formData, formErrors, loading } = state;

    const onInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'UPDATE_FIELD', field: name, value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // validate form fields and update errors
        const { name, email, password } = formData;
        const errors = {};
        if (!name) {
            errors.name = 'Name is required';
        }
        if (!email) {
            errors.email = 'Email is required';
        }
        if (!password) {
            errors.password = 'Password is required';
        }

        // update form errors
        dispatch({ type: 'UPDATE_ERROR', field: name, error: errors.name });
        dispatch({ type: 'UPDATE_ERROR', field: email, error: errors.email });
        dispatch({ type: 'UPDATE_ERROR', field: password, error: errors.password });

        if (Object.keys(errors).length === 0) {
            try {
                dispatch({ type: 'SET_LOADING', loading: true });
                const res = await axios.post(`${BASE_URL}${REGISTER}`, { ...formData }, { withCredentials: true });
                toast.success(res.data.message);
            }
            catch (e) {
                toast.error(e.response.data.message);
            }
            finally {
                dispatch({ type: 'SET_LOADING', loading: false });
            };
        }
    };


    return { formData, formErrors, loading, onInputChange, handleFormSubmit };
}

export default useRegister;