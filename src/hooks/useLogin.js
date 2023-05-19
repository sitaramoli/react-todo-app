import axios from "axios";
import { useReducer } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BASE_URL, LOGIN, LOGOUT } from "../constants/api";
import { useAuthCookie } from "../utils/cookies_manager";

export const initialState = {
    formData: {
        name: '',
        email: '',
        password: ''
    },
    formErrors: {
        name: '',
        email: '',
        password: ''
    },
    loading: false,
};

export const formReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.field]: action.value,
                },
            };
        case 'UPDATE_ERROR':
            return {
                ...state,
                formErrors: {
                    ...state.formErrors,
                    [action.field]: action.error,
                },
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.loading,
            };
        case 'RESET_FORM':
            return initialState;
        default:
            return state;
    }
};

const useLogin = () => {
    const [state, dispatch] = useReducer(formReducer, initialState);
    const { formData, formErrors, loading } = state;
    const { setAuthCookie, removeAuthCookie } = useAuthCookie();
    const navigate = useNavigate();

    const onInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'UPDATE_FIELD', field: name, value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // validate form fields and update errors
        const { email, password } = formData;
        const errors = {};
        if (!email) {
            errors.email = 'Email is required';
        }
        if (!password) {
            errors.password = 'Password is required';
        }
        // update form errors
        dispatch({ type: 'UPDATE_ERROR', field: email, error: errors.email });
        dispatch({ type: 'UPDATE_ERROR', field: password, error: errors.password });
        // handle form submission if there are no errors
        if (Object.keys(errors).length === 0) {
            try {
                dispatch({ type: 'SET_LOADING', loading: true });
                const res = await axios.post(`${BASE_URL}${LOGIN}`, { ...formData }, { withCredentials: true });
                toast.success(res.data.message);
                setAuthCookie();
                navigate('/');
            }
            catch (e) {
                toast.error(e.response.data.message);
            }
            finally {
                dispatch({ type: 'SET_LOADING', loading: false });
            }
        }
    }

    // handle logout
    const handleLogout = async () => {
        try {
            dispatch({ type: 'SET_LOADING', loading: true });
            await axios.get(`${BASE_URL}${LOGOUT}`, { withCredentials: true });
            removeAuthCookie();
            navigate('/login', { replace: true });
        } catch (e) {
            toast.error(e.response.data.message);
        }
        finally {
            dispatch({ type: 'SET_LOADING', loading: false });
        }
    }

    return { formData, formErrors, onInputChange, handleFormSubmit, loading, handleLogout };
}
export default useLogin;