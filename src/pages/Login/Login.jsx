import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import useLogin from '../../hooks/useLogin';
import { useAuthCookie } from '../../utils/cookies_manager';
import './Login.scss';

const Login = () => {
    const { formData, formErrors, onInputChange, handleFormSubmit, loading } = useLogin();
    const navigate = useNavigate();
    const handleRegisterClick = () => {
        navigate('/register');
    };
    const { getAuthCookie } = useAuthCookie();
    const authenticated = getAuthCookie();

    return (
        authenticated ? <Navigate to='/' replace={true} /> :
            <div className="login-wrapper">
                <div className='login'>
                    <h2 className="login__title">Welcome Back!</h2>
                    <p className="login__slogan">
                        Stay Organized, Get Things Done
                    </p>
                    <form onSubmit={handleFormSubmit} method="post" className='login__form'>
                        <InputField type='email' name='email' label='email' placeholder='Email' value={formData.email} onChange={onInputChange} error={formErrors.email} required={true} />
                        <InputField type='password' name='password' label='password' placeholder='Password' value={formData.password} onChange={onInputChange} error={formErrors.password} required={true} />
                        {loading ? <LoadingSpinner /> : <Button type='submit' text='Login' />}
                    </form>
                    <div className="login__footer">
                        <span>Don’t have an account?</span>
                        <span className='login__footer__register' onClick={handleRegisterClick} >Register</span>
                    </div>
                </div>
            </div>
    );
}

export default Login;
