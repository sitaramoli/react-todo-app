import React from 'react';
import Checkbox from '../Checkbox/Checkbox';
import './TodoItem.scss';

const TodoItem = ({ id, title, description, completed, onDelete, onUpdate }) => {
    return (
        <div className='todo-item' >
            <div className="todo-item__data">
                <h3 className="todo-item__data__title">{title}</h3>
                <h4 className="todo-item__data__description">{description}</h4>
            </div>
            <div className="todo-item__action">
                <Checkbox name='completed' checked={completed} onChange={() => { onUpdate(id) }} />
                <button className='todo-item__action__delete' onClick={() => onDelete(id)} >
                    <i className="icon-delete"></i>
                </button>
            </div>
        </div>
    )
}

export default TodoItem;
