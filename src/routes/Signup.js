import React, { useContext, useState } from 'react'
import axios from "axios";
import { Navigate, redirect } from 'react-router-dom';
import { UserContext } from '../userContext';

const Signup = () => {

  const [username, setUsername] = useState('')
  const [password, setpassword] = useState('')
  const [reenteredPassword, setreenteredPassword] = useState('')
  const [redirect, setredirect] = useState(false)
  const {setUserInfo, userInfo} = useContext(UserContext)

  async function register(ev) {
    ev.preventDefault();

    const signupInfo = {
      username: username,
      password: password,
      reenteredPassword: reenteredPassword,
    };

    const response = await axios.post(
      "http://localhost:3500/user/signup",
      signupInfo,
      {withCredentials: true}
    );
    if(response.data.status === 'ok'){
      const data = {
        userId: response.data.userId,
        username: response.data.username
      }
      setredirect(true)
      setUserInfo(data)
    }
    else{
      alert(response.data.message)
    }
  }

  if(redirect){
    window.location.reload();
    return < Navigate to = {'/'} />
  }

  const dataUsername = userInfo?.username

  if(dataUsername){
    return < Navigate to = {'/'} />
  }

  return (
    <div>
        <div className="AuthContainer" onSubmit={register}>
            <form className='signupForm' action="">
                <h1>Signup</h1>
                <input type="username" 
                      placeholder='username'
                      value={username}
                      onChange={ev => setUsername(ev.target.value)} />
                <input type="password" 
                      placeholder='password'
                      value={password}
                      onChange={ev => setpassword(ev.target.value)}/>
                <input type="password" 
                      placeholder='re-entered password'
                      value={reenteredPassword}
                      onChange={ev => setreenteredPassword(ev.target.value)}/>
                <button className='AuthButton'>Signup</button>
            </form>
        </div>
    </div>
  )
}

export default Signup