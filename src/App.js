import {Route, Routes} from 'react-router';
import  Register  from './Register';
import  Login  from './Login';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {registerpath} from './app/constants';







function App() {


    const expiredAt = useSelector((state) => state.auth.expiredAt);
    const currentUser = useSelector((state) => state.auth.currentUser);

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
                        <Route path="*" Component={() => <Login/>} />            
                        <Route path={registerpath} Component={() => <Register/>} />
                    </>
                )           
                }
            </Routes>
        </div>
    )
}

export default App
