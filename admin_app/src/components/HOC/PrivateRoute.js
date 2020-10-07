import React from 'react';
import { Route, Redirect } from'react-router-dom';

const PrivateRoute = ({component: Component , rest}) => {
    return(
        <Route {...rest} component={(props) => {
            const token= window.localStorage.getItem('token');
            if(token){
                return <Component {...props}></Component>

            }
            else{
                return <Redirect to={'/signin'}></Redirect>
            }
        }}></Route>
    )
}
export default PrivateRoute;