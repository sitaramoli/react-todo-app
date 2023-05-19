import React, { useEffect } from 'react';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import TodoItem from '../../components/TodoItem/TodoItem';
import { useTasks } from '../../hooks/useTasks';
import './Home.scss';

const Home = () => {

    const { loading, tasks, fetchTasks, formData, addTaskHandler, formErrors, onInputChange, handleDeleteTask, handleUpdateTask } = useTasks();

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className='home'>
            <form onSubmit={addTaskHandler} method="post" className='addtask-form'>
                <InputField type={'text'} name={'title'} error={formErrors.title} placeholder='Title' value={formData.title} onChange={onInputChange} required={true} />
                <InputField type={'text'} name={'description'} error={formErrors.description} placeholder='Description' value={formData.description} onChange={onInputChange} required={true} />
                <Button text={'Add Task'} type={'submit'} disabled={loading} />
            </form>
            {loading ? <LoadingSpinner /> :
                <div className="tasks-container">
                    {tasks.map((task) => {
                        return <TodoItem key={task.id} {...task} onDelete={handleDeleteTask} onUpdate={handleUpdateTask} />
                    })}
                </div>
            }
        </div>
    )
}

export default Home;
