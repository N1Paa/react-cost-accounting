import './Login.css';
import { TextField } from './Textfield';
import React, {useState, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authentication } from './features/authentication';
import { Link } from 'react-router-dom';
import {registerpath} from './app/constants';


function Login() {

    const dispatch = useDispatch()

    const Users = useSelector((state) => state.addUser.Users)

    const [formState, setFormState] = useState({
        login: '',
        password: '',
    });
    
    const [errorState, setErrorState] = useState({
        error: ''
    })
    
    const handleChange = useCallback((newValue, valueKey) => {
        setFormState(prevState => ({
            ...prevState, 
            [valueKey]: newValue,
        }))
    }, []);
    
    
    const handleSubmit = useCallback(
        (ev) => {
            ev.preventDefault();

            if(formState.login === "" || formState.password === "") {
                 return setErrorState({error: 'Заполните все поля!'})
            } else {

                if(Users.find(el => el.payload.login === formState.login) === undefined || Users.find(el => el.payload.password === formState.password) === undefined ) {

                   return setErrorState({error: 'Неверное имя пользователя или пароль!'})

                } else {
                    console.log('Вы успешно вошли');
                    dispatch(authentication(formState.login));
                    
                } 
            } 
        },
        [formState, dispatch, Users]
    );  
    
  return (
  <div className="login_wrapper">
    <p className="login_title">Login</p>
    <div className = "login_error">
        <p>{errorState.error}</p>
    </div>
    <form onSubmit={handleSubmit} className="modal_window">
        <TextField
            valueKey="login"
            onChange={handleChange}
            value={formState.login}
        />
        <TextField
            valueKey="password"
            type="password"
            onChange={handleChange}
            value={formState.password}
        />
        <div className="form-group">
            <button type="submit" className="submit_btn">Login</button>
        </div>
        <Link to={registerpath}>Sign Up</Link>
    </form>
  </div>  
  );
}

export default Login;
