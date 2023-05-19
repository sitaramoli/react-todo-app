import axios from "axios";
import { useReducer } from "react";
import { toast } from "react-hot-toast";
import { BASE_URL, TASKS } from "../constants/api";

export const useTasks = () => {
    const initialState = {
        loading: false, tasks: [],
        formData: { title: '', description: '' },
        formErrors: { title: '', description: '' }
    };
    const reducer = (state, action) => {
        switch (action.type) {
            case 'UPDATE_FIELD':
                return {
                    ...state,
                    formData: { ...state.formData, [action.field]: action.value }
                };
            case 'UPDATE_ERROR':
                return {
                    ...state,
                    formErrors: { ...state.formErrors, [action.field]: action.error }
                };
            case 'UPDATE_TASKS':
                return { ...state, tasks: action.tasks };
            case 'UPDATE_LOADING':
                return { ...state, loading: action.loading };
            case 'RESET':
                return initialState;
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const { loading, tasks, formData, formErrors } = state;

    const onInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'UPDATE_FIELD', field: name, value: value });
    };

    const fetchTasks = async () => {
        try {
            // dispatch({ type: 'UPDATE_LOADING', loading: true });
            const { data } = await axios.get(`${BASE_URL}${TASKS}`, { withCredentials: true });
            dispatch({ type: 'UPDATE_TASKS', tasks: data.data });
        }
        catch (e) {
            toast.error(e.response.data.message);
        }
        finally {
            // dispatch({ type: 'UPDATE_LOADING', loading: false });
        }
    };

    // validate form data and handle add task
    const addTaskHandler = async (e) => {
        e.preventDefault();
        const { title, description } = formData;
        const errors = {};
        if (!title) {
            errors.title = 'Title is required';
        }
        if (!description) {
            errors.description = 'Description is required';
        }

        dispatch({ type: 'UPDATE_ERROR', field: title, error: errors.title });
        dispatch({ type: 'UPDATE_ERROR', field: description, error: errors.description });

        if (Object.keys(errors).length === 0) {
            try {
                dispatch({ type: 'UPDATE_LOADING', loading: true });
                const res = await axios.post(`${BASE_URL}${TASKS}`, { ...formData }, { withCredentials: true });
                fetchTasks();
                toast.success(res.data.message);
                dispatch({ type: 'RESET' });
            }
            catch (e) {
                toast.error(e.response.data.message);
            }
            finally {
                dispatch({ type: 'UPDATE_LOADING', loading: false });
            }
        }
    }

    // handle task delete
    const handleDeleteTask = async (id) => {
        try {
            // dispatch({ type: 'UPDATE_LOADING', loading: true });
            const res = await axios.delete(`${BASE_URL}${TASKS}/${id}`, { withCredentials: true });
            fetchTasks();
            toast.success(res.data.message);

        }
        catch (e) {
            toast.error(e.response.data.message);
        }
        finally {
            // dispatch({ type: 'UPDATE_LOADING', loading: false });
        }
    }

    // handle task update
    const handleUpdateTask = async (id) => {
        try {
            // dispatch({ type: 'UPDATE_LOADING', loading: true });
            const res = await axios.put(`${BASE_URL}${TASKS}/${id}`, {}, { withCredentials: true });
            fetchTasks();
            toast.success(res.data.message);
        }
        catch (e) {
            toast.error(e.response.data.message);
        }
        finally {
            // dispatch({ type: 'UPDATE_LOADING', loading: false });
        }
    }

    return { loading, tasks, fetchTasks, formData, onInputChange, addTaskHandler, formErrors, handleDeleteTask, handleUpdateTask };
};