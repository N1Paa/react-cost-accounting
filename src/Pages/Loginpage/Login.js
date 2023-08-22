import './Login.css';
import { TextField } from '../../components/Textfield';
import React, {useState, useCallback, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authentication, clearCurrent } from '../../features/authentication';
import { Link } from 'react-router-dom';
import {ROUTES} from '../../app/constants';
import store from '../../app/store';
import {usersSelectors} from '../../features/users';


function Login() {

    const dispatch = useDispatch();

    const users = usersSelectors.selectAll(store.getState());

    const expiredAt = useSelector((state) => state.auth.expiredAt);

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
                    setErrorState({error: 'Fill in all the fields!'})
            } else {

                if(!users.some(el => el.login === formState.login && el.password === formState.password)) {

                    setErrorState({error: 'Uncorrect username or password!'})

                } else {
                    console.log('Login successful!');
                    const id = users.find((e) => e.login === formState.login).id
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
        }, [expiredAt, dispatch]
    )
    
  return (
  <div className="login_wrapper_wrapper" style={{height: 100 + "vh"}}>
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
            label="login"
        />
        <TextField
            valueKey="password"
            type="password"
            onChange={handleChange}
            value={formState.password}
            label="password"
        />
        <div className="form-group">
            <button type="submit" className="submit_btn">Login</button>
        </div>
    </form>
    <Link to={ROUTES.registerPath}>Sign Up</Link>
  </div>
  </div>  
  );
}

export default Login;