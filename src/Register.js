import './Register.css'
import { TextField } from './Textfield';
import React, {useState, useCallback} from 'react';
import { Link } from 'react-router-dom';
import { addUser } from './features/authentication';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {loginpath} from './app/constants';



function Register() {

    const [formState, setFormState] = useState({
        login: '',
        password: '',
    });

    const [errorState, setErrorState] = useState({
        error: ''
    });
    
    const Users = useSelector((state) => state.addUser.Users)
    
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleChange = useCallback((newValue, valueKey) => {
        setFormState(prevState => ({
            ...prevState, 
            [valueKey]: newValue,
        }))
    }, []);
    
    
    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault(); 

            if(formState.login === "" || formState.password === "") {
                return setErrorState({error: 'Заполните все поля!'})
            } else {

                if(Users.find(el => el.payload.login === formState.login) === undefined ) {

                    dispatch(addUser(formState));
                    navigate(loginpath);
                } else {
                    return setErrorState({error: 'Такой пользователь уже существует!'})
                };
            } 
        },
        [formState, dispatch, navigate, Users]
    );  

  return (
  <div className="register_wrapper">
    <p className="register_title">Sign up</p>
    <div className = "reg_error">
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
            <button type="submit" className="submit_btn">Create account</button>
        </div>
        <Link to={loginpath}>Login</Link>
    </form>
  </div>  
  );
}

export default Register
