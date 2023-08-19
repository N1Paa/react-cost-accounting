import './Login.css';
import { TextField } from '../../components/Textfield';
import React, {useState, useCallback, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authentication, clearCurrent } from '../../features/authentication';
import { Link } from 'react-router-dom';
import {ROUTES} from '../../app/constants';
import store from '../../app/store';
import {usersSelectors} from '../../features/authentication';


function Login() {

    const dispatch = useDispatch();

    const users = usersSelectors.selectAll(store.getState());

    const expiredAt = useSelector((state) => state.expiredAt);

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

            if(!formState.login || !formState.password) {
                    setErrorState({error: 'Заполните все поля!'})
            } else {

                if(!users.some(el => el.user.login === formState.login) || !users.some(el => el.user.password === formState.password)) {

                    setErrorState({error: 'Неверное имя пользователя или пароль!'})

                } else {
                    console.log('Вы успешно вошли!');
                    const id = users.find((e) => e.user.login === formState.login).id
                    dispatch(authentication(id));
                } 
            } 
        },
        [formState, dispatch, users]
    );  

    useEffect(
        () => {
            if(expiredAt < Date.now()) {
                dispatch(clearCurrent())
            }
        }
    )
    
  return (
  <div style={{height: 100 + "vh"}}>
  <div className="login_wrapper">
    <span className="login_title">Login</span>
    <div className = "login_error">
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
            <button type="submit" className="submit_btn">Login</button>
        </div>
    </form>
    <Link to={ROUTES.registerpath}>Sign Up</Link>
  </div>
  </div>  
  );
}

export default Login;
