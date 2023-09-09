import React, { useContext } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';

const NotFound404 = () => {

  const {setUserInfo, userInfo} = useContext(UserContext) 
  const dataUsername = userInfo?.username

  if(dataUsername){
    return < Navigate to = {'/CartPage'} />
  }

  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFound404;
