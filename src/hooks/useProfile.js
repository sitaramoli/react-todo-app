import axios from "axios";
import { useReducer } from "react";
import { toast } from "react-hot-toast";
import { BASE_URL, PROFILE } from "../constants/api";

export const useProfile = () => {
    const initialState = { loading: false, user: { name: '', email: '' } };
    const reducer = (state, action) => {
        switch (action.type) {
            case 'UPDATE_USER':
                return { ...state, user: action.user };
            case 'UPDATE_LOADING':
                return { ...state, loading: action.loading };
            default: return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const { user, loading } = state;

    // fetch user data
    const fetchUserData = async () => {
        try {
            dispatch({ type: 'UPDATE_LOADING', loading: true });
            const { data } = await axios.get(`${BASE_URL}${PROFILE}`, { withCredentials: true });
            dispatch({ type: 'UPDATE_USER', user: data.data });
        }
        catch (e) {
            toast.error(e.response.data.message);
        }
        finally {
            dispatch({ type: 'UPDATE_LOADING', loading: false });
        }
    }

    return { user, loading, fetchUserData };
};