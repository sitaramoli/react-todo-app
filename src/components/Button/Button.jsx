import './Button.scss';

const Button = ({ text, ...rest }) => {
    return (
        <button className='button' {...rest} >{text}</button>
    )
}

export default Button
