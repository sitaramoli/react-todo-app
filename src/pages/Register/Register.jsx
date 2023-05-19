import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import useRegister from '../../hooks/useRegister';
import { useAuthCookie } from '../../utils/cookies_manager';
import './Register.scss';

const Register = () => {
    const { formData, formErrors, onInputChange, handleFormSubmit, loading } = useRegister();
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/login');
    };

    const { getAuthCookie } = useAuthCookie();
    const authenticated = getAuthCookie();

    return (
        authenticated ? <Navigate to='/' replace={true} /> :
            <div className="register-wrapper">
                <div className='register'>
                    <h2 className="register__title">Join us today!</h2>
                    <p className="register__slogan">
                        Stay Organized, Get Things Done
                    </p>
                    <form onSubmit={handleFormSubmit} method="post" className='register__form'>
                        <InputField type='text' name='name' label='name' placeholder='Name' value={formData.name} onChange={onInputChange} error={formErrors.name} required={true} />
                        <InputField type='email' name='email' label='email' placeholder='Email' value={formData.email} onChange={onInputChange} error={formErrors.email} required={true} />
                        <InputField type='password' name='password' label='password' placeholder='Password' value={formData.password} onChange={onInputChange} error={formErrors.password} required={true} />
                        {loading ? <LoadingSpinner /> : <Button type='submit' text='Register' />}
                    </form>
                    <div className="register__footer">
                        <span>Already have an account?</span>
                        <span className='register__footer__register' onClick={handleLoginClick} >Login</span>
                    </div>
                </div>
            </div>
    )
}

export default Register;
