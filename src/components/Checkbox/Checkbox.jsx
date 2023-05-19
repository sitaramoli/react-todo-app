import React from 'react';
import './Checkbox.scss';

const Checkbox = ({ text, name, id, checked, onChange }) => {
    return (
        <div className="checkbox">
            <input type="checkbox" name={name} id={id} checked={checked} />
            <label htmlFor={id} onClick={onChange} ></label>
            {text && <span className='checkbox__text'>{text}</span>}
        </div>
    )
}

export default Checkbox;