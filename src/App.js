import {Route, Routes} from 'react-router';
import  Register  from './Pages/Registerpage/Register';
import  Login  from './Pages/Loginpage/Login';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {ROUTES} from './app/constants';







function App() {


    const expiredAt = useSelector((state) => state.expiredAt);
    const currentUser = useSelector((state) => state.currentUser);

    const [loaded, setLoaded] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        
        if(currentUser && expiredAt > Date.now()) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false)
        }
        setLoaded(true);
    }, [expiredAt, currentUser])

    if(!loaded) {
        return <h1>Зaгружается...</h1>
    }

    return (
        <div className="App">
            <Routes>
                { authenticated ? (
                    <Route path="*" Component={() => <h1>Main</h1>}/>
                ) : (
                    <>              
                        <Route path={ROUTES.registerpath} Component={() => <Register/>} />
                        <Route path="*" Component={() => <Login/>} />
                    </>
                )           
                }
            </Routes>
        </div>
    )
}

export default App
