import './Register.css'
import { TextField } from '../../components/Textfield';
import React, {useState, useCallback} from 'react';
import { Link } from 'react-router-dom';
import { addUser, usersSelectors } from '../../features/authentication';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {ROUTES} from '../../app/constants';
import store from '../../app/store';
import { nanoid } from '@reduxjs/toolkit'; 


function Register() {

    const [formState, setFormState] = useState({
        login: '',
        password: ''
    });

    const [errorState, setErrorState] = useState({
        error: ''
    });
    
    const dispatch = useDispatch();

    const users = usersSelectors.selectAll(store.getState())
    
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
            
            if(!formState.login || !formState.password) {
                    setErrorState({error: 'Заполните все поля!'})
            } else {

                if(!users.some(el => el.user.login === formState.login)) {
                    dispatch(addUser({id: nanoid(), user: formState}));
                    navigate(ROUTES.loginpath);
                } else {
                    setErrorState({error: 'Такой пользователь уже существует!'})
                };
            } 
        },
        [formState, dispatch, navigate, users]
    );  

  return (
  <div style={{height: 100 + "vh"}}>  
  <div className="register_wrapper">
    <span className="register_title">Sign up</span>
    <div className = "reg_error">
        <span>{errorState.error}</span>
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
    </form>
    <Link to={ROUTES.loginpath}>Login</Link>
  </div>
  </div>  
  );
}

export default Register
