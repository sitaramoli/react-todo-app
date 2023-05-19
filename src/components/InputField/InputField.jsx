import { useState } from 'react';
import './InputField.scss';

const InputField = ({ type, name, label, error, ...rest }) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    return (
        <div className='input'>
            <label htmlFor={name} className='input__label' >{label}</label>
            <div className="input__container">
                <input type={showPassword ? 'text' : type} name={name} id={name} {...rest} />
                {type === 'password' && <button type='button' onClick={togglePasswordVisibility} >
                    <i className={showPassword ? 'icon-eye' : 'icon-eye-slash'} ></i>
                </button>}
            </div>
            {error && <p className='input__error'>{error}</p>}
        </div>
    )
}

export default InputField;
