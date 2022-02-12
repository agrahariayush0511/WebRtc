import './App.css';
import { BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Authenticate from './pages/authenticate/Authenticate';
import Activate from './pages/activate/Activate'
import Rooms from './pages/Rooms/Rooms'
import {useSelector} from 'react-redux'
import {useLoadingWithRefresh} from './hooks/useLoadingWithRefresh'
import Loader from './components/shared/Loader/Loader'

function App() {

    const {loading} = useLoadingWithRefresh(); 
    return loading ? (<Loader message="Loading, please wait... "/>) : (
            <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" exact element={<GuestRouteHome/>}/>
                
                <Route path='/authenticate' element={<GuestRoute/>}/>

                <Route path='/activate' element={<SemiProtectedRoute/>}/>

                <Route path='/rooms' element={<ProtectedRoute/>}/>

                <Route path="/register" element={<Register/>}/>
                
            </Routes>
        </BrowserRouter>
    )
}

const GuestRoute = (location) => {
    const {isAuth} = useSelector((state) => state.auth)
    
    return (
        
        isAuth ?
        <Navigate to={
            {
                        pathname:'/rooms',
                        state: {from: location}
                    }
                }/> : (<Authenticate/>)
                
                )
}

const GuestRouteHome = (location) => {
    const {isAuth} = useSelector((state) => state.auth)

    return (
         
           isAuth ?
                <Navigate to={
                    {
                        pathname:'/rooms',
                        state: {from: location}
                    }
                }/> : (<Home/>)
                
                )
}

const ProtectedRoute = ({location}) => {
    const { user, isAuth} = useSelector((state) => state.auth)

    return (
        !isAuth ? 
            <Navigate
                to={
                    {
                        pathname: '/',
                        state: {from: location}
                    }
                }
            />
            :
            isAuth && !user.activated ? 
            <Navigate
                to={
                    {
                        pathname: '/activate',
                        state: {from: location}
                    }
                }
            /> 
            : 
            (<Rooms/>)
        
    )
    
}


const SemiProtectedRoute = ({location}) => {
    const {user,isAuth} = useSelector((state) => state.auth)

    return (
        !isAuth ? 
            <Navigate
                to={
                    {
                        pathname: '/',
                        state: {from: location}
                    }
                }
            />
            :
            isAuth && !user.activated ? (<Activate/>) : 
            <Navigate
                to={
                    {
                        pathname: '/rooms',
                        state: {from: location}
                    }
                }
            />
        
    )
    
}

export default App;